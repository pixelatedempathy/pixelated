## 2026-02-20 - [Role Escalation in Public Signup]
**Vulnerability:** The /api/auth/signup endpoint allowed users to specify their own role in the request body, which was then passed directly to the Auth0 user creation service.
**Learning:** Even when using external auth providers like Auth0, the application-level API endpoints must strictly control which metadata (like roles) can be set by the client. Public signup endpoints should always hardcode or validate roles to the lowest possible privilege.
**Prevention:** Always hardcode default roles for public endpoints and use a separate, protected administrative API for creating over-privileged users.
