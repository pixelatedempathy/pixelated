import sys
import re

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    content = f.read()

# Add wait after connectionHandler call
content = re.sub(
    r"(connectionHandler\.bind\(wsInstance\)\(mockWs, mockReq\))",
    r"\1\n      await new Promise(resolve => setTimeout(resolve, 0))",
    content
)

with open(path, 'w') as f:
    f.write(content)
print('Success')
