# Agent Hand-off Quick Reference - Enforcement Protocol

## ⚡ IMMEDIATE ACTION REQUIRED

### 🚨 ZERO TOLERANCE VIOLATIONS (Automatic Rejection)
- Test coverage < 95%
- Quality score < 90%
- Security vulnerabilities > 0
- Performance benchmarks not met
- Incomplete documentation
- Missing sign-offs

---

## 📋 MANDATORY CHECKLIST (Before Hand-off)

### Pre-Submission (Run These Commands)
```bash
pnpm test:all                    # MUST: 100% pass rate
pnpm security:scan              # MUST: Zero vulnerabilities
pnpm performance:test           # MUST: Exceed benchmarks
pnpm lint                       # MUST: No linting errors
pnpm typecheck                  # MUST: No TypeScript errors
```

### Documentation Requirements
- [ ] Work summary (≥500 characters)
- [ ] All achievements with metrics
- [ ] Challenges with resolutions
- [ ] Lessons learned (≥3)
- [ ] Complete component list
- [ ] All API integrations documented

---

## 🔐 SIGN-OFF SEQUENCE (MANDATORY ORDER)

1. **Developer** → 2. **Tech Lead** → 3. **QA Engineer** → 4. **Security Reviewer** → 5. **Product Owner**

**NO EXCEPTIONS - MUST FOLLOW EXACT SEQUENCE**

---

## 🚨 FAILURE CONSEQUENCES

### First Violation
- Automatic rejection
- -25 performance points
- Mandatory retraining (48 hours)
- Supervisor notification

### Second Violation
- 72-hour privilege suspension
- Formal warning
- Performance improvement plan
- Team lead involvement

### Third Violation
- 1-week privilege revocation
- Performance review triggered
- Potential termination proceedings
- Knowledge transfer required

---

## ⚡ EMERGENCY CONTACTS

### Technical Issues
- **System Admin**: `admin@pixelated.com`
- **Tech Lead**: `tech-lead@pixelated.com`
- **Security**: `security@pixelated.com`

### Process Issues
- **SPARC Orchestrator**: `sparc@pixelated.com`
- **Project Manager**: `pm@pixelated.com`

### Critical Issues
- **Emergency**: `+1-555-HANDOFF`
- **Critical**: `critical@pixelated.com`

---

## 🎯 KEY METRICS (MUST EXCEED)

| Metric | Target | Status |
|--------|--------|---------|
| Test Coverage | ≥95% | ✅/❌ |
| Quality Score | ≥90% | ✅/❌ |
| Performance | <100ms | ✅/❌ |
| Security | Zero vulns | ✅/❌ |
| Documentation | Complete | ✅/❌ |

---

## 📝 API ENDPOINTS (Quick Reference)

### Create Report
```http
POST /api/v1/agent-handoff/reports
Authorization: Bearer {{TOKEN}}
```

### Submit Report
```http
POST /api/v1/agent-handoff/reports/{id}/submit
```

### Review Report
```http
POST /api/v1/agent-handoff/reports/{id}/review
```

### Sign-off Report
```http
POST /api/v1/agent-handoff/reports/{id}/sign-off
```

---

## 🚨 ENFORCEMENT COMMANDS

### Activate Strict Mode
```bash
export HANDOFF_ENFORCEMENT_MODE="STRICT"
export HANDOFF_AUTO_REJECT="true"
pnpm handoff:enforcement --mode=strict
```

### Monitor Hand-offs
```bash
pnpm handoff:monitor --strict-enforcement
```

---

## 📞 IMMEDIATE ESCALATION

### If You Encounter:
- **System rejection** → Contact supervisor immediately
- **Technical failure** → Contact system admin
- **Process confusion** → Contact SPARC orchestrator
- **Security concern** → Contact security team

### Response Times:
- **Critical issues**: 15 minutes
- **Technical issues**: 1 hour
- **Process issues**: 4 hours
- **General questions**: 24 hours

---

## 🏁 FINAL REMINDERS

### **NO EXCEPTIONS POLICY**
- Partial compliance = failure
- Quality score < 90% = automatic rejection
- Missing sign-offs = immediate escalation
- Security violations = privilege revocation

### **PERSONAL ACCOUNTABILITY**
- Each agent responsible for their hand-offs
- Failure impacts entire team metrics
- Repeated failures affect career progression
- System enforces automatically - no overrides

---

**Document Version:** 1.0.0  
**Enforcement Status:** ACTIVE  
**Compliance Required:** IMMEDIATE  
**Next Review:** October 25, 2025

**⚠️ WARNING: This is a living document. Protocols may be updated without notice. Always check latest version before hand-off.**