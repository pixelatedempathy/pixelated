#!/bin/bash
# Load .env variables for build processes
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi
