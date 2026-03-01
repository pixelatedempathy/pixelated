"""
Emotion Validator - Python Implementation
Validates emotion detection results with bias detection integration
"""

import logging
import os
import re
from enum import Enum

from pydantic import BaseModel, Field

from pipeline.api.phiproxy import ProtectedHealthData, audit_event
from pipeline.security.encryption import encrypt_data

logger = logging.getLogger(__name__)

# Import the ProtectedHealthData utility for PHI handling
from ai.services.security.protected_health_data import protect_phi


class EmotionCategory(str, Enum):
    HAPPY = "happy"
    SAD = "sad"
    ANGRY = "angry"
    FEARFUL = "fearful"
    SURPRISED = "surprised"
    DISGUSTED = "disgusted"
    NEUTRAL = "neutral"
    ANXIOUS = "anxious"
    CONFUSED = "confused"


class ParticipantDemographics(BaseModel):
    age: str = ""
    gender: str = ""
    ethnicity: str = ""
    primary_language: str = ""

    def get_age(self) -> str:
        # Retrieve age via PHI‑safe service
        return ProtectedHealthData.get(self, "age", "")

    def get_gender(self) -> str:
        return ProtectedHealthData.get(self, "gender", "")

    def get_ethnicity(self) -> str:
        return ProtectedHealthData.get(self, "ethnicity", "")

    def get_primary_language(self) -> str:
        return ProtectedHealthData.get(self, "primary_language", "")


class EmotionData(BaseModel):
    session_id: str
    detected_emotion: str
    confidence: float
    context: str
    participant_demographics: ParticipantDemographics | None = None
    response_text: str | None = None
    timestamp: str | None = None

    def encrypt_fields(self) -> "EmotionData":
        # Encrypt sensitive fields at rest
        self.session_id = encrypt_data(self.session_id)
        self.detected_emotion = encrypt_data(self.detected_emotion)
        if self.response_text:
            self.response_text = encrypt_data(self.response_text)
        if self.context:
            self.context = encrypt_data(self.context)
        return self


class EmotionValidationResult(BaseModel):
    is_valid: bool
    confidence: float
    issues: list[str] = Field(default_factory=list)
    bias_score: float = 0.0
    emotion_consistency: float = 0.0
    authenticity_score: float = 0.0
    contextual_appropriate: bool = True
    recommendations: list[str] = Field(default_factory=list)
    explanation: str = Field(default="")  # Model reasoning for clinical review


# Bias patterns in emotional responses
BIAS_PATTERNS = [
    {
        "pattern": r"aggressive|angry|hostile",
        "demographic": "male",
        "bias": "gender_aggression",
    },
    {
        "pattern": r"emotional|sensitive|caring",
        "demographic": "female",
        "bias": "gender_emotion",
    },
]

VALID_EMOTIONS = [e.value for e in EmotionCategory]


def _is_consent_granted(session_id: str) -> bool:
    """
    Placeholder consent check.
    In production this would query a consent store.
    """
    # For demonstration, always return True; replace with real consent logic.
    return True


def _human_in_the_loop_approved() -> bool:
    """
    Stub for human‑in‑the‑loop approval.
    In a real system this could check a review queue or clinician sign‑off.
    """
    # Return True to simulate approval; change to False to force invalid result.
    return True


def _mask_phi(value: str) -> str:
    """
    Simple PHI redaction for log output.
    """
    if not value:
        return "[REDACTED]"
    # Keep first and last 3 characters, replace middle with asterisks
    return value[:3] + "*" * max(0, len(value) - 6) + value[-3:]


