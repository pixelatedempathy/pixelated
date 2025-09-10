import type {
  SessionProgressMetrics,
  TherapistSession
} from '@/types/dashboard';
import type {
  SessionData,
  SkillProgressData,
  TherapistSessionData,
  TherapistSkillProgressData
} from '@/types/analytics';

/**
 * Database service for session progress tracking
 * Handles storage and retrieval of progress data for therapist training sessions
 */

// Save session progress metrics
export async function saveSessionProgress(
  sessionId: string,
  progressMetrics: SessionProgressMetrics
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        progressMetrics,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save session progress: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving session progress:', error);
    return false;
  }
}

// Save progress snapshots
export async function saveProgressSnapshots(
  sessionId: string,
  snapshots: Array<{ timestamp: string; value: number }>
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/snapshots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        snapshots,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save progress snapshots: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving progress snapshots:', error);
    return false;
  }
}

// Save skill scores
export async function saveSkillScores(
  sessionId: string,
  therapistId: string,
  skillScores: Record<string, number>
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        therapistId,
        skillScores,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save skill scores: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving skill scores:', error);
    return false;
  }
}

// Save session analytics
export async function saveSessionAnalytics(
  sessionId: string,
  analyticsData: {
    sessionMetrics: SessionData[];
    skillProgress: SkillProgressData[];
  }
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        analyticsData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save session analytics: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving session analytics:', error);
    return false;
  }
}

// Save session milestones
export async function saveSessionMilestones(
  sessionId: string,
  milestones: string[]
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/milestones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        milestones,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save session milestones: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving session milestones:', error);
    return false;
  }
}

// Get therapist session data for analytics
export async function getTherapistSessionData(
  therapistId: string,
  timeRange: '7d' | '30d' | '90d' | '1y' = '30d'
): Promise<TherapistSessionData[]> {
  try {
    const response = await fetch(`/api/therapist/${therapistId}/sessions?timeRange=${timeRange}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch therapist session data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sessions || [];
  } catch (error) {
    console.error('Error fetching therapist session data:', error);
    return [];
  }
}

// Get therapist skill progress data
export async function getTherapistSkillProgress(
  therapistId: string,
  timeRange: '7d' | '30d' | '90d' | '1y' = '30d'
): Promise<TherapistSkillProgressData[]> {
  try {
    const response = await fetch(`/api/therapist/${therapistId}/skills?timeRange=${timeRange}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch therapist skill data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.skills || [];
  } catch (error) {
    console.error('Error fetching therapist skill data:', error);
    return [];
  }
}

// Save comparative session analysis
export async function saveSessionComparison(
  therapistId: string,
  comparisonData: {
    currentSessionId: string;
    previousSessionId?: string;
    improvementScore: number;
    metrics: Record<string, any>;
  }
): Promise<boolean> {
  try {
    const response = await fetch('/api/session/comparison', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        therapistId,
        ...comparisonData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save session comparison: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving session comparison:', error);
    return false;
  }
}

// Batch save all session progress data
export async function saveSessionProgressBatch(
 session: TherapistSession
): Promise<boolean> {
  try {
    // Save progress metrics
    if (session.progressMetrics) {
      await saveSessionProgress(session.id, session.progressMetrics);

      // Save skill scores
      if (session.progressMetrics.skillScores) {
        await saveSkillScores(
          session.id,
          session.therapistId,
          session.progressMetrics.skillScores
        );
      }

      // Save milestones
      if (session.progressMetrics.milestonesReached) {
        await saveSessionMilestones(session.id, session.progressMetrics.milestonesReached);
      }
    }

    // Save progress snapshots
    if (session.progressSnapshots) {
      await saveProgressSnapshots(session.id, session.progressSnapshots);
    }

    return true;
  } catch (error) {
    console.error('Error saving session progress batch:', error);
    return false;
  }
}
