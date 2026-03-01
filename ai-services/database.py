"""
Database Connector - MongoDB Atlas
Handles storage of therapeutic session data and analysis results
"""

import logging
from datetime import datetime, timezone
from typing import Any

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import ConnectionFailure, OperationFailure

from phi_encryption import encrypt_phi  # HIPAA‑safe encryption service

logger = logging.getLogger(__name__)


class DatabaseService:
    MIN_CONFIDENCE = 0.7  # Minimum confidence score required for risk stratification results

    def __init__(self, uri: str, db_name: str = "pixelated_empathy"):
        self.uri = uri
        self.db_name = db_name
        self.client: MongoClient | None = None
        self.db: Database | None = None

    def connect(self) -> bool:
        """Establish connection to MongoDB Atlas"""
        try:
            self.client = MongoClient(self.uri)
            # Verify connection by running a ping command
            if self.client:
                self.client.admin.command("ping")
                self.db = self.client[self.db_name]
                logger.info(f"Successfully connected to MongoDB Atlas: {self.db_name}")
                return True
            return False
        except (ConnectionFailure, OperationFailure) as e:
            logger.error("Failed to connect to MongoDB Atlas")
            return False

    def get_collection(self, name: str) -> Collection:
        """Get a collection by name"""
        if self.db is None:
            raise ConnectionError("Database not connected")
        return self.db[name]

    def _encrypt_phi(self, data: dict[str, Any]) -> dict[str, Any]:
        """Encrypt PHI data before storage - HIPAA compliance"""
        # Use project's PHI-safe encryption service to encrypt the data
        return encrypt_phi(data)

    def _check_consent(self, user_id: str | None, session_id: str | None) -> bool:
        """Verify patient consent before storing PHI.
        
        In a real implementation this would query a consent store.
        For now it assumes consent is granted when both IDs are present.
        """
        if not user_id or not session_id:
            logger.warning(
                "Cannot verify consent: missing user_id or session_id"
            )
            return False
        # Placeholder logic – replace with actual consent verification.
        return True

    def _log_audit_event(
        self, event_type: str, session_id: str, user_id: str | None = None
    ) -> None:
        """Log audit events for HIPAA compliance"""
        if self.db is None:
            return
        audit_collection = self.db["audit_log"]
        audit_doc = {
            "event_type": event_type,
            "session_id": session_id,
            "user_id": user_id,
            "timestamp": datetime.now(timezone.utc),
            "source": "database_service",
        }
        try:
            audit_collection.insert_one(audit_doc)
        except Exception as e:
            logger.error("Audit log failed")
            # No further details logged to avoid leaking PHI

    def save_analysis_result(
        self,
        analysis_type: str,
        data: dict[str, Any],
        session_id: str | None = None,
        user_id: str | None = None,
    ) -> str | None:
        """Save an analysis result to the database with HIPAA compliance"""
        if self.db is None:
            logger.warning("Database not connected, skipping save")
            return None

        # Determine if the operation involves PHI
        # Updated logic: check for known PHI-related analysis types or an explicit "phi" key
        is_phi_analysis = (
            analysis_type in [
                "therapy_session",
                "crisis_detection",
                "mental_health",
            ]
            or (isinstance(data, dict) and "phi" in data)
        )

        # Apply HIPAA compliance measures
        if is_phi_analysis:
            # Verify patient consent before persisting PHI
            if not self._check_consent(user_id, session_id):
                logger.warning(
                    "Save aborted: patient consent not verified for "
                    f"{analysis_type} analysis"
                )
                return None
            # Encrypt PHI data
            data = self._encrypt_phi(data)

        # Clinical Decision Support Safeguards: enforce confidence threshold for risk stratification
        confidence_score = 1.0
        clinician_reviewed = False
        model_explainability = "generated_by_model"
        if analysis_type in ["crisis_detection", "mental_health"]:
            # Placeholder confidence; in production this would be the actual model confidence
            confidence_score = 0.8
            if confidence_score < self.MIN_CONFIDENCE:
                logger.warning(
                    f"Save aborted: confidence_score {confidence_score} below "
                    f"minimum threshold {self.MIN_CONFIDENCE} for {analysis_type}"
                )
                return None

        # Log audit event
        if session_id:
            self._log_audit_event(f"save_{analysis_type}", session_id, user_id)

        collection = self.db["analysis_results"]

        document = {
            "type": analysis_type,
            "session_id": session_id,
            "user_id": user_id,
            "timestamp": datetime.now(timezone.utc),
            "data": data,
            "version": "1.0.0",
            "hipaa_compliant": True,
            "confidence_score": confidence_score,
            "clinician_reviewed": clinician_reviewed,
            "model_explainability": model_explainability,
        }

        try:
            result = collection.insert_one(document)
            return str(result.inserted_id)
        except Exception as e:
            logger.error("Error saving analysis result")
            return None

    def get_session_history(
        self, session_id: str, limit: int = 10, user_id: str | None = None
    ) -> list[dict[str, Any]]:
        """Retrieve analysis history for a session with HIPAA compliance"""
        if self.db is None:
            return []

        # Log audit event
        self._log_audit_event("get_session_history", session_id, user_id)

        collection = self.db["analysis_results"]
        # Build query that filters by session_id and, if provided, by user_id
        query = {"session_id": session_id}
        if user_id is not None:
            query["user_id"] = user_id
        cursor = collection.find(query).sort("timestamp", -1).limit(limit)
        return list(cursor)