def validate_emotion_result(
    emotion_data: EmotionData,
    *,
    clinician_override: bool = False,
) -> EmotionValidationResult:
    """Validate emotion detection result with bias detection"""

    # ---- HIPAA PHI & Consent Safeguards ----
    if not _is_consent_granted(emotion_data.session_id):
        issues = ["Consent not granted for processing this session"]
        return EmotionValidationResult(
            is_valid=False,
            confidence=0.0,
            issues=issues,
            explanation="Consent check failed – processing halted.",
        )

    # Ensure PHI is encrypted before any further handling
    emotion_data = emotion_data.encrypt_fields()

    issues = []
    recommendations = []
    explanation_parts = []

    # Basic validation
    if not emotion_data.detected_emotion or emotion_data.detected_emotion.strip() == "":
        issues.append("Missing or empty detected emotion")
        explanation_parts.append("detected_emotion missing")

    if not emotion_data.context or emotion_data.context.strip() == "":
        issues.append("Missing emotional context")
        explanation_parts.append("context missing")

    if emotion_data.confidence < 0.3:
        issues.append("Low emotion detection confidence")
        explanation_parts.append("low confidence")

    # Check for valid emotion categories (exact normalized match)
    normalized_emotion = emotion_data.detected_emotion.lower().strip()
    if normalized_emotion not in VALID_EMOTIONS:
        issues.append("Unrecognized emotion category")
        explanation_parts.append("unrecognized emotion")

    # Calculate authenticity score
    authenticity_score = 0.5
    if emotion_data.response_text:
        # Higher score for first-person emotional statements
        if re.search(r"\bI (feel|am|think)\b", emotion_data.response_text, re.I):
            authenticity_score += 0.3
        # Penalize generic text
        if re.search(r"lorem ipsum|placeholder", emotion_data.response_text, re.I):
            authenticity_score -= 0.4

    authenticity_score = max(0.0, min(1.0, authenticity_score))
    explanation_parts.append(f"authenticity_score={authenticity_score:.2f}")

    # Emotion consistency with context
    emotion_consistency = calculate_emotion_consistency(
        emotion_data.context.lower(), emotion_data.detected_emotion.lower()
    )
    explanation_parts.append(f"emotion_consistency={emotion_consistency:.2f}")

    # Contextual appropriateness
    contextual_appropriate = assess_contextual_appropriateness(
        emotion_data.context.lower(), emotion_data.detected_emotion.lower(), emotion_data.confidence
    )
    if not contextual_appropriate:
        issues.append("Contextually inappropriate emotional response")
        explanation_parts.append("contextually inappropriate")

    # Calculate bias score (simplified)
    # Protect PHI before processing
    if emotion_data.participant_demographics:
        protected_demographics = protect_phi(emotion_data.participant_demographics)
        bias_score = detect_bias_patterns(
            emotion_data.response_text, protected_demographics
        )
    explanation_parts.append(f"bias_score={bias_score:.2f}")

    # Emit audit event for validation start (now with full context)
    audit_event(
        "emotion_validation_start",
        session_id=_mask_phi(emotion_data.session_id),
        is_valid=False,  # will be updated later
        bias_score=bias_score,
        confidence=emotion_data.confidence,
        issues=",".join(issues) if issues else "",
    )

    # Generate recommendations
    if emotion_data.confidence < 0.5:
        recommendations.append("Consider retraining emotion detection model with more diverse data")

    if bias_score > 0.6:
        recommendations.append("Review training data for demographic bias in emotional responses")

    if emotion_consistency < 0.4:
        recommendations.append("Enhance context understanding in emotion detection algorithms")

    # Human‑in‑the‑loop review check
    if not _human_in_the_loop_approved() and not clinician_override:
        issues.append("Human‑in‑the‑loop review required")
        explanation_parts.append("human‑in‑the‑loop review missing")
        # Force result to be invalid unless overridden
        is_valid = False
    else:
        # Calculate overall confidence
        basic_confidence = max(0.1, emotion_data.confidence)
        overall_confidence = (
            0.4 * basic_confidence
            + 0.3 * emotion_consistency
            + 0.3 * (1 - bias_score)
        )
        overall_confidence = max(0.1, min(1.0, overall_confidence))

        # Determine validity
        is_valid = len(issues) == 0 and bias_score < 0.6 and overall_confidence > 0.5

        # Add final issues/recommendations based on computed values
        if not is_valid:
            issues.append("Validation failed due to safety constraints")

        explanation_parts.append(f"overall_confidence={overall_confidence:.2f}")
        explanation_parts.append(f"is_valid={is_valid}")

    # Build explanation string for clinical review
    explanation = " | ".join(explanation_parts)

    # Emit final audit event with complete results
    audit_event(
        "emotion_validation_result",
        session_id=_mask_phi(emotion_data.session_id),
        is_valid=is_valid,
        confidence=overall_confidence,
        bias_score=bias_score,
        issues=",".join(issues) if issues else "",
        recommendations=",".join(recommendations) if recommendations else "",
        explanation=explanation,
    )

    # TODO: Route participant_demographics through ProtectedHealthData utility before further processing
    # (e.g., protect_phi(emotion_data.participant_demographics))

    return EmotionValidationResult(
        is_valid=is_valid,
        confidence=overall_confidence,
        issues=issues,
        bias_score=bias_score,
        emotion_consistency=emotion_consistency,
        authenticity_score=authenticity_score,
        contextual_appropriate=contextual_appropriate,
        recommendations=recommendations,
        explanation=explanation,
    )


