import sys

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    lines = f.readlines()

# Add missing import
if not any("from '../WebSocketServer'" in line for line in lines):
    lines.insert(5, "import { WebSocketServer } from '../WebSocketServer'\n")

content = "".join(lines)

# Instantiate WebSocketServer in beforeEach
search_before = """  beforeEach(() => {
    vi.clearAllMocks()
    mockPort = 8082
    mockNotificationService = new NotificationService()
  })"""

replace_before = """  let server: WebSocketServer

  beforeEach(() => {
    vi.clearAllMocks()
    mockPort = 8082
    mockNotificationService = new NotificationService()
    server = new WebSocketServer(mockPort, mockNotificationService)
  })"""

if search_before in content:
    content = content.replace(search_before, replace_before)

with open(path, 'w') as f:
    f.write(content)
print('Success')
