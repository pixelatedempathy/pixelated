"""
Therapeutic AI API - Flask Application
Exposes PII scrubbing, crisis detection, emotion validation, and bias detection services
"""

import logging
import os
import sys

from flask import Flask, jsonify, request
from flask_cors import CORS

# Add security module to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "security"))

from bias_detector import TherapeuticSession, analyze_session_bias
from crisis_detection import detect_crisis_signals
from database import DatabaseService
from emotion_validator import EmotionData, validate_emotion_result
from pii_scrubber import ScrubberOptions, scan_for_pii, scrub_pii

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Clinical Decision Support Safeguards: confidence threshold for actionable alerts
CONFIDENCE_THRESHOLD = 0.8

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Initialize Database
MONGODB_URI = os.environ.get("MONGODB_URI")
db_service = DatabaseService(MONGODB_URI) if MONGODB_URI else None

if db_service:
    db_service.connect()
    # Ensure encryption at rest (placeholder for actual encryption enforcement)
    db_service.ensure_encryption_at_rest()
else:
    logger.warning("MONGODB_URI not set. Database storage disabled.")


# ----------------------------------------------------------------------
# Helper functions for HIPAA compliance and clinical safeguards
# ----------------------------------------------------------------------
def emit_audit_event(event_type: str, session_id: str, payload: dict):
    """
    Emit a HIPAA audit event to a secure audit topic.
    This is a placeholder; in production it would publish to a dedicated
    audit message bus or logging system.
    """
    # Placeholder implementation – actual audit publishing would go here
    pass


def verify_consent(session_id: str) -> bool:
    """
    Verify that the patient has provided consent before processing
    any PHI identified by `session_id`.
    This is a placeholder; real consent logic would query an auth service.
    """
    # Placeholder implementation – always return True for now
    return True


# ----------------------------------------------------------------------


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    db_status = "connected" if db_service and db_service.db is not None else "disconnected"
    return jsonify(
        {
            "status": "healthy",
            "service": "Pixelated Empathy Therapeutic AI",
            "version": "1.0.0",
            "mode": "CPU-only",
            "database": db_status,
        }
    )


@app.route("/api/security/scrub-pii", methods=["POST"])
def scrub_pii_endpoint():
    """
    Scrub PII from text
    """
    try:
        data = request.json
        text = data.get("text", "")
        options_dict = data.get("options", {})
        session_id = data.get("session_id")

        # Consent verification before processing PHI
        if session_id and not verify_consent(session_id):
            return jsonify({"success": False, "error": "Consent required"}), 403

        options = ScrubberOptions(**options_dict) if options_dict else None
        scrubbed = scrub_pii(text, options)

        result = {
            "success": True,
            "original_length": len(text),
            "scrubbed_text": scrubbed,
            "scrubbed_length": len(scrubbed),
        }

        if db_service and session_id:
            db_service.save_analysis_result("pii_scrub", result, session_id)
            # Emit audit event for PHI write
            emit_audit_event("pii_scrub", session_id, result)

        return jsonify(result)
    except Exception:
        logger.error("PII scrubbing error")
        return jsonify({"success": False, "error": "An internal error occurred"}), 500


@app.route("/api/security/detect-crisis", methods=["POST"])
def detect_crisis_endpoint():
    """
    Detect crisis signals in text
    """
    try:
        data = request.json
        text = data.get("text", "")
        session_id = data.get("session_id")

        # Consent verification before processing PHI
        if session_id and not verify_consent(session_id):
            return jsonify({"success": False, "error": "Consent required"}), 403

        result = detect_crisis_signals(text)

        # Apply confidence threshold before marking action as required
        should_act = result.confidence >= CONFIDENCE_THRESHOLD
        crisis_detail = {
            "success": True,
            "has_signal": result.has_crisis_signal,
            "risk_level": result.risk_level.value,
            "confidence": result.confidence,
            "action_required": result.action_required if should_act else False,
            "escalation_protocol": result.escalation_protocol,
            "requires_clinician_review": True,  # Flag for human‑in‑the‑loop review
            "human_review_required": True,      # Explicit safeguard flag
            "model_explainability": {
                "confidence": result.confidence,
                "risk_level": result.risk_level.value,
                "signal_count": len(result.signals),
            },
            "signals": [
                {
                    "category": s.category.value,
                    "severity": s.severity,
                    "keywords": s.keywords,
                    "context": s.context_snippet,
                }
                for s in result.signals
            ],
        }

        if db_service and (result.has_crisis_signal or session_id):
            # Save the clinical decision support response
            db_service.save_analysis_result("crisis_detection", crisis_detail, session_id)
            # Emit dedicated audit artifact for clinical safety review
            if session_id:
                emit_audit_event("crisis_detection", session_id, crisis_detail)
            # Also emit combined audit if session_id present
            if session_id:
                emit_audit_event("crisis_audit", session_id, crisis_detail)

        return jsonify(crisis_detail)
    except Exception:
        logger.error("Crisis detection error")
        return jsonify({"success": False, "error": "An internal error occurred"}), 500


