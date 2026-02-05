import sys

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace mocks
search_mock_supabase = """// Mock Supabase
vi.mock('@/lib/supabase', () => {
  const mockUser = { id: 'test-user' }
  const mockProfile = { role: 'user' }
  const mockSession = { user_id: 'test-user' }

  return {
    mongoClient: {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
        getSession: vi.fn().mockResolvedValue({
          data: { session: mockSession },
          error: null,
        }),
      },
      from: vi.fn().mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: mockProfile,
          error: null,
        }),
      })),
    },
  }
})"""

replace_mock_auth = """// Mock Auth
vi.mock('@/lib/auth', () => ({
  validateToken: vi.fn().mockResolvedValue({
    valid: true,
    userId: 'test-user',
    role: 'user',
  }),
}))

vi.mock('@/services/auth0.service', () => ({
  auth0UserService: {
    getUserById: vi.fn().mockResolvedValue({
      id: 'test-user',
      role: 'user',
    }),
  },
}))"""

content = content.replace(search_mock_supabase, replace_mock_auth)

# Replace authentication failure test case
search_failure = """    it('should handle authentication failure', async () => {
      // Mock failed authentication
      const { mongoClient } = await import('@/lib/supabase')
      vi.mocked(mongoClient.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Invalid token', status: 401 },
      })"""

replace_failure = """    it('should handle authentication failure', async () => {
      // Mock failed authentication
      const { validateToken } = await import('@/lib/auth')
      vi.mocked(validateToken).mockResolvedValueOnce({
        valid: false,
        error: 'Invalid token',
      })"""

content = content.replace(search_failure, replace_failure)

with open(path, 'w') as f:
    f.write(content)
print('Success')
