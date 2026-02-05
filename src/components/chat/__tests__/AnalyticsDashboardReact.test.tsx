// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import AnalyticsDashboard from '../AnalyticsDashboardReact'
import type { Message } from '../../types/chat'
import React from 'react'

expect.extend(matchers)

// Mock the icons
vi.mock('../icons', () => ({
  IconAlertTriangle: () => <div data-testid="icon-alert" />,
  IconBarChart: () => <div data-testid="icon-bar" />,
  IconLineChart: () => <div data-testid="icon-line" />,
  IconLock: () => <div data-testid="icon-lock" />,
  IconPieChart: () => <div data-testid="icon-pie" />,
  IconRefresh: () => <div data-testid="icon-refresh" />,
}))

// Mock dynamic imports
vi.mock('../../lib/fhe', () => ({
  fheService: {
    initialize: vi.fn(),
  },
}))

vi.mock('../../lib/fhe/analytics', () => ({
  AnalyticsType: {
    SENTIMENT_TREND: 'sentiment_trend',
    TOPIC_CLUSTERING: 'topic_clustering',
    RISK_ASSESSMENT: 'risk_assessment',
    INTERVENTION_EFFECTIVENESS: 'intervention_effectiveness',
    EMOTIONAL_PATTERNS: 'emotional_patterns',
  },
  fheAnalytics: {
    initialize: vi.fn(),
    createAnalyticsDashboard: vi.fn().mockResolvedValue([]),
  },
}))

describe('AnalyticsDashboard Accessibility', () => {
  const mockMessages: Message[] = [
    { role: 'user', content: 'Hello', name: 'User' },
  ]

  it('renders with correct accessibility attributes', async () => {
    render(
      <AnalyticsDashboard
        messages={mockMessages}
        securityLevel="standard"
        encryptionEnabled={false}
        scenario="test"
      />
    )

    // 1. Verify Refresh button has aria-label
    const refreshBtn = screen.getByRole('button', { name: /refresh analytics/i })
    expect(refreshBtn).toBeInTheDocument()

    // 2. Verify Tablist has role and label
    const tablist = screen.getByRole('tablist', { name: /analytics views/i })
    expect(tablist).toBeInTheDocument()

    // 3. Verify Tabs have role, aria-selected, and aria-controls
    const sentimentTab = screen.getByRole('tab', { name: /sentiment trend/i })
    expect(sentimentTab).toBeInTheDocument()
    expect(sentimentTab).toHaveAttribute('aria-selected', 'true')
    expect(sentimentTab).toHaveAttribute('aria-controls', 'analytics-panel')

    // We expect IDs to match the enum values or a consistent pattern
    expect(sentimentTab).toHaveAttribute('id', 'tab-sentiment_trend')

    const topicTab = screen.getByRole('tab', { name: /topic clustering/i })
    expect(topicTab).toBeInTheDocument()
    expect(topicTab).toHaveAttribute('aria-selected', 'false')
    expect(topicTab).toHaveAttribute('aria-controls', 'analytics-panel')

    // 4. Verify Content Panel has role and id
    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeInTheDocument()
    expect(panel).toHaveAttribute('id', 'analytics-panel')
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-sentiment_trend')
  })
})
