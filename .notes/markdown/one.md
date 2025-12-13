# Project Transition Hand-Off: Pixelated Empathy

**Date**: Thu Dec 11 08:44:43 AM EST 2025
**Status**: STABLE (after crash recovery)

## 1. Critical Background Processes (DO NOT KILL)
*   **Uploads**: A `tmux` session (created post-crash) is running low-priority `rclone` uploads for the `raw` dataset tier.
    *   Command: `rclone copy gdrive:datasets ovh:pixel-data/datasets/gdrive/raw ...`
    *   Status: `processed` tier is DONE. `raw` tier is IN PROGRESS.
    *   Log File: `upload_raw_final.log`
*   **Reason**: Previous python-based uploads caused OOM/Crashes. The `rclone` detached session is the stable solution.

## 2. Phase 9: Evaluation Suite (TherapyBench)
**Status**: LIVE & VERIFIED
*   **Component**: `ai/evals/therapy_bench/therapy_bench.py`
*   **Driver**: `ai/common/llm_client.py` (Updated to support Nvidia/OpenAI integration)
*   **Verification**:
    *   Script: `verify_bench.py`
    *   Result: PROVEN to grade responses. Correctly identified a "nice but unsafe" suicide response (Empathy 7.0, Safety 2.0).
*   **Missing**: Results are not sufficiently persisted to disk for long-term tracking.

## 3. Crash Diagnosis
*   **Symptoms**: Repeated system freezes/crashes when editing large files or running high-concurrency python tasks.
*   **Fixes Applied**:
    *   Switched uploads to `rclone` (Go-based, lower footprint).
    *   Reduced concurrency (`--transfers 2`).
    *   Avoid large atomic file writes in Agent tools.

## 4. Next Steps (To-Do)
1.  **Refine TherapyBench**:
    *   Add JSON persistence for benchmark results (currently just logs/returns dict).
    *   Expand `golden_questions.json` (currently 9 items) to full 500 set.
2.  **Phase 10 (Future)**:
    *   Begin rigorous model evaluation using the now-working TherapyBench.

## 5. File Manifest
*   `.notes/markdown/one.md`: This file.
*   `verify_bench.py`: Test script for grading.
*   `upload_raw_final.log`: Log for active background upload.

