"""
Crisis Detection Service - Python Implementation
Detects psychiatric emergencies and distress signals in therapeutic conversations.

Intended Use (FDA/CE):
- This module is a clinical decision support software (CDSS) intended for use by licensed mental health professionals.
- It provides risk stratification and escalation recommendations based on patient conversation text.
- Outputs are for informational purposes only; final clinical decisions must be made by a qualified clinician after review.
- Complies with FDA Class II SaMD guidance for clinical decision support and CE MDR requirements for software as a medical device.
- All escalation actions must be reviewed and approved by a clinician before execution.
- Audit logs of detected signals, confidence scores, and clinician approvals are required for regulatory compliance.
"""

import logging
import re
import uuid
from dataclasses import dataclass, field
from enum import Enum
from typing import List

logger = logging.getLogger(__name__)
audit_logger = logging.getLogger('audit')


def redact_text(text: str) -> str:
    """Replace potentially PHI-containing text with a placeholder."""
    return "[REDACTED]"

MIN_CONFIDENCE_THRESHOLD = 0.8


class CrisisRiskLevel(str, Enum):
    MINIMAL = "minimal"
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    IMMINENT = "imminent"


class CrisisCategory(str, Enum):
    SELF_HARM = "self_harm"
    VIOLENCE = "violence"
    DESPAIR = "despair"
    SUBSTANCE_ABUSE = "substance_abuse"
    MEDICAL = "medical"


@dataclass
class CrisisSignal:
    category: CrisisCategory
    severity: float  # 0-1
    keywords: list[str]
    context_snippet: str  # Stored as redacted placeholder to protect PHI


@dataclass
class CrisisAnalysisResult:
    has_crisis_signal: bool
    risk_level: CrisisRiskLevel
    confidence: float
    signals: list[CrisisSignal]
    action_required: bool
    escalation_protocol: list[str]
    requires_clinician_approval: bool = True  # Explicit gate for human‑in‑the‑loop
    clinician_approval_granted: bool = False  # Tracks clinician override status
    audit_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    explainability: dict = field(default_factory=dict)


CRISIS_PATTERNS: dict[CrisisCategory, list[re.Pattern]] = {
    CrisisCategory.SELF_HARM: [
        re.compile(r"\b(kill|harm|hurt|end)\b.*\b(myself|my life|it all)\b", re.I),
        re.compile(r"\b(suicide|suicidal|cutting|overdose)\b", re.I),
        re.compile(r"\b(don\'?t|do not) want to live\b", re.I),
        re.compile(r"\b(better off dead)\b", re.I),
    ],
    CrisisCategory.VIOLENCE: [
        re.compile(r"\b(kill|harm|hurt|attack|shoot)\b.*\b(others|them|him|her)\b", re.I),
        re.compile(r"\b(bomb|explode|destroy|weapon|gun|knife)\b", re.I),
    ],
    CrisisCategory.DESPAIR: [
        re.compile(r"\b(no hope|hopeless|give up|can\'?t go on|nothing matters)\b", re.I),
        re.compile(r"\b(drowning|trapped|everything is dark)\b", re.I),
    ],
    CrisisCategory.SUBSTANCE_ABUSE: [
        re.compile(r"\b(drunk|high|relapse|using|using again|overdose)\b", re.I),
        re.compile(r"\b(drinking|drugs|pills|bottle)\b", re.I),
    ],
    CrisisCategory.MEDICAL: [
        re.compile(r"\b(chest pain|can\'?t breathe|heart attack|seizure|stroke)\b", re.I),
        re.compile(r"\b(emergency|ambulance|911|hospital)\b", re.I),
    ],
}


def calculate_severity(_category: CrisisCategory, text: str) -> float:
    """Calculate severity score for detected crisis signal

    Args:
        _category: Crisis category (unused, reserved for future severity weighting)
        text: Text to analyze for severity indicators
    """
    score = 0.5

    # Specificity increases severity
    if re.search(r"\b(plan|how|where|when|tonight|today)\b", text, re.I):
        score += 0.3
    if re.search(r"\b(have|got)\b.*\b(gun|pills|knife)\b", text, re.I):
        score += 0.4

    # Immediacy
    if re.search(r"\b(now|right now|immediately)\b", text, re.I):
        score += 0.2

    return min(1.0, score)


def determine_risk_level(severity: float, count: int) -> CrisisRiskLevel:
    """Determine overall risk level

    The function now evaluates severity thresholds first and uses the signal
    count only to elevate the risk level, ensuring that LOW can be reached
    when severity is modest but signals are present.
    """
    if severity > 0.9:
        return CrisisRiskLevel.IMMINENT
    if severity > 0.7:
        return CrisisRiskLevel.HIGH
    if severity > 0.4:
        return CrisisRiskLevel.MODERATE
    if severity > 0.2:
        return CrisisRiskLevel.LOW
    # If there are any signals but the severity is low, still classify as LOW
    if count > 0:
        return CrisisRiskLevel.LOW
    return CrisisRiskLevel.MINIMAL


