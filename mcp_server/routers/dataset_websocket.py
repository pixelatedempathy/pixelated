"""
Dataset Pipeline WebSocket Router for MCP Server

Provides WebSocket endpoints for real-time dataset pipeline orchestration,
integrating with the comprehensive dataset processing infrastructure and
providing live progress updates with safety validation.
"""

from datetime import datetime, timezone
from typing import Annotated, Any

import structlog
from fastapi import APIRouter, Depends, HTTPException, Path, Query, Request
from mcp_server.exceptions import ValidationError
from mcp_server.middleware.auth import get_current_user
from mcp_server.models.dataset import (
    DatasetProcessingRequest as DatasetProcessingRequestModel,
    DatasetProgressUpdate as DatasetProgressUpdateModel,
    DatasetStatus,
    DatasetStatusResponse,
    DatasetStatusResponse as DatasetStatusResponseModel,
)
from mcp_server.services.dataset_integration import (
    DatasetIntegrationService,
    get_dataset_integration_service,
)
from mcp_server.services.integration_manager import IntegrationManager
from pydantic import BaseModel, Field

logger = structlog.get_logger(__name__)


class DatasetStatisticsRequest(BaseModel):
    """Request model for dataset statistics."""

    execution_id: str = Field(..., description="Dataset execution ID")
    include_detailed_metrics: bool = Field(default=True, description="Include detailed metrics")
    metric_categories: list[str] | None = Field(
        default=None, description="Specific metric categories"
    )


class DatasetCancelRequest(BaseModel):
    """Request model for dataset processing cancellation."""

    reason: str | None = Field(None, description="Cancellation reason")


# Create router
router = APIRouter()


def get_integration_manager_from_request(request: Request) -> IntegrationManager:
    """
    Get integration manager from application state.

    Args:
        request: FastAPI request object

    Returns:
        IntegrationManager instance

    Raises:
        HTTPException: If integration manager is not available
    """
    integration_manager = getattr(request.app.state, "integration_manager", None)
    if not integration_manager:
        raise HTTPException(status_code=503, detail="Integration service unavailable")
    return integration_manager


