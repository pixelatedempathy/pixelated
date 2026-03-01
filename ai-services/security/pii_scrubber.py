"""
PII Scrubber - Python Implementation
HIPAA-compliant PII redaction for therapeutic transcripts
"""

import re
import random
from dataclasses import dataclass
from enum import Enum
from typing import Any
import logging

logger = logging.getLogger(__name__)

class PIICategory(str, Enum):
    NAMES = "names"
    EMAILS = "emails"
    PHONES = "phones"
    ADDRESSES = "addresses"
    SSN = "ssn"
    DATES = "dates"
    FINANCIAL = "financial"


@dataclass
class ScrubberOptions:
    mask_type: str = "placeholder"  # placeholder, redacted, randomized
    enabled_categories: list[PIICategory] = None
    custom_replacements: dict[str, str] = None

    def __post_init__(self):
        if self.enabled_categories is None:
            self.enabled_categories = [
                PIICategory.NAMES,
                PIICategory.EMAILS,
                PIICategory.PHONES,
                PIICategory.ADDRESSES,
                PIICategory.SSN,
                PIICategory.DATES,
                PIICategory.FINANCIAL,
            ]
        if self.custom_replacements is None:
            self.custom_replacements = {}


PII_PATTERNS: dict[PIICategory, list[re.Pattern]] = {
    PIICategory.NAMES: [
        re.compile(r"\b(?:Mr\.|Ms\.|Mrs\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b"),
    ],
    PIICategory.EMAILS: [
        re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
    ],
    PIICategory.PHONES: [
        re.compile(r"\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"),
    ],
    PIICategory.ADDRESSES: [
        re.compile(r"\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:St|Ave|Rd|Blvd|Ln|Ct|Dr)\b"),
    ],
    PIICategory.SSN: [
        re.compile(r"\b\d{3}-\d{2}-\d{4}\b"),
    ],
    PIICategory.DATES: [
        re.compile(r"\b(?:\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|(?:[A-Z][a-z]+\s+\d{1,2},\s+\d{4}))\b"),
    ],
    PIICategory.FINANCIAL: [
        re.compile(r"\b(?:\d{4}-){3}\d{4}\b"),  # Credit card format
    ],
}

PLACEHOLDERS: dict[PIICategory, str] = {
    PIICategory.NAMES: "[NAME]",
    PIICategory.EMAILS: "[EMAIL]",
    PIICategory.PHONES: "[PHONE]",
    PIICategory.ADDRESSES: "[ADDRESS]",
    PIICategory.SSN: "[SSN]",
    PIICategory.DATES: "[DATE]",
    PIICategory.FINANCIAL: "[FINANCIAL]",
}


def scrub_pii(text: str, options: ScrubberOptions | None = None) -> str:
    """Redacts PII from text based on configured categories"""
    # Emit HIPAA audit event for PHI processing only when text is non‑empty
    if text:
        ProtectedHealthData.emit_audit_event("PII_PROCESSING", {"function": "scrub_pii"})
    
    if not text:
        return text

    if options is None:
        options = ScrubberOptions()

    # Emit audit event before processing
    audit_logger = logging.getLogger('hipaa.audit')
    audit_logger.info(
        "PHI_ACCESS|accessor=%s|categories=%s|mask_type=%s|original_count=%d",
        options.get('accessor', 'unknown'),
        [c.value for c in options.enabled_categories],
        options.mask_type,
        len(text)  # rough indicator of original size
    )

    scrubbed_text = text

    # Apply custom replacements first
    for target, replacement in options.custom_replacements.items():
        scrubbed_text = scrubbed_text.replace(target, replacement)

    # Apply category-based scrubbing
    for category in options.enabled_categories:
        patterns = PII_PATTERNS.get(category, [])
        for pattern in patterns:
            if options.mask_type == "placeholder":
                scrubbed_text = pattern.sub(PLACEHOLDERS[category], scrubbed_text)
            elif options.mask_type == "redacted":
                scrubbed_text = pattern.sub("[REDACTED]", scrubbed_text)
            elif options.mask_type == "randomized":
                # Generate a short random string to avoid leaking length information
                random_replacement = ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for _ in range(4))
                scrubbed_text = pattern.sub(lambda m: random_replacement, scrubbed_text)
            else:
                raise ValueError(f"Unsupported mask_type: {options.mask_type}")

    # Emit audit event with result summary
    audit_logger.info(
        "PHI_SCRUB_RESULT|categories=%s|mask_type=%s|scrubbed_length=%d",
        [c.value for c in options.enabled_categories],
        options.mask_type,
        len(scrubbed_text)
    )

    return scrubbed_text


def scan_for_pii(text: str) -> dict[str, Any]:
    """Scans text for PII without modifying it"""
    # Emit HIPAA audit event for PHI processing
    ProtectedHealthData.emit_audit_event("PII_PROCESSING", {"function": "scan_for_pii"})
    
    result = {
        "found": False,
        "categories": [],
        "count": 0,
    }

    for category, patterns in PII_PATTERNS.items():
        for pattern in patterns:
            matches = pattern.findall(text)
            if matches:
                result["found"] = True
                result["categories"].append(category.value)
                result["count"] += len(matches)

    # Emit audit event for scan activity
    audit_logger = logging.getLogger('hipaa.audit')
    audit_logger.info(
        "PHI_SCAN|found=%s|categories=%s|match_count=%d",
        result["found"],
        result["categories"],
        result["count"]
    )

    return result


if __name__ == "__main__":
    # Test
    sample = "Contact Dr. John Smith at john@example.com or (555) 010-9988"
    # Use logging instead of print for production code
    logging.basicConfig(level=logging.INFO)
    logger.info("Scrubbed sample: %s", scrub_pii(sample))
    logger.info("Scan result: %s", scan_for_pii(sample))
    # Original data is not logged to avoid exposing PHI