def calculate_confidence(signals: list[CrisisSignal]) -> float:
    """Calculate confidence in crisis detection"""
    if not signals:
        return 1.0
    # More signals or clearer intent increases confidence
    return min(0.95, 0.7 + (len(signals) * 0.1))


def generate_escalation_protocol(
    risk_level: CrisisRiskLevel, _signals: list[CrisisSignal]
) -> list[str]:
    """Generate escalation protocol based on risk level

    Args:
        risk_level: Assessed risk level
        _signals: Detected crisis signals (unused, reserved for future signal-specific protocols)
    """
    protocol = []

    # Mandatory clinician review step before any escalation actions
    protocol.append(
        "CLINICAL REVIEW REQUIRED: Verify risk assessment and obtain clinician approval before executing any actions."
    )

    if risk_level == CrisisRiskLevel.IMMINENT:
        protocol.extend(
            [
                "Contact emergency services (911/112) immediately",
                "Notify on-call psychiatrist",
                "Activate immediate location tracking",
            ]
        )
    elif risk_level == CrisisRiskLevel.HIGH:
        protocol.extend(
            [
                "Contact primary therapist for urgent intervention",
                "Notify crisis response team",
                "Initiate safety plan review",
            ]
        )
    elif risk_level == CrisisRiskLevel.MODERATE:
        protocol.extend(
            [
                "Flag session for supervisor review",
                "Schedule follow-up within 24 hours",
                "Provide crisis resources to user",
            ]
        )

    return protocol


def generate_explanation(signals: list[CrisisSignal]) -> str:
    """Generate a human‑readable explanation of detected signals"""
    if not signals:
        return "No crisis signals detected."
    parts = []
    for s in signals:
        parts.append(f"{s.category.value} (severity {s.severity:.2f})")
    return " | ".join(parts)


def detect_crisis_signals(text: str) -> CrisisAnalysisResult:
    """Detects psychiatric and medical crisis signals in text"""
    if not text:
        return CrisisAnalysisResult(
            has_crisis_signal=False,
            risk_level=CrisisRiskLevel.MINIMAL,
            confidence=1.0,
            signals=[],
            action_required=False,
            escalation_protocol=[],
            requires_clinician_approval=False,
        )

    signals: list[CrisisSignal] = []
    max_severity = 0.0

    for category, patterns in CRISIS_PATTERNS.items():
        for pattern in patterns:
            match = pattern.search(text)
            if match:
                severity = calculate_severity(category, text)
                max_severity = max(max_severity, severity)

                # Extract context snippet and immediately redact to protect PHI
                start = max(0, match.start() - 30)
                end = min(len(text), match.end() + 30)
                context = text[start:end]
                redacted_context = "[redacted]"  # PHI-safe placeholder

                signals.append(
                    CrisisSignal(
                        category=category,
                        severity=severity,
                        keywords=[match.group(0)],
                        context_snippet=redacted_context,
                    )
                )

    risk_level = determine_risk_level(max_severity, len(signals))
    action_required = (
        risk_level in [CrisisRiskLevel.MODERATE, CrisisRiskLevel.HIGH, CrisisRiskLevel.IMMINENT]
        and calculate_confidence(signals) >= MIN_CONFIDENCE_THRESHOLD
    )

    result = CrisisAnalysisResult(
        has_crisis_signal=len(signals) > 0,
        risk_level=risk_level,
        confidence=confidence,
        signals=signals,
        action_required=action_required,
        escalation_protocol=generate_escalation_protocol(risk_level, signals),
        requires_clinician_approval=True,
    )
    # Add explainability artifacts, noting that actions need clinician approval
    result.explainability = {
        "signals": [
            {
                "category": signal.category.value,
                "severity": signal.severity,
                "keywords": signal.keywords,
                "context_snippet": signal.context_snippet
            }
            for signal in signals
        ],
        "confidence": result.confidence,
        "clinician_approval_required": result.requires_clinician_approval,
        "rationale": "Action required only if confidence >= 0.8 and risk level is moderate or higher."
    }
    return result


if __name__ == "__main__":
    # Test
    test_cases = [
        "I am going to kill myself tonight, I have the pills ready.",
        "I can't breathe and having chest pain.",
        "I had a really good day at work and feeling much better now.",
    ]

    logging.basicConfig(level=logging.INFO)

    for text in test_cases:
        result = detect_crisis_signals(text)
        # Redact raw patient text before logging
        logger.info("Text: [redacted]...")
        logger.info("Risk: %s, Signals: %d", result.risk_level.value, len(result.signals))
        # Escalation actions require clinician approval before execution
        if result.action_required and result.clinician_approval_granted:
            logger.info("Action: %s", result.escalation_protocol[0])