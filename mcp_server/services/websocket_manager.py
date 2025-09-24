"""
WebSocket Manager for MCP Server

Handles Socket.IO connections, event management, and real-time communication
between agents and the MCP server for task delegation and progress updates.
"""

import asyncio
import json
import time
from typing import Dict, List, Optional, Any, Callable, Set
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from enum import Enum

import socketio
import structlog
from fastapi import Request, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from redis.asyncio import Redis

from ..config import MCPConfig
from ..exceptions import AuthenticationError, ValidationError, ServiceUnavailableError
from ..models.agent import Agent
from ..models.task import Task, TaskStatus

logger = structlog.get_logger(__name__)


class ConnectionStatus(Enum):
    """WebSocket connection status."""
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"
    RECONNECTING = "reconnecting"
    AUTHENTICATED = "authenticated"
    ERROR = "error"


@dataclass
class ConnectionInfo:
    """WebSocket connection information."""
    sid: str
    agent_id: Optional[str] = None
    user_id: Optional[str] = None
    status: ConnectionStatus = ConnectionStatus.CONNECTED
    connected_at: datetime = field(default_factory=datetime.utcnow)
    last_heartbeat: datetime = field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = field(default_factory=dict)
    subscribed_events: Set[str] = field(default_factory=set)


class WebSocketManager:
    """
    Manages WebSocket connections and real-time communication for the MCP server.
    
    Provides Socket.IO-based real-time communication for:
    - Task delegation and progress updates
    - Agent coordination and status monitoring
    - Event publishing with filtering
    - Heartbeat monitoring and connection recovery
    """
    
    def __init__(self, config: MCPConfig, database: AsyncIOMotorDatabase, redis_client: Redis):
        """
        Initialize WebSocket manager.
        
        Args:
            config: MCP configuration
            database: MongoDB database instance
            redis_client: Redis client instance
        """
        self.config = config
        self.database = database
        self.redis_client = redis_client
        self.sio = None
        self.connections: Dict[str, ConnectionInfo] = {}
        self.event_handlers: Dict[str, List[Callable]] = {}
        self.room_subscriptions: Dict[str, Set[str]] = {}  # room -> set of sids
        self._initialized = False
        self._shutdown = False
        
    async def initialize(self) -> None:
        """
        Initialize Socket.IO server with configuration.
        
        Raises:
            ServiceUnavailableError: If initialization fails
        """
        try:
            logger.info("Initializing WebSocket manager")
            
            # Create Socket.IO server with async mode
            self.sio = socketio.AsyncServer(
                async_mode='asgi',
                cors_allowed_origins=self.config.websocket_config.cors_allowed_origins,
                ping_interval=self.config.websocket_config.ping_interval,
                ping_timeout=self.config.websocket_config.ping_timeout,
                max_http_buffer_size=self.config.websocket_config.max_http_buffer_size,
                allow_upgrades=self.config.websocket_config.allow_upgrades,
                http_compression=self.config.websocket_config.http_compression,
                compression_threshold=self.config.websocket_config.compression_threshold,
                logger=logger,
                engineio_logger=logger if self.config.debug else False
            )
            
            # Register event handlers
            self._register_event_handlers()
            
            self._initialized = True
            logger.info("WebSocket manager initialized successfully")
            
        except Exception as e:
            logger.error("Failed to initialize WebSocket manager", error=str(e))
            raise ServiceUnavailableError("WebSocket initialization failed") from e
    
    def _register_event_handlers(self) -> None:
        """Register Socket.IO event handlers."""
        if not self.sio:
            return
            
        # Connection events
        self.sio.on('connect', self._handle_connect)
        self.sio.on('disconnect', self._handle_disconnect)
        
        # Authentication events
        self.sio.on('authenticate', self._handle_authenticate)
        
        # Task events
        self.sio.on('task:request', self._handle_task_request)
        self.sio.on('task:progress', self._handle_task_progress)
        self.sio.on('task:complete', self._handle_task_complete)
        self.sio.on('task:failed', self._handle_task_failed)
        
        # Agent events
        self.sio.on('agent:status', self._handle_agent_status)
        self.sio.on('agent:register', self._handle_agent_register)
        self.sio.on('agent:unregister', self._handle_agent_unregister)
        
        # Coordination events
        self.sio.on('coordination:join', self._handle_coordination_join)
        self.sio.on('coordination:leave', self._handle_coordination_leave)
        self.sio.on('coordination:broadcast', self._handle_coordination_broadcast)
        
        # Heartbeat events
        self.sio.on('heartbeat', self._handle_heartbeat)
        
        # Subscription events
        self.sio.on('subscribe', self._handle_subscribe)
        self.sio.on('unsubscribe', self._handle_unsubscribe)
        
        logger.debug("Socket.IO event handlers registered")
    
    async def _handle_connect(self, sid: str, environ: Dict[str, Any]) -> None:
        """
        Handle new connection.
        
        Args:
            sid: Socket.IO session ID
            environ: Connection environment data
        """
        try:
            logger.info("New WebSocket connection", sid=sid)
            
            # Create connection info
            connection_info = ConnectionInfo(sid=sid)
            self.connections[sid] = connection_info
            
            # Emit welcome message
            await self.sio.emit('connected', {
                'sid': sid,
                'timestamp': datetime.utcnow().isoformat(),
                'message': 'Connected to MCP WebSocket server'
            }, room=sid)
            
            # Start heartbeat monitoring
            asyncio.create_task(self._monitor_connection_heartbeat(sid))
            
        except Exception as e:
            logger.error("Error handling connection", sid=sid, error=str(e))
            await self.sio.emit('error', {
                'message': 'Connection failed',
                'details': str(e)
            }, room=sid)
    
    async def _handle_disconnect(self, sid: str) -> None:
        """
        Handle disconnection.
        
        Args:
            sid: Socket.IO session ID
        """
        try:
            logger.info("WebSocket disconnection", sid=sid)
            
            if sid in self.connections:
                connection_info = self.connections[sid]
                
                # Update agent status if authenticated
                if connection_info.agent_id:
                    await self._update_agent_status(connection_info.agent_id, "offline")
                
                # Clean up room subscriptions
                for room, sids in self.room_subscriptions.items():
                    sids.discard(sid)
                
                # Remove connection
                del self.connections[sid]
                
                # Notify other agents in coordination rooms
                await self._notify_agent_disconnection(connection_info)
                
        except Exception as e:
            logger.error("Error handling disconnection", sid=sid, error=str(e))
    
    async def _handle_authenticate(self, sid: str, data: Dict[str, Any]) -> None:
        """
        Handle authentication request.
        
        Args:
            sid: Socket.IO session ID
            data: Authentication data
        """
        try:
            logger.debug("Authentication request", sid=sid)
            
            # Validate authentication data
            if not data or 'token' not in data:
                raise ValidationError("Authentication token required")
            
            token = data['token']
            
            # Verify token and get user/agent info
            auth_result = await self._verify_token(token)
            
            if not auth_result:
                raise AuthenticationError("Invalid authentication token")
            
            # Update connection info
            if sid in self.connections:
                connection_info = self.connections[sid]
                connection_info.user_id = auth_result.get('user_id')
                connection_info.agent_id = auth_result.get('agent_id')
                connection_info.status = ConnectionStatus.AUTHENTICATED
                connection_info.metadata.update(auth_result.get('metadata', {}))
                
                # Join agent-specific room if agent_id exists
                if connection_info.agent_id:
                    await self.sio.enter_room(sid, f"agent:{connection_info.agent_id}")
                    await self._update_agent_status(connection_info.agent_id, "online")
                
                # Emit authentication success
                await self.sio.emit('authenticated', {
                    'user_id': connection_info.user_id,
                    'agent_id': connection_info.agent_id,
                    'permissions': auth_result.get('permissions', []),
                    'message': 'Authentication successful'
                }, room=sid)
                
                logger.info("Authentication successful", sid=sid, agent_id=connection_info.agent_id)
            else:
                raise ValidationError("Connection not found")
                
        except (AuthenticationError, ValidationError) as e:
            logger.warning("Authentication failed", sid=sid, error=str(e))
            await self.sio.emit('authentication_failed', {
                'message': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }, room=sid)
        except Exception as e:
            logger.error("Error during authentication", sid=sid, error=str(e))
            await self.sio.emit('error', {
                'message': 'Authentication error',
                'details': str(e)
            }, room=sid)
    
    async def _handle_task_request(self, sid: str, data: Dict[str, Any]) -> None:
        """
        Handle task request from agent.
        
        Args:
            sid: Socket.IO session ID
            data: Task request data
        """
        try:
            logger.debug("Task request", sid=sid, data=data)
            
            # Validate connection and authentication
            if sid not in self.connections:
                raise ValidationError("Invalid connection")
            
            connection_info = self.connections[sid]
            if connection_info.status != ConnectionStatus.AUTHENTICATED:
                raise AuthenticationError("Authentication required")
            
            # Validate task request data
            if not data or 'task_type' not in data:
                raise ValidationError("Task type required")
            
            # Process task request
            task_data = await self._process_task_request(
                connection_info.agent_id,
                connection_info.user_id,
                data
            )
            
            # Emit task assigned event
            await self.sio.emit('task:assigned', task_data, room=sid)
            
            # Broadcast to task coordination room if applicable
            if 'coordination_room' in data:
                await self._broadcast_to_room(
                    data['coordination_room'],
                    'task:assigned',
                    task_data,
                    exclude_sid=sid
                )
            
            logger.info("Task request processed", sid=sid, task_id=task_data.get('task_id'))
            
        except (ValidationError, AuthenticationError) as e:
            logger.warning("Task request validation failed", sid=sid, error=str(e))
            await self.sio.emit('task:request_failed', {
                'message': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }, room=sid)
        except Exception as e:
            logger.error("Error processing task request", sid=sid, error=str(e))
            await self.sio.emit('task:request_failed', {
                'message': 'Task request processing failed',
                'details': str(e)
            }, room=sid)
    
    async def _handle_task_progress(self, sid: str, data: Dict[str, Any]) -> None:
        """
        Handle task progress update from agent.
        
        Args:
            sid: Socket.IO session ID
            data: Progress update data
        """
        try:
            logger.debug("Task progress update", sid=sid, data=data)
            
            # Validate connection and data
            if sid not in self.connections:
                raise ValidationError("Invalid connection")
            
            if not data or 'task_id' not in data:
                raise ValidationError("Task ID required")
            
            connection_info = self.connections[sid]
            task_id = data['task_id']
            
            # Update task progress in database
            await self._update_task_progress(
                task_id,
                connection_info.agent_id,
                data
            )
            
            # Broadcast progress to interested parties
            progress_event = {
                'task_id': task_id,
                'agent_id': connection_info.agent_id,
                'progress': data.get('progress', 0),
                'status': data.get('status'),
                'message': data.get('message', ''),
                'timestamp': datetime.utcnow().isoformat(),
                'metadata': data.get('metadata', {})
            }
            
            # Emit to sender
            await self.sio.emit('task:progress_updated', progress_event, room=sid)
            
            # Broadcast to task subscribers
            await self._broadcast_to_room(f"task:{task_id}", 'task:progress', progress_event)
            
            logger.info("Task progress updated", sid=sid, task_id=task_id)
            
        except ValidationError as e:
            logger.warning("Task progress validation failed", sid=sid, error=str(e))
            await self.sio.emit('task:progress_failed', {
                'message': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }, room=sid)
        except Exception as e:
            logger.error("Error updating task progress", sid=sid, error=str(e))
            await self.sio.emit('task:progress_failed', {
                'message': 'Progress update failed',
                'details': str(e)
            }, room=sid)
    
    async def _handle_heartbeat(self, sid: str, data: Dict[str, Any]) -> None:
        """
        Handle heartbeat from client.
        
        Args:
            sid: Socket.IO session ID
            data: Heartbeat data
        """
        try:
            if sid in self.connections:
                connection_info = self.connections[sid]
                connection_info.last_heartbeat = datetime.utcnow()
                
                # Update metadata if provided
                if data and 'metadata' in data:
                    connection_info.metadata.update(data['metadata'])
                
                # Send heartbeat acknowledgment
                await self.sio.emit('heartbeat_ack', {
                    'timestamp': datetime.utcnow().isoformat(),
                    'server_time': time.time()
                }, room=sid)
                
        except Exception as e:
            logger.error("Error handling heartbeat", sid=sid, error=str(e))
    
    async def _handle_subscribe(self, sid: str, data: Dict[str, Any]) -> None:
        """
        Handle event subscription request.
        
        Args:
            sid: Socket.IO session ID
            data: Subscription data
        """
        try:
            if not data or 'events' not in data:
                raise ValidationError("Events list required")
            
            if sid not in self.connections:
                raise ValidationError("Invalid connection")
            
            connection_info = self.connections[sid]
            events = data['events']
            
            if not isinstance(events, list):
                events = [events]
            
            # Add events to subscription
            for event in events:
                connection_info.subscribed_events.add(event)
            
            # Join relevant rooms
            for event in events:
                if event.startswith('task:'):
                    await self.sio.enter_room(sid, event)
                elif event.startswith('agent:'):
                    await self.sio.enter_room(sid, event)
                elif event.startswith('coordination:'):
                    await self.sio.enter_room(sid, event)
            
            await self.sio.emit('subscribed', {
                'events': list(connection_info.subscribed_events),
                'message': f'Subscribed to {len(events)} events'
            }, room=sid)
            
            logger.debug("Subscription successful", sid=sid, events=events)
            
        except ValidationError as e:
            logger.warning("Subscription validation failed", sid=sid, error=str(e))
            await self.sio.emit('subscription_failed', {
                'message': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }, room=sid)
        except Exception as e:
            logger.error("Error handling subscription", sid=sid, error=str(e))
            await self.sio.emit('subscription_failed', {
                'message': 'Subscription failed',
                'details': str(e)
            }, room=sid)
    
    async def publish_event(self, event: str, data: Dict[str, Any], 
                          room: Optional[str] = None, 
                          exclude_sid: Optional[str] = None) -> None:
        """
        Publish an event to connected clients.
        
        Args:
            event: Event name
            data: Event data
            room: Target room (optional)
            exclude_sid: Session ID to exclude (optional)
        """
        try:
            if not self.sio or self._shutdown:
                return
            
            event_data = {
                'event': event,
                'data': data,
                'timestamp': datetime.utcnow().isoformat()
            }
            
            if room:
                await self.sio.emit(event, event_data, room=room, skip_sid=exclude_sid)
            else:
                # Broadcast to all connected clients
                await self.sio.emit(event, event_data, skip_sid=exclude_sid)
            
            logger.debug("Event published", event=event, room=room)
            
        except Exception as e:
            logger.error("Error publishing event", event=event, error=str(e))
    
    async def _monitor_connection_heartbeat(self, sid: str) -> None:
        """
        Monitor connection heartbeat and handle timeouts.
        
        Args:
            sid: Socket.IO session ID
        """
        try:
            heartbeat_interval = self.config.websocket_config.heartbeat_interval
            connection_timeout = self.config.websocket_config.connection_timeout
            
            while sid in self.connections and not self._shutdown:
                await asyncio.sleep(heartbeat_interval)
                
                if sid not in self.connections:
                    break
                
                connection_info = self.connections[sid]
                time_since_heartbeat = datetime.utcnow() - connection_info.last_heartbeat
                
                if time_since_heartbeat.total_seconds() > connection_timeout:
                    logger.warning("Connection heartbeat timeout", sid=sid)
                    
                    # Attempt to ping the client
                    try:
                        await self.sio.call('ping', timeout=5, room=sid)
                        connection_info.last_heartbeat = datetime.utcnow()
                    except Exception:
                        # Client is unresponsive, disconnect
                        logger.info("Disconnecting unresponsive client", sid=sid)
                        await self.sio.disconnect(sid)
                        break
                        
        except asyncio.CancelledError:
            logger.debug("Heartbeat monitoring cancelled", sid=sid)
        except Exception as e:
            logger.error("Error in heartbeat monitoring", sid=sid, error=str(e))
    
    # Placeholder methods for integration with existing services
    async def _verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify authentication token."""
        # TODO: Integrate with existing auth service
        # This is a placeholder - implement actual token verification
        return {
            'user_id': 'user_123',
            'agent_id': 'agent_456',
            'permissions': ['task:read', 'task:write', 'agent:status']
        }
    
    async def _process_task_request(self, agent_id: Optional[str], user_id: Optional[str], 
                                  data: Dict[str, Any]) -> Dict[str, Any]:
        """Process task request and return task data."""
        # TODO: Integrate with existing task service
        # This is a placeholder - implement actual task processing
        return {
            'task_id': f'task_{int(time.time())}',
            'task_type': data.get('task_type'),
            'status': 'assigned',
            'assigned_to': agent_id,
            'created_by': user_id,
            'created_at': datetime.utcnow().isoformat()
        }
    
    async def _update_task_progress(self, task_id: str, agent_id: Optional[str], 
                                  data: Dict[str, Any]) -> None:
        """Update task progress in database."""
        # TODO: Integrate with existing task service
        # This is a placeholder - implement actual task progress update
        pass
    
    async def _update_agent_status(self, agent_id: str, status: str) -> None:
        """Update agent status in database."""
        # TODO: Integrate with existing agent service
        # This is a placeholder - implement actual agent status update
        pass
    
    async def _notify_agent_disconnection(self, connection_info: ConnectionInfo) -> None:
        """Notify other agents about disconnection."""
        # TODO: Implement agent disconnection notification
        pass
    
    async def _broadcast_to_room(self, room: str, event: str, data: Dict[str, Any], 
                               exclude_sid: Optional[str] = None) -> None:
        """Broadcast event to room members."""
        if not self.sio:
            return
        
        if room in self.room_subscriptions and self.room_subscriptions[room]:
            await self.sio.emit(event, data, room=room, skip_sid=exclude_sid)
    
    # Event handler stubs for remaining events
    async def _handle_task_complete(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle task completion."""
        logger.debug("Task complete", sid=sid, data=data)
        # TODO: Implement task completion handling
    
    async def _handle_task_failed(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle task failure."""
        logger.debug("Task failed", sid=sid, data=data)
        # TODO: Implement task failure handling
    
    async def _handle_agent_status(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle agent status update."""
        logger.debug("Agent status", sid=sid, data=data)
        # TODO: Implement agent status handling
    
    async def _handle_agent_register(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle agent registration."""
        logger.debug("Agent register", sid=sid, data=data)
        # TODO: Implement agent registration
    
    async def _handle_agent_unregister(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle agent unregistration."""
        logger.debug("Agent unregister", sid=sid, data=data)
        # TODO: Implement agent unregistration
    
    async def _handle_coordination_join(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle coordination room join."""
        logger.debug("Coordination join", sid=sid, data=data)
        # TODO: Implement coordination room join
    
    async def _handle_coordination_leave(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle coordination room leave."""
        logger.debug("Coordination leave", sid=sid, data=data)
        # TODO: Implement coordination room leave
    
    async def _handle_coordination_broadcast(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle coordination broadcast."""
        logger.debug("Coordination broadcast", sid=sid, data=data)
        # TODO: Implement coordination broadcast
    
    async def _handle_unsubscribe(self, sid: str, data: Dict[str, Any]) -> None:
        """Handle event unsubscription."""
        logger.debug("Unsubscribe", sid=sid, data=data)
        # TODO: Implement event unsubscription
    
    async def shutdown(self) -> None:
        """Shutdown WebSocket manager."""
        logger.info("Shutting down WebSocket manager")
        self._shutdown = True
        
        # Disconnect all clients
        if self.sio:
            await self.sio.disconnect()
        
        # Clear connections
        self.connections.clear()
        self.room_subscriptions.clear()
        
        logger.info("WebSocket manager shutdown complete")
    
    def get_connection_info(self, sid: str) -> Optional[ConnectionInfo]:
        """Get connection information for a session."""
        return self.connections.get(sid)
    
    def get_active_connections(self) -> List[ConnectionInfo]:
        """Get list of active connections."""
        return list(self.connections.values())
    
    def get_connection_count(self) -> int:
        """Get number of active connections."""
        return len(self.connections)