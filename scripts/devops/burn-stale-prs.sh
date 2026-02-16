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

# Return the name of a remote that has a ref for the given branch.
# If none is found, fall back to "origin".
get_remote_for_branch() {
    local branch="$1"
    # List all remotes safely using a while-read loop
    while IFS= read -r remote; do
        # Check if a ref like refs/remotes/<remote>/<branch> exists
        if git show-ref --verify --quiet "refs/remotes/$remote/$branch"; then
            echo "$remote"
            return
        fi
    done < <(git remote)
    # Fallback – if no remote matches, assume the conventional name
    echo "origin"
}

# ------------------------------
# Staleness check
# ------------------------------
is_stale() {
    local branch="$1"
    # Define a cutoff: 30 days ago in seconds
    local cutoff=$(( $(date +%s) - 30*24*60*60 ))
    # Get the commit timestamp of the most recent commit on the branch
    local branch_date
    # Use the remote determined at runtime to fetch the commit date
    local remote
    remote=$(get_remote_for_branch "$branch")
    branch_date=$(git log -1 --format=%ct -- "refs/remotes/$remote/$branch" 2>/dev/null || echo 0)
    if (( branch_date < cutoff )); then
        return 0  # stale
    else
        return 1  # not stale
    fi
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

# Ensure at least one remote exists (we will use the first one found)
if ! git remote | grep -q .; then
    echo "Error: No remote configured in this repository." >&2
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

    # Check if the branch is stale (no recent activity)
    if ! is_stale "$branch"; then
        echo "Skipping non‑stale branch: $branch"
        continue
    fi

    remote_name=$(get_remote_for_branch "$branch")
    echo "Would delete stale remote branch: $branch (via remote '$remote_name')"
    if $EXECUTE; then
        git push "$remote_name" --delete "$branch"
    fi
done