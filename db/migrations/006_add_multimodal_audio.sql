-- Multimodal audio persistence for Pixelated Empathy
-- Stores audio uploads, transcriptions, audio emotion analysis, and fused outputs

-- Enable pgcrypto for encryption at rest
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Audit table for HIPAA access logging
CREATE TABLE IF NOT EXISTS hipaa_audit_log (
    id SERIAL PRIMARY KEY,
    event TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    operation TEXT NOT NULL,
    accessed_by UUID,
    accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger function to log INSERT on audio_recordings
CREATE OR REPLACE FUNCTION log_audio_recording_insert() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('INSERT', 'audio_recordings', NEW.id, 'INSERT', NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to log UPDATE on audio_recordings
CREATE OR REPLACE FUNCTION log_audio_recording_update() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('UPDATE', 'audio_recordings', NEW.id, 'UPDATE', NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to log DELETE on audio_recordings
CREATE OR REPLACE FUNCTION log_audio_recording_delete() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('DELETE', 'audio_recordings', OLD.id, 'DELETE', OLD.user_id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to fire audit functions on audio_recordings CRUD
CREATE TRIGGER trg_audio_recording_audit
AFTER INSERT OR UPDATE OR DELETE ON audio_recordings
FOR EACH ROW EXECUTE FUNCTION log_audio_recording_audit();

-- Trigger function for transcriptions audit
CREATE OR REPLACE FUNCTION log_transcription_audit() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('INSERT', 'transcriptions', NEW.id, 'INSERT', NEW.audio_recording_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for transcription CRUD
CREATE TRIGGER trg_transcription_audit
AFTER INSERT OR UPDATE OR DELETE ON transcriptions
FOR EACH ROW EXECUTE FUNCTION log_transcription_audit();

-- Trigger function for audio_emotions audit
CREATE OR REPLACE FUNCTION log_audio_emotion_audit() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('INSERT', 'audio_emotions', NEW.id, 'INSERT', NEW.audio_recording_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for audio_emotion CRUD
CREATE TRIGGER trg_audio_emotion_audit
AFTER INSERT OR UPDATE OR DELETE ON audio_emotions
FOR EACH ROW EXECUTE FUNCTION log_audio_emotion_audit();

-- Trigger function for multimodal_fusion_results audit
CREATE OR REPLACE FUNCTION log_fusion_audit() RETURNS trigger AS $$
BEGIN
    INSERT INTO hipaa_audit_log(event, table_name, record_id, operation, accessed_by)
    VALUES ('INSERT', 'multimodal_fusion_results', NEW.id, 'INSERT', NEW.session_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for fusion CRUD
CREATE TRIGGER trg_fusion_audit
AFTER INSERT OR UPDATE OR DELETE ON multimodal_fusion_results
FOR EACH ROW EXECUTE FUNCTION log_fusion_audit();

-- Main tables with PHI protection enhancements

CREATE TABLE IF NOT EXISTS audio_recordings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    user_id UUID,
    consent_id UUID REFERENCES consent(id),
    duration_seconds NUMERIC(10, 3),
    sample_rate INTEGER,
    channel_count INTEGER DEFAULT 1,
    codec VARCHAR(50),
    -- Encrypted storage path for the audio file (PHI)
    storage_path_encrypted BYTEA,
    -- Original storage_path kept for backward compatibility (non‑PHI)
    storage_path TEXT,
    size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_audio_recordings_session FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    CONSTRAINT fk_audio_recordings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transcriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audio_recording_id UUID REFERENCES audio_recordings(id) ON DELETE CASCADE,
    consent_id UUID REFERENCES consent(id),
    full_text_encrypted BYTEA,  -- Encrypted transcription text (PHI)
    full_text TEXT,             -- Plain text kept for backward compatibility
    language VARCHAR(10),
    overall_confidence NUMERIC(5, 3),
    processing_time_ms NUMERIC(12, 3),
    provider VARCHAR(50) DEFAULT 'whisper',
    model_name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audio_emotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audio_recording_id UUID REFERENCES audio_recordings(id) ON DELETE CASCADE,
    valence NUMERIC(6, 3),
    arousal NUMERIC(6, 3),
    dominance NUMERIC(6, 3),
    primary_emotion VARCHAR(50),
    confidence NUMERIC(6, 3),
    speech_rate_wpm NUMERIC(8, 3),
    intensity_score NUMERIC(6, 3),
    model_name VARCHAR(50) DEFAULT 'wav2vec2',
    reviewed_by UUID REFERENCES users(id),
    review_status VARCHAR(30) DEFAULT 'pending_review',
    explainability JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS multimodal_fusion_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    audio_recording_id UUID REFERENCES audio_recordings(id) ON DELETE CASCADE,
    text_emotion JSONB,
    audio_emotion JSONB,
    fused_emotion JSONB,
    conflict_score NUMERIC(6, 3),
    text_contribution NUMERIC(6, 3),
    audio_contribution NUMERIC(6, 3),
    reviewed_by UUID REFERENCES users(id),
    review_status VARCHAR(30) DEFAULT 'pending_review',
    explainability JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Convenience indexes for retrieval
CREATE INDEX IF NOT EXISTS idx_audio_recordings_user_session ON audio_recordings(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_audio_recordings_created_at ON audio_recordings(created_at);
CREATE INDEX IF NOT EXISTS idx_transcriptions_confidence ON transcriptions(overall_confidence);
CREATE INDEX IF NOT EXISTS idx_transcriptions_created_at ON transcriptions(created_at);
CREATE INDEX IF NOT EXISTS idx_audio_emotions_primary_emotion ON audio_emotions(primary_emotion);
CREATE INDEX IF NOT EXISTS idx_audio_emotions_created_at ON audio_emotions(created_at);
CREATE INDEX IF NOT EXISTS idx_fusion_conflict_score ON multimodal_fusion_results(conflict_score);
CREATE INDEX IF NOT EXISTS idx_fusion_created_at ON multimodal_fusion_results(created_at);

-- Indexes on foreign key columns to speed up joins and cascade deletes
CREATE INDEX IF NOT EXISTS idx_transcriptions_audio_recording_id ON transcriptions(audio_recording_id);
CREATE INDEX IF NOT EXISTS idx_audio_emotions_audio_recording_id ON audio_emotions(audio_recording_id);
CREATE INDEX IF NOT EXISTS idx_fusion_audio_recording_id ON multimodal_fusion_results(audio_recording_id);