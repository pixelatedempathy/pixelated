import sys

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    lines = f.readlines()

# Add logger import if missing
if not any('import * as logger' in line for line in lines):
    lines.insert(4, "import * as logger from '../../../logging/build-safe-logger'\n")

content = "".join(lines)

# Replace logger mock
search_mock_logger = """vi.mock('@/lib/utils/logger', () => ({
  default: {
    getLogger: () => ({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    }),
  },
}))"""

replace_mock_logger = """vi.mock('../../../logging/build-safe-logger', () => ({
  createBuildSafeLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  }),
}))"""

content = content.replace(search_mock_logger, replace_mock_logger)

with open(path, 'w') as f:
    f.write(content)
print('Success')