def calculate_emotion_consistency(context: str, emotion: str) -> float:
    """Calculate emotion-context consistency"""

    consistency_rules = [
        {
            "context": r"crisis|emergency|urgent|help",
            "emotions": ["fearful", "anxious", "sad"],
            "weight": 0.9,
        },
        {
            "context": r"positive|good|success|achievement",
            "emotions": ["happy", "surprised"],
            "weight": 0.8,
        },
        {
            "context": r"conflict|argument|fight",
            "emotions": ["angry", "frustrated"],
            "weight": 0.8,
        },
    ]

    max_consistency = 0.5  # Base consistency

    for rule in consistency_rules:
        if re.search(rule["context"], context):
            for expected_emotion in rule["emotions"]:
                if expected_emotion in emotion:
                    max_consistency = max(max_consistency, rule["weight"])

    return max_consistency


def assess_contextual_appropriateness(context: str, emotion: str, confidence: float) -> bool:
    """Assess if emotion is contextually appropriate
    
    This function evaluates whether an emotional response is appropriate given the
    conversation context. In a production setting this decision would be subject
    to Clinical Decision Support safeguards including:
      - Audit logging of the assessment parameters
      - Potential clinician override via environment variable CLINICIAN_OVERRIDE
      - Explainability artifacts for safety boards
    
    Returns:
        bool: True if appropriate, False if inappropriate.
    """
    # Emit audit event for CDS assessment
    logger.info(
        "CDS_ASSESSMENT: context=%s emotion=%s confidence=%.2f",
        context, emotion, confidence
    )

    # Simple clinician override mechanism (placeholder)
    # In a production setting this could be replaced with a proper override service.
    if os.getenv("CLINICIAN_OVERRIDE", "").lower() == "true":
        logger.info("CDS_OVERRIDE: clinician override enabled, allowing assessment")
        # Override logic would be implemented here; for now we allow the assessment
        return True

    inappropriate_combos = [
        {"context": r"therapy|counseling|support", "emotion": r"happy|excited", "threshold": 0.8},
        {"context": r"crisis|emergency", "emotion": r"happy|amused", "threshold": 0.7},
        {"context": r"grief|loss", "emotion": r"happy|excited", "threshold": 0.9},
    ]

    for combo in inappropriate_combos:
        if (
            re.search(combo["context"], context)
            and re.search(combo["emotion"], emotion)
            and confidence > combo["threshold"]
        ):
            logger.info(
                "CDS_ISSUE: Inappropriate emotional response detected: context=%s emotion=%s confidence=%.2f",
                context, emotion, confidence
            )
            return False

    logger.info("CDS_CLEAR: No inappropriate emotional response detected")
    return True


def detect_bias_patterns(text: str, demographics: ParticipantDemographics) -> float:
    """Detect bias patterns in emotional responses"""

    bias_score = 0.0

    for pattern in BIAS_PATTERNS:
        # Retrieve gender safely via PHI‑safe service
        gender = ProtectedHealthData.get(demographics, "gender", "")
        # Emit audit event for demographic access
        audit_event(
            "demographic_access",
            session_id=_mask_phi(ProtectedHealthData.get(demographics, "session_id", "")),
            field="gender",
            masked_value=_mask_phi(gender),
            raw_value=gender,
        )
        if (
            re.search(pattern["pattern"], text, re.I)
            and gender
            and gender.lower() == pattern["demographic"].lower()
        ):
            bias_score += 0.3

    # Emit audit event when bias is detected
    if bias_score > 0:
        audit_event(
            "bias_detected",
            session_id=_mask_phi(ProtectedHealthData.get(demographics, "session_id", "")),
            bias_score=bias_score,
        )

    return min(1.0, bias_score)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Test
    test_data = EmotionData(
        session_id="test123",
        detected_emotion="happy",
        confidence=0.8,
        context="positive success",
        response_text="I feel really proud of myself today.",
        participant_demographics=ParticipantDemographics(
            age="26-35", gender="female", ethnicity="other", primary_language="en"
        ),
    )

    # Encrypt sensitive fields before any persistence or transmission
    test_data = test_data.encrypt_fields()

    # Example of clinician override usage:
    # result = validate_emotion_result(test_data, clinician_override=True)
    result = validate_emotion_result(test_data)

    # Redact session_id in logs
    logger.info("Valid: %s (session: %s)", result.is_valid, _mask_phi(test_data.session_id))
    logger.info("Confidence: %.2f", result.confidence)
    logger.info("Authenticity: %.2f", result.authenticity_score)
    logger.info("Bias Score: %.2f", result.bias_score)
    logger.info("Explanation: %s", result.explanation)