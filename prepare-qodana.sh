#!/bin/bash

# Qodana preparation script for Pixelated project
# This script prepares the environment for Qodana code analysis

set -e

echo "🚀 Preparing environment for Qodana analysis..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed or not in PATH"
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔧 Running type checking..."
pnpm typecheck

echo "🏗️ Building project for analysis..."
pnpm build

echo "✅ Environment prepared successfully for Qodana analysis"
