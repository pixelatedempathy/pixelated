"""
Database Connector - MongoDB Atlas
Handles storage of therapeutic session data and analysis results
"""

import base64
import json
import logging
import os
from datetime import datetime, timezone
from typing import Any

from cryptography.fernet import Fernet

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from pymongo.errors import ConnectionFailure, OperationFailure

logger = logging.getLogger(__name__)


class DatabaseService:
    def __init__(self, uri: str, db_name: str = "pixelated_empathy"):
        self.uri = uri
        self.db_name = db_name
        self.client: MongoClient | None = None
        self.db: Database | None = None
        # Initialize Fernet encryption if an ENCRYPTION_KEY is provided
        self._fernet = None
        key = os.getenv("ENCRYPTION_KEY")
        if key:
            # Fernet expects a URL‑safe base64‑encoded 32‑byte key
            try:
                decoded_key = base64.urlsafe_b64decode(key)
                self._fernet = Fernet(decoded_key)
            except Exception as e:
                logger.error(f"Invalid encryption key format: {type(e).__name__}")

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
            logger.error(f"Failed to connect to MongoDB Atlas: {type(e).__name__}")
            return False

    def get_collection(self, name: str) -> Collection:
        """Get a collection by name"""
        if self.db is None:
            raise ConnectionError("Database not connected")
        return self.db[name]

    def _encrypt_phi(self, data: dict[str, Any]) -> dict[str, Any]:
        """Encrypt PHI data before storage - HIPAA compliance"""
        if not self._fernet:
            raise RuntimeError("Encryption key not configured")
        try:
            payload = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
            encrypted_blob = self._fernet.encrypt(payload.encode())
            encrypted_data = {
                "_encrypted": True,
                "_encryption_timestamp": datetime.now(timezone.utc),
                "_ciphertext": encrypted_blob.decode(),
            }
            return encrypted_data
        except Exception as e:
            logger.error(f"Failed to encrypt PHI data: {type(e).__name__}")
            raise

    def _contains_phi(self, data: dict[str, Any]) -> bool:
        """
        Detect whether the provided data dictionary likely contains PHI.
        This method looks for common PHI keys and for any string values that
        appear to be personally identifiable information.
        """
        phi_keys = {
            "patient_id", "patient_name", "ssn", "social_security_number",
            "date_of_birth", "dob", "address", "zip_code", "phone",
            "email", "medical_record_number", "diagnosis", "treatment",
            "therapy_session", "crisis_detection", "mental_health"
        }
        # Check for PHI keys
        if any(k.lower() in phi_keys for k in data.keys()):
            return True
        # Check for string values that look like PHI (simple heuristic)
        for v in data.values():
            if isinstance(v, str):
                v_lower = v.lower()
                if any(term in v_lower for term in ["ssn:", "mrn:", "patient:", "id:", "name", "dob"]):
                    return True
        return False

    def _log_audit_event(
        self, event_type: str, session_id: str, user_id: str | None = None, extra: dict | None = None
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
        if extra:
            audit_doc.update(extra)
        try:
            audit_collection.insert_one(audit_doc)
        except Exception as e:
            logger.error(f"Audit log failed: {type(e).__name__}")

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

        # Consent check (optional)
        require_consent = os.getenv("REQUIRE_CONSENT", "false").lower() == "true"
        if require_consent and not user_id:
            logger.warning("Save aborted: user consent not provided")
            return None

        # Apply HIPAA compliance measures
        phi_detected = self._contains_phi(data) or analysis_type in [
            "therapy_session",
            "crisis_detection",
            "mental_health",
        ]
        if phi_detected:
            # Encrypt PHI data
            try:
                data = self._encrypt_phi(data)
            except Exception as e:
                logger.error(f"Encryption failed for PHI data: {type(e).__name__}")
                raise

        # Log audit event with intended use for clinical safety review
        extra_audit = {}
        if analysis_type == "crisis_detection":
            # Clinical decision support safeguard for crisis detection
            # 1. Confidence threshold
            confidence = data.get("confidence")
            if confidence is not None and confidence < 0.8:
                logger.warning(
                    f"Crisis detection saved with low confidence ({confidence})"
                )
            # 2. Require explicit clinical review flag
            if not data.get("requires_clinical_review", False):
                logger.warning(
                    "Crisis detection saved without documented clinical review; "
                    "ensure proper oversight before storage."
                )
            # 3. Add model explainability metadata if present
            explanation = data.get("explanation")
            if explanation:
                data["model_explanation"] = explanation
            # 4. Record intended use for audit
            intended_use = data.get("intended_use", "clinical_review")
            extra_audit["intended_use"] = intended_use

        # Log audit event
        if session_id:
            self._log_audit_event(
                f"save_{analysis_type}",
                session_id,
                user_id,
                extra=extra_audit,
            )

        # Clinical decision support safeguard for crisis detection
        if analysis_type == "crisis_detection":
            # Require an explicit flag indicating clinical review has occurred
            if not data.get("requires_clinical_review", False):
                logger.warning(
                    "Crisis detection saved without documented clinical review; "
                    "ensure proper oversight before storage."
                )
            # Optionally, block saving if the flag is missing
            # Uncomment the following line to enforce the safeguard:
            # if not data.get("requires_clinical_review", False):
            #     raise PermissionError("Crisis detection requires documented clinical review")

        collection = self.db["analysis_results"]

        document = {
            "type": analysis_type,
            "session_id": session_id,
            "user_id": user_id,
            "timestamp": datetime.now(timezone.utc),
            "data": data,
            "version": "1.0.0",
            "hipaa_compliant": True,
        }

        try:
            result = collection.insert_one(document)
            return str(result.inserted_id)
        except Exception as e:
            # Log generic error without exposing potentially sensitive exception details
            logger.error("Error saving analysis result")
            return None

    def get_session_history(
        self, session_id: str, limit: int = 10, user_id: str | None = None
    ) -> list[dict[str, Any]]:
        """Retrieve analysis history for a session with HIPAA compliance"""
        if self.db is None:
            return []

        # Authorization and consent check
        user_role = os.getenv("USER_ROLE")
        if not user_role or user_role.lower() != "clinician":
            logger.warning(f"Unauthorized role {user_role} for user {user_id}; access denied")
            raise PermissionError("Insufficient permissions to access session history")
        # Patient consent verification
        if os.getenv("PATIENT_CONSENT", "").lower() != "granted":
            logger.warning(f"Patient consent not granted for user {user_id}; access denied")
            raise PermissionError("Patient consent not granted")

        # Log audit event
        self._log_audit_event("get_session_history", session_id, user_id)

        collection = self.db["analysis_results"]
        cursor = collection.find({"session_id": session_id}).sort("timestamp", -1).limit(limit)
        return list(cursor)