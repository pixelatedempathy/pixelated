/**
 * Threat Data Utilities
 *
 * Provides utilities for processing and analyzing threat data
 * for hunting operations and investigations.
 */

import { ThreatData, ThreatPattern, ThreatFinding } from '../types'

/**
 * Process raw threat data into structured format
 */
export function processThreatData(rawData: unknown[]): ThreatData[] {
  return rawData.map((item, index) => {    const isValidThreatItem = (data: unknown): data is Record<string, unknown> => {
      return typeof data === 'object' && data !== null;
    };

    if (!isValidThreatItem(item)) {
      throw new Error(`Invalid threat data item at index ${index}: expected object, got ${typeof item}`);
    }

    return {
      id: `threat_${index}`,
      timestamp: (typeof item.timestamp === 'string' ? item.timestamp : new Date().toISOString()),
      source: (typeof item.source === 'string' ? item.source : 'unknown'),
      type: (typeof item.type === 'string' ? item.type : 'unknown'),
      severity: (typeof item.severity === 'string' ? item.severity : 'medium'),
      description: (typeof item.description === 'string' ? item.description : ''),
      raw_data: item,
      processed_at: new Date().toISOString()
    };
  });
}

/**
 * Extract patterns from threat data
 */
export function extractPatterns(threatData: ThreatData[]): ThreatPattern[] {
  const patterns: ThreatPattern[] = []

  // Group by type and source to find patterns
  const grouped = threatData.reduce((acc, threat) => {
    const key = `${threat.type}_${threat.source}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(threat)
    return acc
  }, {} as Record<string, ThreatData[]>)

  // Analyze each group for patterns
  Object.entries(grouped).forEach(([key, threats]) => {
    if (threats.length >= 3) { // Minimum threshold for pattern
      const [type, source] = key.split('_')

      patterns.push({
        id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        source,
        frequency: threats.length,
        first_seen: Math.min(...threats.map(t => new Date(t.timestamp).getTime())),
        last_seen: Math.max(...threats.map(t => new Date(t.timestamp).getTime())),
        confidence: calculatePatternConfidence(threats),
        description: `Detected pattern of ${type} threats from ${source}`,
        related_threats: threats.map(t => t.id)
      })
    }
  })

  return patterns
}

/**
 * Calculate pattern confidence based on data characteristics
 */
function calculatePatternConfidence(threats: ThreatData[]): number {
  if (threats.length < 3) {
    return 0
  }

  const timeSpan = new Date(threats[threats.length - 1].timestamp).getTime() -
                   new Date(threats[0].timestamp).getTime()

  // Confidence based on frequency and time span
  const frequencyScore = Math.min(threats.length / 10, 1) // Max 1.0 for 10+ threats
  const timeSpanScore = timeSpan > 0 ? Math.min(timeSpan / (24 * 60 * 60 * 1000), 1) : 0 // Days

  return (frequencyScore * 0.7) + (timeSpanScore * 0.3)
}

/**
 * Generate findings from patterns and threat data
 */
export function generateFindings(
  patterns: ThreatPattern[],
  threatData: ThreatData[]
): ThreatFinding[] {
  const findings: ThreatFinding[] = []

  patterns.forEach(pattern => {
    const relatedThreats = threatData.filter(t =>
      pattern.related_threats.includes(t.id)
    )

    findings.push({
      id: `finding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pattern_id: pattern.id,
      title: `Pattern: ${pattern.type} from ${pattern.source}`,
      description: pattern.description,
      severity: calculateFindingSeverity(pattern, relatedThreats),
      confidence: pattern.confidence,
      related_threats: pattern.related_threats,
      created_at: new Date().toISOString(),
      status: 'new'
    })
  })

  return findings
}

/**
 * Calculate finding severity based on pattern and threat characteristics
 */
