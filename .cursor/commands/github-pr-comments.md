---
name: /github-pr-comments
id: github-pr-comments
category: GitHub
description: Systematically address every comment in a Pull Request, marking each as resolved upon completion
---

# Address All GitHub PR Comments

A systematic, methodical approach to processing every outstanding comment in a Pull Request. This command ensures no comment is overlooked, each is properly addressed, and all are marked as resolved upon completion.

## Philosophy

**Exhaustive Resolution**: Every comment deserves attention. Whether it requires code changes, clarification, or respectful disagreement, each comment is processed with care and marked appropriately.

**Incremental Progress**: Address comments one by one, verify each fix, commit incrementally, and mark resolved immediately. This creates a clear audit trail and prevents accumulation of unresolved feedback.

**Quality Assurance**: Each resolution is tested, validated, and committed before moving forward. No comment is marked resolved until its associated changes are verified.

## Prerequisites

1. **GitHub CLI Authentication**
   ```bash
   gh auth status
   ```
   If not authenticated: `gh auth login`

2. **Active Pull Request Context**
   ```bash
   gh pr view
   ```
   Command auto-detects current branch's PR, or accepts PR number as parameter.

3. **ByteRover Context Retrieval**
   ```bash
   brv retrieve --query "GitHub PR comment resolution patterns"
   brv status
   ```

4. **Clean Working Directory**
   ```bash
   git status
   ```
   Ensure no uncommitted changes before starting (or commit/stash them first).

## Systematic Resolution Workflow

### Phase 1: Discovery & Inventory

**Step 1.1: Identify Active Pull Request**
```bash
# Auto-detect PR from current branch
PR_NUMBER=$(gh pr view --json number -q .number)

# Or use provided PR number
PR_NUMBER=${1:-$(gh pr view --json number -q .number)}
```

**Step 1.2: Retrieve All Comments**
```bash
# Fetch all PR comments (review comments and general comments)
gh pr view $PR_NUMBER --json \
  comments,reviewThreads,reviews \
  > /tmp/pr-comments-${PR_NUMBER}.json

# Extract unresolved comments
# Review comments: comments[].state != "RESOLVED"
# Review threads: reviewThreads[].isResolved == false
# General comments: comments[].isMinimized == false
```

**Step 1.3: Categorize Comments**
- **Actionable**: Requires code changes, tests, or documentation updates
- **Discussion**: Questions requiring clarification or explanation
- **Approval**: Positive feedback or non-blocking suggestions
- **Blocking**: Critical issues that must be resolved before merge

**Step 1.4: Create Resolution Queue**
- Order by priority: Blocking → Actionable → Discussion → Approval
- Group by file path for efficient batch processing
- Note dependencies between comments

### Phase 2: Iterative Resolution Loop

**For Each Comment (Process Sequentially):**

#### 2.1: Analyze Comment Context

```bash
# Extract comment details
COMMENT_ID=<comment_id>
COMMENT_BODY=$(gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID -q .body)
COMMENT_PATH=$(gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID -q .path)
COMMENT_LINE=$(gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID -q .line)
COMMENT_DIFF=$(gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID -q .diff_hunk)
```

