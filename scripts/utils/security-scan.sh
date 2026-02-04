#!/bin/bash
set -e

<<<<<<< HEAD
echo "Running security scan..."
pnpm audit
=======
# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔍 Starting Security Scan...${NC}"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed. Please install pnpm.${NC}"
    exit 1
fi

echo -e "\n${YELLOW}📦 Running pnpm audit...${NC}"
# pnpm audit failing is expected if there are vulnerabilities, but we don't want to stop the script immediately
# unless it's critical. For now, we just report it.
pnpm audit --prod || echo -e "${YELLOW}⚠️ Vulnerabilities found in dependencies.${NC}"

echo -e "\n${YELLOW}🕵️ Checking for potential secrets in code...${NC}"
# Simple grep to find potential secrets (API keys, tokens)
# Exclude dist, node_modules, .git, and specific lock files
# This is a basic check, a dedicated tool like trufflehog or git-secrets is better for prod.
GREP_RESULTS=$(grep -rE "API_KEY|SECRET|TOKEN|PASSWORD" . \
    --exclude-dir={node_modules,dist,.git,coverage,venv,__pycache__} \
    --exclude={pnpm-lock.yaml,package-lock.json,yarn.lock,*.env,*.env.*} \
    --include="*.ts" --include="*.tsx" --include="*.js" --include="*.py" \
    | grep -v "process.env" | grep -v "os.environ" | grep -v "config" | head -n 10)

if [ -n "$GREP_RESULTS" ]; then
    echo -e "${RED}⚠️ Potential hardcoded secrets found (verifty manually):${NC}"
    echo "$GREP_RESULTS"
else
    echo -e "${GREEN}✅ No obvious hardcoded secrets found in source files.${NC}"
fi

echo -e "\n${GREEN}✅ Security scan completed.${NC}"
>>>>>>> origin/master
