import sys

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    content = f.read()

# Fix WSServer and WebSocket mocks
search_ws_mock = """vi.mock('ws', () => {
  const mockServer = {
    on: vi.fn(),
    close: vi.fn(),
    clients: new Set(),
    emit: vi.fn(),
  }

  return {
    WebSocketServer: vi.fn(function() { return mockServer }),
    WebSocket: vi.fn(),
  }
})"""

replace_ws_mock = """vi.mock('ws', () => {
  const mockServer = {
    on: vi.fn(),
    close: vi.fn(),
    clients: new Set(),
    emit: vi.fn(),
  }

  const mockWsInstance = {
    on: vi.fn().mockReturnThis(),
    send: vi.fn(),
    close: vi.fn(),
  }

  return {
    WebSocketServer: vi.fn(function() { return mockServer }),
    WebSocket: vi.fn(function() { return mockWsInstance }),
  }
})"""

content = content.replace(search_ws_mock, replace_ws_mock)

# Fix error assertion
search_error_assert = """      expect(
        logger.createBuildSafeLogger('websocket').error,
      ).toHaveBeenCalledWith('WebSocket server error', {
        error: mockError.message,
      })"""

replace_error_assert = """      expect(
        logger.createBuildSafeLogger('websocket').error,
      ).toHaveBeenCalledWith('WebSocket server error', {
        error: String(mockError),
      })"""

content = content.replace(search_error_assert, replace_error_assert)

with open(path, 'w') as f:
    f.write(content)
print('Success')
