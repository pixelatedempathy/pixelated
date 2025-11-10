#!/bin/sh
# Load .env variables for build processes
if [ -f ".env" ]; then
    set -a
    . "./.env"
    set +a
fi
