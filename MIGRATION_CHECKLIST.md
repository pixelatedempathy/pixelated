# 📋 Server Migration & Role Transition Checklist

## 🌍 Overview
- **Production:** `<PROD_SSH_USER>@<PROD_HOST>` (AWS EC2) - **Nuked & Fresh Rebuild**
- **Staging/Ops:** `<STAGING_SSH_USER>@<STAGING_HOST>` (OVH VPS) - **Active Dev/Backups**

---

## 🛠️ Phase 1: Staging/Ops Server Setup
- [x] **1.1 Base System**
  - [x] Update apt packages
  - [x] Install `git`, `curl`, `jq`, `build-essential`, `ca-certificates`
- [x] **1.2 Toolchain**
  - [x] Install Node.js 24 (via NodeSource)
  - [x] Install `pnpm` (Corepack)
  - [x] Install `uv` (Astral)
  - [x] Run `scripts/vps-uv-setup.sh`
- [x] **1.3 Repository & Config**
  - [x] Clone/Verify `pixelated` repository
  - [x] Transfer and verify `.env` file
  - [ ] Configure `rclone` for S3 access
- [x] **1.4 Resuming Operations**
  - [x] Start Dataset Hydration tasks (Tested successfully)
  - [ ] Start Ultra Nightmare generation
  - [x] Verify background service health

---

## 🏗️ Phase 2: Production Rebuild (`3.137.216.156`)
- [x] **2.1 Nuclear Cleanup**
  - [x] Wipe `~/pixelated` and all old dev data (Nuked to 37% disk usage)
  - [x] Fresh Git Clone via SSH (using `atlanta` key)
- [x] **2.2 Infrastructure Setup**
  - [ ] Configure Traefik (`docker/traefik/traefik.yml`)
  - [x] Setup production secrets in `docker/config/secrets/`
  - [x] Install `uv` on host and configure Python 3.11.13 venv
  - [x] Upload production `.env`
  - [x] Prepare `docker-compose.production.yml` (Fixed build context)
- [x] **2.3 Deployment**
  - [x] Build production Docker image (Node 24 base)
  - [x] Launch stack: `docker compose -f docker/docker-compose.production.yml up -d`
  - [ ] Verify SSL via Let's Encrypt
- [ ] **2.4 Health & Monitoring**
  - [x] Verify `/api/health` responsiveness (App is UP and Healthy)
  - [x] Confirm Prometheus/Grafana metric collection (Loki config fixed and deployed to production)


---

## 🔗 Phase 3: Final Cutover
- [ ] **3.1 DNS Update**
  - [ ] Point `pixelatedempathy.com` to `3.137.216.156`
  - [ ] Point dev subdomains (if any) to `194.113.75.34`
- [ ] **3.2 Memory Update**
  - [ ] Update `GEMINI.md` server entries
  - [ ] Update `.memory/30-tech.md` infrastructure section
  - [ ] Update `40-active.md` status
- [ ] **3.3 Success Verification**
  - [ ] Final E2E test run
  - [ ] PII scrubbing & crisis detection validation
