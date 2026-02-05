import sys
import re

path = 'src/lib/services/notification/__tests__/WebSocketServer.test.ts'
with open(path, 'r') as f:
    content = f.read()

# Make all 'it' blocks in connection handling async
content = re.sub(
    r"it\('should handle client messages', \(\) =>",
    r"it('should handle client messages', async () =>",
    content
)
content = re.sub(
    r"it\('should handle client disconnection', \(\) =>",
    r"it('should handle client disconnection', async () =>",
    content
)

with open(path, 'w') as f:
    f.write(content)
print('Success')