function calculateFindingSeverity(pattern: ThreatPattern, threats: ThreatData[]): 'low' | 'medium' | 'high' | 'critical' {
  const avgSeverity = threats.reduce((sum, threat) => {
    const severityMap = { low: 1, medium: 2, high: 3, critical: 4 }
    return sum + (severityMap[threat.severity as keyof typeof severityMap] || 2)
  }, 0) / threats.length

  const frequencyScore = Math.min(pattern.frequency / 20, 1) // Normalize frequency
  const confidenceScore = pattern.confidence

  const combinedScore = (avgSeverity * 0.4) + (frequencyScore * 0.3) + (confidenceScore * 0.3)

  if (combinedScore >= 3.5) {
    return 'critical'
  }
  if (combinedScore >= 2.5) {
    return 'high'
  }
  if (combinedScore >= 1.5) {
    return 'medium'
  }
  return 'low'
}

/**
 * Filter threat data by time range
 */
export function filterByTimeRange(
  threatData: ThreatData[],
  startTime: Date,
  endTime: Date
): ThreatData[] {
  return threatData.filter(threat => {
    const threatTime = new Date(threat.timestamp)
    return threatTime >= startTime && threatTime <= endTime
  })
}

/**
 * Filter threat data by severity
 */
export function filterBySeverity(
  threatData: ThreatData[],
  severities: ('low' | 'medium' | 'high' | 'critical')[]
): ThreatData[] {
  return threatData.filter(threat => severities.includes(threat.severity))
}

/**
 * Filter threat data by type
 */
export function filterByType(
  threatData: ThreatData[],
  types: string[]
): ThreatData[] {
  return threatData.filter(threat => types.includes(threat.type))
}

/**
 * Aggregate threat data statistics
 */
export function aggregateThreatStats(threatData: ThreatData[]) {
  const stats = {
    total: threatData.length,
    by_type: {} as Record<string, number>,
    by_severity: {} as Record<string, number>,
    by_source: {} as Record<string, number>,
    time_range: {
      earliest: threatData.length > 0 ?
        new Date(Math.min(...threatData.map(t => new Date(t.timestamp).getTime()))) : null,
      latest: threatData.length > 0 ?
        new Date(Math.max(...threatData.map(t => new Date(t.timestamp).getTime()))) : null
    }
  }

  // Count by type
  threatData.forEach(threat => {
    stats.by_type[threat.type] = (stats.by_type[threat.type] || 0) + 1
  })

  // Count by severity
  threatData.forEach(threat => {
    stats.by_severity[threat.severity] = (stats.by_severity[threat.severity] || 0) + 1
  })

  // Count by source
  threatData.forEach(threat => {
    stats.by_source[threat.source] = (stats.by_source[threat.source] || 0) + 1
  })

  return stats
}

/**
 * Export threat data to various formats
 */
export function exportThreatData(
  data: ThreatData[],
  format: 'json' | 'csv' | 'xml'
): string {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2)

    case 'csv':
      {
        const headers = ['id', 'timestamp', 'source', 'type', 'severity', 'description']
        const rows = data.map(threat => [
          threat.id,
          threat.timestamp,
          threat.source,
          threat.type,
          threat.severity,
          `"${threat.description.replace(/"/g, '""')}"`
        ])
        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
      }

    case 'xml':
      {
        const xmlItems = data.map(threat => `
          <threat>
            <id>${threat.id}</id>
            <timestamp>${threat.timestamp}</timestamp>
            <source>${threat.source}</source>
            <type>${threat.type}</type>
            <severity>${threat.severity}</severity>
            <description>${threat.description.replace(/</g, '<').replace(/>/g, '>')}</description>
          </threat>`).join('')

      return `<?xml version="1.0" encoding="UTF-8"?>
      <threat_data>
        <count>${data.length}</count>
        <items>${xmlItems}
        </items>
      </threat_data>`;
      }

    default:
      {
        throw new Error(`Unsupported export format: ${format}`)
      }
  }
}
