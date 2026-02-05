import re
import sys

with open('src/lib/ehr/__tests__/allscripts.test.ts', 'r') as f:
    content = f.read()

# Fix the missing template literal
content = content.replace("mockFhirClient.read('Patient', )", "mockFhirClient.read('Patient', `${i}`)")

with open('src/lib/ehr/__tests__/allscripts.test.ts', 'w') as f:
    f.write(content)
print("Successfully fixed the test file.")
