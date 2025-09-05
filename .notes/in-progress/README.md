This is an editable example config for local testing and experimentation with the claude-code-router project.

Notes:

- This file is not the live configuration. The real config should live outside the repository (for example, in ~/.claude-code-router/config.json or specified via environment variables).
- Secrets and API keys shown here are REDACTED placeholders. Replace them with real secrets in your local config and never commit them.
- Keys are lowercased to match typical claude-code-router expectations: `providers`, `router`, `transformers`, etc.

Recommended fields:
- providers: an array of provider objects with name, api_base_url, api_key, and models
- router: default, think, background, long_context, long_context_threshold
- transformers: array of transformer plugin objects (path + options)

Example usage:
- Run the router with your local config referenced via CLI or environment as documented in the project README.

If you want, I can also add a script to copy this example to your user config path and prompt for redaction.