@router.post("/process", response_model=dict[str, Any])
async def process_dataset(
    request: DatasetProcessingRequestModel,
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> dict[str, Any]:
    """
    Process dataset through comprehensive pipeline with real-time WebSocket updates.

    Args:
        request: Dataset processing request
        dataset_service: Dataset integration service
        current_user: Current authenticated user

    Returns:
        Execution ID and status information

    Raises:
        HTTPException: If processing fails or user lacks permissions
    """
    try:
        user_id = current_user.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in authentication")

        # Safely access dataset_config (fixes attribute error)
        dataset_config = getattr(request, "dataset_config", None)
        if dataset_config is None:
            raise HTTPException(status_code=400, detail="Missing 'dataset_config' in request model")

        # Validate dataset configuration
        _validate_dataset_config(dataset_config)

        # Process dataset
        execution_id = await dataset_service.process_dataset(dataset_config, user_id)

        # Publish dataset processing start event via integration manager
        # Note: Request object should be passed from the endpoint, not imported
        # For now, we'll skip the integration manager event publishing
        logger.info(
            "Dataset processing initiated via WebSocket API",
            execution_id=execution_id,
            user_id=user_id,
            processing_mode=getattr(request, "processing_mode", None),
            source_count=len(dataset_config.get("sources", [])),
        )

        return {
            "status": "success",
            "execution_id": execution_id,
            "message": "Dataset processing started successfully",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "estimated_duration": "5-15 minutes depending on dataset size",
        }

    except ValidationError as e:
        logger.warning(
            "Dataset validation failed", user_id=current_user.get("user_id"), error=str(e)
        )
        raise HTTPException(status_code=400, detail="Invalid dataset configuration") from e
    except Exception as e:
        logger.error("Error initiating dataset processing", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to initiate dataset processing") from e


@router.get("/status/{execution_id}", response_model=DatasetStatusResponseModel)
async def get_dataset_status(
    execution_id: str = Path(..., description="Dataset execution ID"),
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> DatasetStatusResponseModel:
    """
    Get current dataset processing status with WebSocket integration.

    Args:
        execution_id: Dataset execution ID
        dataset_service: Dataset integration service
        current_user: Current authenticated user

    Returns:
        Current execution status and progress

    Raises:
        HTTPException: If execution not found or access denied
    """
    try:
        user_id = current_user.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in authentication")

        # Get execution status
        status_data = await dataset_service.get_execution_status(execution_id, user_id)

        # Publish status query event
        # Note: Request object should be passed from the endpoint, not imported
        # For now, we'll skip the integration manager event publishing
        logger.debug(
            "Dataset status retrieved",
            execution_id=execution_id,
            user_id=user_id,
            status=status_data.get("status"),
        )

        return DatasetStatusResponse(**status_data)

    except ValidationError as e:
        logger.warning(
            "Dataset status access denied", execution_id=execution_id, user_id=user_id, error=str(e)
        )
        raise HTTPException(status_code=403, detail="Access denied for dataset status") from e
    except Exception as e:
        logger.error("Error getting dataset status", execution_id=execution_id, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to retrieve dataset status") from e


@router.post("/{execution_id}/cancel", response_model=dict[str, Any])
async def cancel_dataset_processing(
    request: DatasetCancelRequest,
    execution_id: str = Path(..., description="Dataset execution ID"),
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> dict[str, Any]:
    """
    Cancel dataset processing with WebSocket notification.

    Args:
        request: Cancellation request
        execution_id: Dataset execution ID
        dataset_service: Dataset integration service
        current_user: Current authenticated user

    Returns:
        Cancellation result

    Raises:
        HTTPException: If cancellation fails or access denied
    """
    try:
        user_id = current_user.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in authentication")

        # Cancel execution
        success = await dataset_service.cancel_execution(execution_id, user_id)

        if success:
            # Publish cancellation event
            # Note: Request object should be passed from the endpoint, not imported
            # For now, we'll skip the integration manager event publishing
            logger.info(
                "Dataset processing cancelled",
                execution_id=execution_id,
                user_id=user_id,
                reason=request.reason,
            )

            return {
                "status": "success",
                "message": "Dataset processing cancelled successfully",
                "execution_id": execution_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        raise HTTPException(status_code=400, detail="Failed to cancel dataset processing")

    except ValidationError as e:
        logger.warning("Dataset cancellation failed", execution_id=execution_id, error=str(e))
        raise HTTPException(status_code=403, detail="Access denied for dataset cancellation") from e
    except Exception as e:
        logger.error("Error cancelling dataset processing", execution_id=execution_id, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to cancel dataset processing") from e


@router.post("/{execution_id}/progress", response_model=dict[str, Any])
async def update_dataset_progress(
    progress_update: DatasetProgressUpdateModel,
    execution_id: str = Path(..., description="Dataset execution ID"),
    *,
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> dict[str, Any]:
    """
    Update dataset progress via WebSocket (for internal use by processing stages).

    Args:
        progress_update: Progress update data
        execution_id: Dataset execution ID
        integration_manager: Integration manager
        current_user: Current authenticated user (must be system/agent)

    Returns:
        Update confirmation

    Raises:
        HTTPException: If update fails or user lacks permissions
    """
    try:
        current_user.get("user_id")
        user_role = current_user.get("role", "user")

        # Check permissions - only system/agents can update progress
        if user_role not in ["system", "agent", "admin"]:
            raise HTTPException(
                status_code=403, detail="Insufficient permissions to update dataset progress"
            )

        # Publish progress update
        # Note: Integration manager should be injected as dependency
        # For now, we'll skip the integration manager event publishing
        logger.debug(
            "Dataset progress updated via WebSocket API",
            execution_id=execution_id,
            progress=progress_update.overall_progress,
            current_stage=progress_update.current_stage,
            quality_score=progress_update.quality_score,
            bias_score=progress_update.bias_score,
        )

        return {
            "status": "success",
            "message": "Dataset progress updated successfully",
            "execution_id": execution_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error updating dataset progress", execution_id=execution_id, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to update dataset progress") from e


@router.get("/active", response_model=list[dict[str, Any]])
async def get_active_dataset_executions(
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> list[dict[str, Any]]:
    """
    Get list of active dataset processing executions.

    Args:
        dataset_service: Dataset integration service
        current_user: Current authenticated user

    Returns:
        List of active executions

    Raises:
        HTTPException: If retrieval fails
    """
    try:
        user_id = current_user.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in authentication")
        user_role = current_user.get("role", "user")

        # Get all executions for admin, user-specific for regular users
        if user_role == "admin":
            # Admin can see all executions
            executions = []
            for execution_id, execution in dataset_service.active_executions.items():
                if execution.status == DatasetStatus.PROCESSING:
                    executions.append(
                        {
                            "execution_id": execution_id,
                            "user_id": execution.user_id,
                            "status": execution.status.value,
                            "current_stage": execution.current_stage.value
                            if execution.current_stage
                            else None,
                            "overall_progress": execution.overall_progress,
                            "quality_score": execution.quality_score,
                            "bias_score": execution.bias_score,
                            "start_time": execution.start_time.isoformat(),
                        }
                    )
        else:
            # Regular users can only see their own executions
            executions = []
            for execution_id, execution in dataset_service.active_executions.items():
                if execution.user_id == user_id and execution.status == DatasetStatus.PROCESSING:
                    executions.append(
                        {
                            "execution_id": execution_id,
                            "status": execution.status.value,
                            "current_stage": execution.current_stage.value
                            if execution.current_stage
                            else None,
                            "overall_progress": execution.overall_progress,
                            "quality_score": execution.quality_score,
                            "bias_score": execution.bias_score,
                            "start_time": execution.start_time.isoformat(),
                        }
                    )

        logger.info(
            "Active dataset executions retrieved",
            user_id=user_id,
            role=user_role,
            count=len(executions),
        )

        return executions

    except Exception as e:
        logger.error("Error retrieving active dataset executions", error=str(e))
        raise HTTPException(
            status_code=500, detail="Failed to retrieve active dataset executions"
        ) from e


@router.get("/statistics/{execution_id}", response_model=dict[str, Any])
async def get_dataset_statistics(
    execution_id: str = Path(..., description="Dataset execution ID"),
    include_detailed: bool = Query(True, description="Include detailed metrics"),
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> dict[str, Any]:
    """
    Get comprehensive dataset processing statistics.

    Args:
        execution_id: Dataset execution ID
        include_detailed: Whether to include detailed metrics
        dataset_service: Dataset integration service
        current_user: Current authenticated user

    Returns:
        Comprehensive statistics for the dataset execution

    Raises:
        HTTPException: If statistics retrieval fails or access denied
    """
    try:
        user_id = current_user.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in authentication")

        # Get dataset statistics
        statistics = await dataset_service.get_dataset_statistics(execution_id, user_id)

        # Add detailed metrics if requested
        if include_detailed:
            statistics["detailed_metrics"] = {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "metric_categories": [
                    "data_metrics",
                    "quality_metrics",
                    "bias_metrics",
                    "processing_metrics",
                ],
                "data_quality_indicators": {
                    "completeness": statistics.get("quality_metrics", {}).get(
                        "final_validation_quality", 0.0
                    ),
                    "consistency": statistics.get("quality_metrics", {}).get(
                        "standardization_quality", 0.0
                    ),
                    "accuracy": statistics.get("quality_metrics", {}).get(
                        "validation_quality", 0.0
                    ),
                },
                "bias_indicators": {
                    "overall_bias_score": statistics.get("bias_metrics", {}).get(
                        "bias_detection_bias", 0.0
                    ),
                    "demographic_balance": statistics.get("bias_metrics", {}).get(
                        "distribution_balancing_bias", 0.0
                    ),
                },
            }

        logger.info(
            "Dataset statistics retrieved",
            execution_id=execution_id,
            user_id=user_id,
            detailed=include_detailed,
        )

        return statistics

    except ValidationError as e:
        logger.warning(
            "Dataset statistics access denied",
            execution_id=execution_id,
            user_id=user_id,
            error=str(e),
        )
        raise HTTPException(status_code=403, detail="Access denied for dataset statistics") from e
    except Exception as e:
        logger.error("Error getting dataset statistics", execution_id=execution_id, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to retrieve dataset statistics") from e


@router.get("/health", response_model=dict[str, Any])
async def get_dataset_service_health(
    *,
    dataset_service: Annotated[DatasetIntegrationService, Depends(get_dataset_integration_service)],
) -> dict[str, Any]:
    """
    Get dataset processing service health status.

    Args:
        dataset_service: Dataset integration service

    Returns:
        Health status information
    """
    try:
        health_status = await dataset_service.get_service_health()

        logger.debug("Dataset service health retrieved", status=health_status.get("status"))

        return health_status

    except Exception as e:
        # Log the error for diagnostics but avoid returning exception details to clients.
        logger.error(
            "Error getting dataset service health",
            error_type=type(e).__name__,
            # include exc_info so logs capture stacktrace server-side for debugging
            exc_info=True,
        )
        # Return a generic error message to avoid information exposure.
        return {
            "status": "unhealthy",
            "error": "internal_error",
            "message": "An internal server error occurred while checking dataset service health.",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }


# WebSocket-specific endpoints for real-time communication
@router.get("/ws/{execution_id}")
async def websocket_dataset_updates(
    execution_id: str,
    *,
    current_user: Annotated[dict[str, Any], Depends(get_current_user)],
) -> dict[str, Any]:
    """
    WebSocket endpoint for real-time dataset updates.

    Args:
        execution_id: Dataset execution ID
        websocket_manager: WebSocket manager
        current_user: Current authenticated user

    Returns:
        WebSocket connection information
    """
    # This is a placeholder endpoint for WebSocket connections
    # Actual WebSocket handling is done through the WebSocket manager
    return {
        "message": "WebSocket endpoint for dataset updates",
        "execution_id": execution_id,
        "user_id": current_user.get("user_id"),
        "websocket_url": f"/ws/{execution_id}",
        "status": "ready_for_websocket_connection",
    }


# Utility functions
def _validate_dataset_config(config: dict[str, Any]) -> None:
    """Validate dataset processing configuration."""
    required_fields = ["sources", "processing_config"]
    missing_fields = [field for field in required_fields if field not in config]

    if missing_fields:
        raise ValidationError(f"Missing required dataset configuration fields: {missing_fields}")

    # Validate sources
    sources = config.get("sources", [])
    if not sources:
        raise ValidationError("At least one data source must be specified")

    for i, source in enumerate(sources):
        if "type" not in source:
            raise ValidationError(f"Source {i} missing required 'type' field")

        source_type = source["type"]
        supported_types = ["s3", "google_drive", "local", "huggingface"]
        if source_type not in supported_types:
            raise ValidationError(f"Unsupported source type: {source_type}")

    # Validate processing config
    processing_config = config.get("processing_config", {})
    if not isinstance(processing_config, dict):
        raise ValidationError("processing_config must be a dictionary")


# Error handlers - Use FastAPI's built-in exception handling
# The exception handlers are removed as FastAPI handles these automatically
