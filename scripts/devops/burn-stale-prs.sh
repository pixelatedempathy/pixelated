#!/bin/bash
# Cleanup script for remote branches targeting master
# Safely delete stale PR branches that target the master branch.

set -euo pipefail

# ------------------------------
# Configuration
# ------------------------------
PROTECTED_BRANCHES=("master" "staging")

# ------------------------------
# Helper functions
# ------------------------------
is_protected() {
    local branch="$1"
    for protected in "${PROTECTED_BRANCHES[@]}"; do
        if [[ "$branch" == "$protected" ]]; then
            return 0
        fi
    done
    return 1
}

# ------------------------------
# Argument parsing
# ------------------------------
EXECUTE=false
while [[ $# -gt 0 ]]; do
    case "$1" in
        --execute)
            EXECUTE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [--execute]"
            echo "  --execute   Actually delete the branches (default is dry‑run)."
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            exit 1
            ;;
    esac
done

# ------------------------------
# Safety checks
# ------------------------------
# Ensure we are inside a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: This script must be run inside a git repository." >&2
    exit 1
fi

# Ensure the remote 'origin' exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "Error: Remote 'origin' does not exist in this repository." >&2
    exit 1
fi

# ------------------------------
# Determine branches to delete
# ------------------------------
# Use GitHub CLI to list open PRs whose base is 'master'
if ! command -v gh >/dev/null 2>&1; then
    echo "Error: GitHub CLI (gh) is required to filter PRs by base branch." >&2
    exit 1
fi

# Get headRefName of all open PRs targeting master
mapfile -t affected_branches < <(
    gh pr list --state open --base master --json headRefName -q '.[].headRefName'
)

if [[ ${#affected_branches[@]} -eq 0 ]]; then
    echo "No open PRs targeting 'master' were found."
    exit 0
fi

# ------------------------------
# Process each branch
# ------------------------------
for branch in "${affected_branches[@]}"; do
    # Skip protected branches
    if is_protected "$branch"; then
        echo "Skipping protected branch: $branch"
        continue
    fi

    echo "Would delete remote branch: $branch"
    if $EXECUTE; then
        git push origin --delete "$branch"
    fi
done