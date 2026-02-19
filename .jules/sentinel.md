## 2025-02-19 - [API Shadowing Vulnerability]
**Vulnerability:** A local mock class was redefining a service already imported at the top of the file (`ContactService` in `src/pages/api/contact.ts`), effectively shadowing the real implementation and bypassing all security validations (Zod, spam checks) and functional logic (email sending).
**Learning:** This pattern of shadowing imports with local classes is extremely dangerous as it may go unnoticed during code reviews if the reviewer only checks the usage site and assumes the top-level import is what's being used. In this case, it was likely a leftover from early development/debugging.
**Prevention:** 1. Linting rules against shadowing top-level imports. 2. Thorough inspection of API routes for local dummy classes. 3. Automated security tests that verify validation is actually being applied at the integration level.

## 2025-02-19 - [Broken Test Configuration Hiding Vulnerabilities]
**Vulnerability:** The Vitest configuration (`config/vitest.config.ts`) had incorrect path aliases and was missing a required setup file. This prevented tests from running correctly, which in turn allowed bugs in security logic (like the incorrect string conversion check in `ContactService.ts`) to persist.
**Learning:** A broken test suite is a security risk. If tests cannot run or are consistently failing, developers may ignore them, allowing regressions and security bugs to go undetected.
**Prevention:** 1. Ensure CI/CD fails on broken test configurations. 2. Regularly audit test configurations when project structure changes. 3. Use absolute paths or correctly resolved relative paths in build/test configs.
