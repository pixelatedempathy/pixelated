import { Pool } from 'pg';
import type { APIRoute } from 'astro';

// Database connection pool
const { DATABASE_URL } = process.env
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}
const pool =
  (globalThis as any).__pgPool ??
  new Pool({
    connectionString: DATABASE_URL,
  })
;(globalThis as any).__pgPool = pool

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sessionId, snapshots } = await request.json()

    const isValidSnapshot = (s: any) =>
      (typeof s?.value === 'number') &&
      (typeof s?.timestamp === 'string' || typeof s?.timestamp === 'number' || s?.timestamp instanceof Date)
    const isSnapshotArray = Array.isArray(snapshots) && snapshots.every(isValidSnapshot)

    if (!sessionId || !isSnapshotArray) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload: require sessionId and snapshots[] of {timestamp,value:number}' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = await pool.connect();
    try {
      // Update session with progress snapshots
      const query = `
        UPDATE sessions
        SET progress_snapshots = $1::jsonb, updated_at = NOW()
        WHERE id = $2
        RETURNING id
      `;

      const result = await client.query(query, [
        JSON.stringify(snapshots),
        sessionId
      ]);

      if (result.rowCount === 0) {
        return new Response(
          JSON.stringify({ error: 'Session not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

const client = await pool.connect();
try {
  await client.query('BEGIN')
  // Update session with progress snapshots
  const query = `
    UPDATE sessions
    SET progress_snapshots = $1::jsonb, updated_at = NOW()
    WHERE id = $2
    RETURNING id
  `;
  await client.query(query, [JSON.stringify(snapshots), sessionId]);

  // Also insert into session_milestones table for detailed tracking
  if (snapshots.length > 0) {
    const values: any[] = []
    const placeholders = snapshots.map((s, i) => {
      const base = i * 4
      values.push(
        sessionId,
        `Progress_${s.value}`,
        s.value,
        new Date(s.timestamp).toISOString()
      )
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
    })
    const milestoneQuery = `
      INSERT INTO session_milestones (session_id, milestone_name, milestone_value, achieved_at)
      VALUES ${placeholders.join(',')}
    `
    await client.query(milestoneQuery, values)
  }
  await client.query('COMMIT')
} catch (e) {
  await client.query('ROLLBACK')
  throw e
} finally {
  client.release();
}

      return new Response(
        JSON.stringify({ success: true, sessionId }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error handling POST /api/session/snapshots', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing sessionId parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const client = await pool.connect();
    try {
      const sessionQuery = 'SELECT progress_snapshots FROM sessions WHERE id = $1';
      const sessionResult = await client.query(sessionQuery, [sessionId]);
      if (sessionResult.rowCount === 0) {
        return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      const milestoneQuery = 'SELECT milestone_name, milestone_value, achieved_at FROM session_milestones WHERE session_id = $1 ORDER BY achieved_at ASC';
      const milestoneResult = await client.query(milestoneQuery, [sessionId]);

      return new Response(
        JSON.stringify({
          sessionId,
          snapshots: sessionResult.rows[0].progress_snapshots,
          milestones: milestoneResult.rows,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error handling GET /api/session/snapshots', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
