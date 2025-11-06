#!/bin/bash

# Chrome Composer Monitor - Background Runner
# Usage: ./run-monitor.sh [start|stop|status|restart] [URL] [options]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.monitor.pid"
LOG_FILE="$SCRIPT_DIR/.monitor.log"
MONITOR_SCRIPT="$SCRIPT_DIR/BaseMonitor.js"
DEFAULT_URL="http://localhost:3000"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if monitor is running
is_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

# Start the monitor
start_monitor() {
    if is_running; then
        echo -e "${YELLOW}Monitor is already running (PID: $(cat "$PID_FILE"))${NC}"
        return 1
    fi

    URL="${1:-$DEFAULT_URL}"
    shift
    OPTIONS="$@"

    echo -e "${GREEN}Starting Chrome monitor for $URL...${NC}"
    echo "Options: $OPTIONS"
    echo "Log file: $LOG_FILE"
    echo "PID file: $PID_FILE"

    # Start the monitor in background, redirect output to log file
    cd "$SCRIPT_DIR"
    nohup node "$MONITOR_SCRIPT" "$URL" $OPTIONS >> "$LOG_FILE" 2>&1 &
    PID=$!

    # Save PID
    echo $PID > "$PID_FILE"

    # Wait a moment to check if it started successfully
    sleep 1
    if ps -p "$PID" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Monitor started successfully (PID: $PID)${NC}"
        echo "View logs: tail -f $LOG_FILE"
        echo "Stop monitor: $0 stop"
        return 0
    else
        echo -e "${RED}✗ Monitor failed to start${NC}"
        rm -f "$PID_FILE"
        cat "$LOG_FILE" 2>/dev/null | tail -20
        return 1
    fi
}

# Stop the monitor
stop_monitor() {
    if ! is_running; then
        echo -e "${YELLOW}Monitor is not running${NC}"
        return 1
    fi

    PID=$(cat "$PID_FILE")
    echo -e "${YELLOW}Stopping monitor (PID: $PID)...${NC}"

    # Kill the process and its children (Chrome instances)
    kill "$PID" 2>/dev/null
    sleep 1

    # Force kill if still running
    if ps -p "$PID" > /dev/null 2>&1; then
        kill -9 "$PID" 2>/dev/null
    fi

    # Kill any Chrome instances with remote debugging
    pkill -f "chromium.*remote-debugging-port=9222" 2>/dev/null || true

    rm -f "$PID_FILE"
    echo -e "${GREEN}✓ Monitor stopped${NC}"
    return 0
}

# Show status
show_status() {
    if is_running; then
        PID=$(cat "$PID_FILE")
        echo -e "${GREEN}✓ Monitor is running (PID: $PID)${NC}"
        echo "Log file: $LOG_FILE"
        echo "View logs: tail -f $LOG_FILE"
        
        # Show last few lines of log
        if [ -f "$LOG_FILE" ]; then
            echo ""
            echo "Last log entries:"
            tail -5 "$LOG_FILE" | sed 's/^/  /'
        fi
        return 0
    else
        echo -e "${RED}✗ Monitor is not running${NC}"
        return 1
    fi
}

# Restart the monitor
restart_monitor() {
    stop_monitor
    sleep 1
    start_monitor "$@"
}

# Show logs
show_logs() {
    if [ -f "$LOG_FILE" ]; then
        tail -f "$LOG_FILE"
    else
        echo -e "${YELLOW}No log file found${NC}"
    fi
}

# Main command handler
case "${1:-}" in
    start)
        shift
        start_monitor "$@"
        ;;
    stop)
        stop_monitor
        ;;
    status)
        show_status
        ;;
    restart)
        shift
        restart_monitor "$@"
        ;;
    logs)
        show_logs
        ;;
    *)
        echo "Chrome Composer Monitor - Background Runner"
        echo ""
        echo "Usage: $0 [command] [URL] [options]"
        echo ""
        echo "Commands:"
        echo "  start [URL] [options]  Start the monitor (default URL: $DEFAULT_URL)"
        echo "  stop                   Stop the monitor"
        echo "  restart [URL] [options] Restart the monitor"
        echo "  status                 Show monitor status"
        echo "  logs                   Show and follow log output"
        echo ""
        echo "Options:"
        echo "  --network, -n          Monitor network requests"
        echo "  --no-clear, --nc       Don't clear console on page reload"
        echo "  --exit-on-error        Exit on encountering errors"
        echo "  --break-network, --bn  Treat network errors as breaking errors"
        echo ""
        echo "Examples:"
        echo "  $0 start http://localhost:3000 --network"
        echo "  $0 start http://localhost:8080 --network --exit-on-error"
        echo "  $0 status"
        echo "  $0 logs"
        echo "  $0 stop"
        exit 1
        ;;
esac