**Actions:**
- Read the specific file and line range mentioned
- Understand the reviewer's intent and context
- Check if comment is valid (reviewers aren't always right, but assume good intent)
- Identify if same issue exists elsewhere in changed files
- Determine minimal change required

#### 2.2: Plan Resolution

**Decision Tree:**
- **Requires Code Change**: Plan minimal fix, identify all instances, prepare tests
- **Requires Clarification**: Draft response asking for more details
- **Already Addressed**: Point reviewer to existing fix location
- **Disagree with Suggestion**: Prepare respectful explanation with rationale
- **Unclear Intent**: Ask for clarification before implementing

**Validation:**
- Does this align with project conventions? (Check `.kiro/steering/code-style.md`)
- Are there related comments that should be addressed together?
- Will this fix introduce regressions?
- Is test coverage needed?

#### 2.3: Execute Resolution

**For Code Changes:**
1. Read affected file(s)
2. Apply minimal, focused changes
3. Fix ALL instances of the same issue in changed files
4. Add tests if comment requests test coverage
5. Update documentation if API/behavior changes

**For Discussions:**
1. Draft clear, helpful response
2. Reference specific code locations
3. Explain reasoning and trade-offs
4. Offer alternatives if applicable

**Code Quality Standards:**
- Follow project style guide strictly
- Maintain type safety (no `any` types)
- Keep changes minimal and focused
- Avoid unrelated improvements (scope creep)
- Ensure consistency across codebase

#### 2.4: Verify Resolution

**Before Marking Resolved:**

```bash
# Run relevant tests
pnpm test:all

# Check code quality
pnpm check:all  # Lint + format + typecheck

# Verify build succeeds
pnpm build

# Check for regressions
git diff --stat
```

**Validation Checklist:**
- ✅ Tests pass (all relevant test suites)
- ✅ Linting passes (`pnpm lint`)
- ✅ Type checking passes (`pnpm typecheck`)
- ✅ Build succeeds (`pnpm build`)
- ✅ No new errors introduced
- ✅ Changes address the comment directly
- ✅ All instances of issue fixed (if applicable)

**If Verification Fails:**
- Debug and fix issues
- Re-run verification
- Do NOT mark comment resolved until all checks pass

#### 2.5: Commit Changes

**Commit Message Format:**
```
fix: address PR comment on <file> - <brief description>

<detailed explanation of changes>

- <bullet point 1>
- <bullet point 2>
- <bullet point 3>

Addresses PR #<number> comment <comment_id>
```

**Example:**
```
fix: address PR comment on auth service - add error handling

Added comprehensive error handling for token validation failures
with proper error messages and logging.

- Added try-catch block around token validation
- Added test coverage for error cases (test_auth_error_handling.py)
- Updated error messages for clarity and debugging

Addresses PR #147 comment 2528729517
```

**Commit Best Practices:**
- One logical change per commit
- Reference comment ID or PR number
- Use conventional commits format
- Keep commits focused and atomic

#### 2.6: Mark Comment as Resolved

**Immediately After Successful Commit:**

```bash
# Option 1: Mark as resolved via API (if supported)
gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID \
  -X PATCH \
  -f state=resolved

# Option 2: Reply to comment indicating resolution
COMMIT_SHA=$(git rev-parse HEAD)
gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID \
  -X POST \
  -f body="✅ Resolved in commit ${COMMIT_SHA}

$(git log -1 --pretty=%B)"

# Option 3: Use GitHub CLI comment reply
gh pr comment $PR_NUMBER \
  --body "✅ Fixed in commit $(git rev-parse HEAD)" \
  --reply-to $COMMENT_ID
```

**Resolution Confirmation:**
```bash
# Verify comment is marked resolved
gh api repos/:owner/:repo/pulls/comments/$COMMENT_ID -q .state
# Should return: "RESOLVED" or check isResolved field
```

**If Marking Fails:**
- Document resolution in comment reply
- Note that manual resolution may be needed in GitHub UI
- Continue to next comment (don't block on API limitations)

#### 2.7: Record Progress

**Update Memory:**
```bash
# Store successful resolution pattern
brv add --section "Best Practices" \
  --content "Resolved PR comment on <topic> using <approach>: <key insight>"

# Store common patterns for future reference
brv add --section "Common Errors" \
  --content "Common reviewer feedback on <area>: <solution>"
```

**Track Completion:**
- Maintain list of resolved comment IDs
- Track remaining unresolved comments
- Note any comments requiring clarification

### Phase 3: Final Validation & Summary

**After All Comments Processed:**

#### 3.1: Comprehensive Verification

```bash
# Final test suite run
pnpm test:all

# Final code quality check
pnpm check:all

# Verify build
pnpm build

# Check PR status
gh pr view $PR_NUMBER --json \
  state,mergeable,statusCheckRollup
```

#### 3.2: Generate Summary Report

**Report Should Include:**
- Total comments processed
- Comments resolved with code changes
- Comments resolved with discussion/clarification
- Comments that need reviewer follow-up
- Comments declined (with rationale)
- Files modified
- Commits created
- Test coverage added

**Example Summary:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PR Comment Resolution Summary - PR #147
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Resolved: 23 comments
   - Code changes: 18
   - Clarifications: 3
   - Already addressed: 2

📝 Needs Follow-up: 2 comments
   - Comment #2528738003: Awaiting reviewer clarification
   - Comment #2528738010: Architectural decision needed

❌ Declined: 1 comment
   - Comment #2528738019: Out of scope for this PR

📁 Files Modified: 12
📦 Commits Created: 8
🧪 Tests Added: 5 new test cases

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 3.3: Push Changes

**After User Review:**
```bash
# Push all commits
git push

# Or push with tracking
git push -u origin $(git branch --show-current)
```

#### 3.4: Final Memory Update

```bash
# Store comprehensive learnings
brv add --section "Lessons Learned" \
  --content "Successfully resolved 23 PR comments using systematic approach: [key insights]"

# Push to ByteRover
brv push
```

## Edge Cases & Special Handling

### Unclear Comments
**Action**: Ask for clarification before implementing
```bash
gh pr comment $PR_NUMBER \
  --body "Could you clarify what you mean by '[quote comment]'? I want to make sure I address this correctly."
```
**Do NOT mark as resolved** until clarification received and addressed.

### Conflicting Comments
**Action**: Escalate to user for decision
- Multiple reviewers with opposing views
- Architectural disagreements
- Scope boundary questions

**Document**: Note conflict and request user guidance before proceeding.

### Invalid or Out-of-Scope Comments
**Action**: Politely decline with explanation
```bash
gh pr comment $PR_NUMBER \
  --body "I appreciate the suggestion, but [reason]. This PR focuses on [scope], and [suggestion] would be better addressed in a separate PR. Happy to create an issue to track this."
```
**Mark as resolved** only if reviewer agrees or if clearly out of scope.

### Already Fixed Comments
**Action**: Point reviewer to fix location
```bash
gh pr comment $PR_NUMBER \
  --body "✅ This was already addressed in commit abc123. See [file]:[line] for the implementation."
```
**Mark as resolved** after pointing to fix.

### Merge Conflicts
**Action**: Pause resolution, resolve conflicts first
```bash
# Check for conflicts
git fetch origin
git merge-base HEAD origin/main
git diff ...origin/main

# Resolve conflicts
git rebase origin/main  # or git merge origin/main
```
**Resume** comment resolution after conflicts resolved.

### Test Failures
**Action**: Debug and fix before marking resolved
- Never mark a comment resolved if tests fail
- Fix test failures or update tests appropriately
- Re-run verification after fixes

## Implementation Best Practices

### Code Changes
- **Minimal Scope**: Address only what the comment requests
- **Consistency**: Fix all instances of the same issue in changed files
- **Test Coverage**: Always add tests when requested
- **Type Safety**: Maintain strict TypeScript types
- **Style Compliance**: Follow project conventions exactly

### Communication
- **Clear Responses**: Explain what was changed and why
- **Reference Commits**: Link to specific commits when possible
- **Acknowledge Feedback**: Thank reviewers for their input
- **Professional Tone**: Maintain respectful, collaborative communication

### Process Discipline
- **One at a Time**: Process comments sequentially, don't batch unrelated fixes
- **Verify Before Resolve**: Never mark resolved until verified
- **Commit Frequently**: Small, focused commits create clear history
- **Track Progress**: Maintain clear record of what's been done

## Tools & Commands Reference

### GitHub CLI Commands
```bash
# PR Information
gh pr view <number>                              # View PR details
gh pr view <number> --json comments,reviews      # Get structured data
gh pr diff <number>                              # View PR diff

# Comments
gh api repos/:owner/:repo/pulls/:pr/comments     # List all comments
gh api repos/:owner/:repo/pulls/comments/:id     # Get specific comment
gh pr comment <number> --body "..."              # Add general comment
gh pr comment <number> --reply-to <id>          # Reply to comment

# Mark Resolved
gh api repos/:owner/:repo/pulls/comments/:id \
  -X PATCH -f state=resolved                    # Mark resolved (if supported)
```

### Testing & Quality
```bash
pnpm test:all              # Run all tests
pnpm test:unit             # Unit tests
pnpm test:integration      # Integration tests
pnpm test:e2e              # E2E tests
pnpm check:all             # Lint + format + typecheck
pnpm lint                  # Linting only
pnpm typecheck             # Type checking
pnpm build                 # Build verification
```

### Git Commands
```bash
git status                 # Check working directory
git diff                  # Review changes
git add <files>           # Stage changes
git commit -m "..."       # Commit with message
git log --oneline         # View commit history
git push                  # Push changes
```

### ByteRover Commands
```bash
brv retrieve --query "..."           # Retrieve context
brv status                            # Check playbook status
brv add --section "..." --content "..."  # Add memory
brv push                              # Sync to remote
```

## Example Execution Flow

```bash
# 1. Retrieve context
brv retrieve --query "GitHub PR comment resolution patterns"
brv status

# 2. Identify PR
PR_NUMBER=$(gh pr view --json number -q .number)
echo "Processing PR #$PR_NUMBER"

# 3. Fetch all comments
gh pr view $PR_NUMBER --json comments,reviewThreads > /tmp/pr-$PR_NUMBER.json

# 4. Process each comment (automated loop)
# For each comment:
#   - Analyze context
#   - Plan resolution
#   - Apply fix
#   - Verify (tests, lint, typecheck)
#   - Commit changes
#   - Mark as resolved
#   - Record progress

# 5. Final verification
pnpm test:all && pnpm check:all && pnpm build

# 6. Generate summary
echo "✅ All comments processed"

# 7. Store learnings
brv add --section "Best Practices" --content "Successfully resolved all PR comments using systematic approach"
brv push
```

## Success Criteria

A successful execution of this command results in:

1. ✅ **All actionable comments addressed** with code changes, tests, or documentation
2. ✅ **All comments marked as resolved** (or clearly documented why not)
3. ✅ **All tests passing** after changes
4. ✅ **Code quality checks passing** (lint, typecheck, format)
5. ✅ **Build succeeding** without errors
6. ✅ **Clear commit history** with descriptive messages
7. ✅ **Memory updated** with learnings for future use
8. ✅ **Summary report** documenting all resolutions

## Notes

- **Never skip comments**: Every comment deserves attention, even if it's just a polite decline
- **Verify before resolve**: Tests and quality checks must pass before marking resolved
- **One comment at a time**: Process sequentially to maintain clarity and avoid confusion
- **Communicate clearly**: Keep reviewers informed about progress and decisions
- **Store patterns**: Save successful resolution approaches to ByteRover for efficiency
- **Respect reviewer intent**: Understand the "why" behind comments, not just the "what"
- **Maintain professionalism**: Even when declining suggestions, be respectful and constructive

---

*"Excellence is not a destination, but a journey of continuous improvement. Each comment resolved is a step toward better code and stronger collaboration."*
