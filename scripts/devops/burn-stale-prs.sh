#!/bin/bash
# Cleanup script for remote branches
# Run this locally to burn and delete stale PR branches targeting master.

PROTECTED_BRANCHES=("master" "staging")
REMOTE_BRANCHES=\$(git branch -r | grep -v HEAD | sed 's/origin\///' | sed 's/^[[:space:]]*//')

for branch in \$REMOTE_BRANCHES; do
    PROTECTED=false
    for protected in "\${PROTECTED_BRANCHES[@]}"; do
        if [[ "\$branch" == "\$protected" ]]; then PROTECTED=true; break; fi
    done
    if [ "\$PROTECTED" = false ]; then
        echo "Burning branch: \$branch"
        # Command to run: git push origin --delete "\$branch"
    fi
done