@app.route("/api/emotion/validate", methods=["POST"])
def validate_emotion_endpoint():
    """
    Validate emotion detection result
    """
    try:
        data = request.json
        emotion_data = EmotionData(**data)

        result = validate_emotion_result(emotion_data)
        response = {"success": True, **result.model_dump()}

        if db_service:
            db_service.save_analysis_result("emotion_validation", response, emotion_data.session_id)
            # Emit audit event for PHI write
            emit_audit_event("emotion_validation", emotion_data.session_id, response)

        return jsonify(response)
    except Exception:
        logger.error("Emotion validation error")
        return jsonify({"success": False, "error": "An internal error occurred"}), 500


@app.route("/api/bias/analyze-session", methods=["POST"])
def analyze_bias_endpoint():
    """
    Analyze therapeutic session for bias
    """
    try:
        data = request.json
        session = TherapeuticSession(**data)

        result = analyze_session_bias(session)
        response = {"success": True, **result.model_dump()}

        if db_service:
            db_service.save_analysis_result("bias_analysis", response, session.session_id)
            # Emit audit event for PHI write
            emit_audit_event("bias_analysis", session.session_id, response)

        return jsonify(response)
    except Exception:
        logger.error("Bias analysis error")
        return jsonify({"success": False, "error": "An internal error occurred"}), 500


@app.route("/api/combined/analyze-conversation", methods=["POST"])
def analyze_conversation_endpoint():
    """
    Combined analysis: PII, crisis, emotion, and bias
    """
    try:
        data = request.json
        text = data.get("text", "")
        session_id = data.get("session_id")

        # Consent verification before processing PHI
        if session_id and not verify_consent(session_id):
            return jsonify({"success": False, "error": "Consent required"}), 403

        response = {"success": True, "analyses": {}}

        # PII scrubbing
        if data.get("scrub_pii", True):
            scrubbed = scrub_pii(text)
            pii_scan = scan_for_pii(text)
            response["analyses"]["pii"] = {
                "scrubbed_text": scrubbed,
                "pii_found": pii_scan["found"],
                "categories": pii_scan["categories"],
            }

        # Crisis detection with safeguards
        if data.get("detect_crisis", True):
            crisis = detect_crisis_signals(text)

            # Apply confidence threshold and add review flags
            should_act = crisis.confidence >= CONFIDENCE_THRESHOLD
            crisis_detail = {
                "success": True,
                "has_signal": crisis.has_crisis_signal,
                "risk_level": crisis.risk_level.value,
                "confidence": crisis.confidence,
                "action_required": crisis.action_required if should_act else False,
                "escalation_protocol": crisis.escalation_protocol,
                "requires_clinician_review": True,
                "human_review_required": True,
                "model_explainability": {
                    "confidence": crisis.confidence,
                    "risk_level": crisis.risk_level.value,
                    "signal_count": len(crisis.signals),
                },
                "signals": [
                    {
                        "category": s.category.value,
                        "severity": s.severity,
                        "keywords": s.keywords,
                        "context": s.context_snippet,
                    }
                    for s in crisis.signals
                ],
            }
            response["analyses"]["crisis"] = crisis_detail

            # Audit artifact for combined analysis as well
            if db_service and session_id:
                db_service.save_analysis_result("combined_crisis_audit", crisis_detail, session_id)
                emit_audit_event("combined_crisis_audit", session_id, crisis_detail)

        # Emotion validation (if emotion data provided)
        if data.get("validate_emotion") and "emotion_data" in data:
            emotion_data = EmotionData(**data["emotion_data"])
            emotion_result = validate_emotion_result(emotion_data)
            response["analyses"]["emotion"] = emotion_result.model_dump()

            if db_service:
                db_service.save_analysis_result("emotion_validation", emotion_result.model_dump(), emotion_data.session_id)
                emit_audit_event("emotion_validation", emotion_data.session_id, emotion_result.model_dump())

        # Bias analysis (if session data provided)
        if data.get("analyze_bias") and "session_data" in data:
            session = TherapeuticSession(**data["session_data"])
            bias_result = analyze_session_bias(session)
            response["analyses"]["bias"] = bias_result.model_dump()

            if db_service:
                db_service.save_analysis_result("bias_analysis", bias_result.model_dump(), session.session_id)
                emit_audit_event("bias_analysis", session.session_id, bias_result.model_dump())

        # Persist combined analysis audit record
        if db_service and session_id:
            db_service.save_analysis_result("combined_analysis", response, session_id)
            emit_audit_event("combined_analysis", session_id, response)

        return jsonify(response)
    except Exception:
        logger.error("Combined analysis error")
        return jsonify({"success": False, "error": "An internal error occurred"}), 500


if __name__ == "__main__":
    logger.info("Starting Pixelated Empathy Therapeutic AI API")
    logger.info("Mode: CPU-only")
    logger.info("Listening on http://0.0.0.0:5000")

    app.run(host="0.0.0.0", port=5000, debug=os.getenv("FLASK_DEBUG", "False") == "True")