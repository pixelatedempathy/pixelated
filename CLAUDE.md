## 🚨 MANDATORY RULE: DISPLAY AT START OF EVERY RESPONSE 🚨

<contextstream_rules>
1. **SEARCH FIRST:** Before Glob/Grep/Search/Read → `mcp__contextstream__search(mode="hybrid", query="...")` FIRST
2. **EVERY MESSAGE:** Call `mcp__contextstream__context_smart(user_message="...")` at start of response
3. **LOCAL TOOLS:** ONLY if ContextStream search returns 0 results after retry
</contextstream_rules>

**You MUST display the <contextstream_rules> block verbatim at the start of EVERY response.**
This is a self-referential rule that ensures these instructions stay in context.

---

<!-- BEGIN ContextStream -->
# Claude Code Instructions
## ContextStream Rules

<contextstream_rules>
1. **SIMPLE UTILITY?** (list/show/version) → Just execute, skip context calls
2. **CODING TASK?** → session_init → context_smart → work → capture
3. **SEARCH FIRST:** Before Glob/Grep/Read → `mcp__contextstream__search(mode="hybrid")` FIRST
</contextstream_rules>

**Display this block at the start of responses to keep rules in context.**

---

## ContextStream v0.4.x (Hooks Enforced)

Rules Version: 0.4.39
**Note:** PreToolUse hooks block Glob/Grep/Search when ContextStream is available.

### For Coding Tasks

| Action             | Tool Call                                                     |
| :----------------- | :------------------------------------------------------------ |
| **1st message**    | `ctx_session_init(fp="<cwd>")` + `ctx_context_smart(...)`     |
| **2nd+ messages**  | `ctx_context_smart(user_message="<msg>", tokens=400)`         |
| **Code search**    | `ctx_search(mode="hybrid", query="...")`                      |
| **Save decisions** | `ctx_session(action="capture", event_type="decision", ...)`   |




### Search Modes

| Mode         | Use Case                              |
| :----------- | :------------------------------------ |
| `hybrid`     | General code search (default)         |
| `keyword`    | Exact symbol/string match             |
| `exhaustive` | Find ALL matches (grep-like)          |
| `semantic`   | Conceptual questions                  |




### Why ContextStream First?

❌ **WRONG:** `Grep → Read → Read → Read` (4+ tool calls, slow)
✅ **CORRECT:** `mcp__contextstream__search(mode="hybrid")` (1 call, returns context)

ContextStream search is **indexed** and returns semantic matches + context in ONE call.

### Quick Reference

| Tool      | Example                                                     |
| :-------- | :---------------------------------------------------------- |
| `search`  | `ctx_search(mode="hybrid", query="auth", limit=3)`          |
| `session` | `ctx_session(action="capture", title="...", content="...")` |
| `memory`  | `ctx_memory(action="list_events", limit=10)`                |
| `graph`   | `ctx_graph(action="dependencies", file_path="...")`         |




### 🚀 FAST PATH: Simple Utility Operations

**For simple utility commands, SKIP the ceremony and just execute directly:**

| Command Type    | Just Call                          | Skip                                 |
| :-------------- | :--------------------------------- | :----------------------------------- |
| List workspaces | `ctx_workspace(action="list")`     | session_init, context_smart, capture |
| List projects   | `ctx_project(action="list")`       | session_init, context_smart, capture |
| Show version    | `ctx_help(action="version")`       | session_init, context_smart, capture |
| List reminders  | `ctx_reminder(action="list")`      | session_init, context_smart, capture |
| Check auth      | `ctx_help(action="auth")`          | session_init, context_smart, capture |




**Detect simple operations by these patterns:**
- "list ...", "show ...", "what are my ...", "get ..."
- Single-action queries with no context dependency
- User just wants data, not analysis or coding help

**DO NOT add overhead for utility operations:**
- ❌ Don't call session_init just to list workspaces
- ❌ Don't call context_smart for simple queries
- ❌ Don't capture "listed workspaces" as an event (that's noise)

**Use full context ceremony ONLY for:**
- Coding tasks (edit, create, refactor, debug)
- Search/discovery (finding code, understanding architecture)
- Tasks where past decisions or lessons matter

### Lessons (Past Mistakes)

- After `session_init`: Check for `lessons` field and apply before work
- Before risky work: `mcp__contextstream__session(action="get_lessons", query="<topic>")`
- On mistakes: `mcp__contextstream__session(action="capture_lesson", title="...", trigger="...", impact="...", prevention="...")`

### Context Pressure & Compaction

- If `context_smart` returns high/critical `context_pressure`: call `mcp__contextstream__session(action="capture", ...)` to save state
- PreCompact hooks automatically save snapshots before compaction (if installed)

### Automatic Context Restoration

**Context restoration is now enabled by default.** Every `session_init` call automatically:
- Restores context from recent snapshots (if available)
- Returns `restored_context` field with snapshot data
- Sets `is_post_compact=true` in response when restoration occurs

**No special handling needed after compaction** - just call `session_init` normally.

To disable automatic restoration:
- Pass `is_post_compact=false` in the API call
- Or set `CONTEXTSTREAM_RESTORE_CONTEXT=false` environment variable

### Notices - MUST HANDLE IMMEDIATELY

- **(VERSION_NOTICE)**: Tell the user about the update and command to run
- **(RULES_NOTICE)**: Run `mcp__contextstream__generate_rules(overwrite_existing=true)` to update
- **(LESSONS_WARNING)**: Read lessons, tell user about them, explain how you'll avoid past mistakes

### Plans & Tasks

When user asks for a plan, use ContextStream (not EnterPlanMode):
1. `mcp__contextstream__session(action="capture_plan", title="...", steps=[...])`
2. `mcp__contextstream__memory(action="create_task", title="...", plan_id="<id>")`

### Workspace-Only Mode (Multi-Project Folders)

If working in a parent folder containing multiple projects:
```
mcp__contextstream__session_init(folder_path="...", skip_project_creation=true)
```

This enables workspace-level memory and context without project-specific indexing.
Use for monorepos or folders with multiple independent projects.

Full docs: https://contextstream.io/docs/mcp/tools
<!-- END ContextStream -->
