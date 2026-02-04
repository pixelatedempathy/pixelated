import { render, screen } from '@testing-library/react'
import { AnalyticsCharts } from '../AnalyticsCharts'

<<<<<<< HEAD
describe('AnalyticsCharts', () => {
  it('renders analytics charts heading', () => {
    render(<AnalyticsCharts />)
    expect(screen.getByText(/Analytics Charts/i)).toBeInTheDocument()
=======
vi.mock('@/hooks/useAnalyticsDashboard', () => ({
  useAnalyticsDashboard: vi.fn(() => ({
    data: {
      summaryStats: [],
      sessionMetrics: [],
      skillProgress: []
    },
    isLoading: false,
    error: null,
    refetch: vi.fn()
  }))
}))

describe('AnalyticsCharts', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        sessionMetrics: {},
        skillProgress: {},
        summaryStats: {}
      }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders analytics charts heading', async () => {
    render(<AnalyticsCharts />)
    expect(await screen.findByText(/Analytics Overview/i)).toBeInTheDocument()
>>>>>>> origin/master
  })
})
