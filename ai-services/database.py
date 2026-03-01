# Apply HIPAA compliance measures
        # For patient-related analysis types, always route through ProtectedHealthData utilities
        if analysis_type in ["therapy_session", "crisis_detection", "mental_health"]:
            # Apply proper PHI encryption using ProtectedHealthData utilities
            data = ProtectedHealthData.encrypt(data)
        # No longer use fragile substring matching