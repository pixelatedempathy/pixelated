#!/bin/bash
# Start Pixelated Empathy Therapeutic AI API with Database

set -e

echo "🚀 Starting Pixelated Empathy Therapeutic AI API (with DB)"
echo "=========================================================="

# Activate virtual environment
source ~/pixelated/.venv/bin/activate

# Set Environment Variables
export MONGODB_URI='mongodb+srv://chad:7iNuNaZ7A8FPOlXm@juddbase.3hojhxg.mongodb.net/pixelated_empathy?retryWrites=true&w=majority&appName=juddbase'

# Navigate to API directory
cd ~/pixelated/ai-services

# Kill existing process
if [ -f api.pid ]; then
    PID=$(cat api.pid)
    # Check if process is actually running
    if kill -0 $PID 2>/dev/null; then
        echo "🛑 Stopping existing API (PID: $PID)"
        kill $PID
        sleep 2
    else
        echo "⚠️  PID file exists but process $PID is not running"
    fi
    rm api.pid
fi

# Start API (Unbuffered output)
echo "📡 Starting Flask API on http://0.0.0.0:5000"
nohup python -u api.py > api.log 2>&1 &
echo $! > api.pid

echo "✅ API Started (PID: $(cat api.pid))"
echo "📝 Logs: ~/pixelated/ai-services/api.log"
