# Security Configuration Guide

## Environment Variables

This project uses environment variables to manage sensitive configuration data. **Never commit actual credentials to the repository.**

### Required Environment Variables

Before running the application, copy `.env.example` to `.env` and update the following variables:

```bash
cp .env.example .env
```

### Critical Security Variables

1. **JWT_SECRET** - Used for JWT token signing
   - Must be at least 32 characters long
   - Should be a random, cryptographically secure string
   - Generate with: `openssl rand -base64 32`

2. **MONGO_PASSWORD** - MongoDB root password
   - Should be a strong, unique password
   - Used by Docker Compose for database initialization

3. **GRAFANA_ADMIN_PASSWORD** - Grafana admin interface password
   - Should be a strong, unique password
   - Used for monitoring dashboard access

### Example Secure Generation

```bash
# Generate secure JWT secret
export JWT_SECRET=$(openssl rand -base64 32)

# Generate secure passwords
export MONGO_PASSWORD=$(openssl rand -base64 16)
export GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 16)
```

### Docker Compose Usage

The `docker-compose.integration.yml` file uses these environment variables with safe defaults:

- `${MONGO_USERNAME:-admin}` - Defaults to "admin" if not set
- `${MONGO_PASSWORD:-changeme}` - Defaults to "changeme" (insecure, must be changed)
- `${GRAFANA_ADMIN_PASSWORD:-changeme}` - Defaults to "changeme" (insecure, must be changed)

### Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use strong, unique passwords** for each environment
3. **Rotate credentials regularly** in production
4. **Use secrets management** systems in production (e.g., Docker Secrets, Kubernetes Secrets)
5. **Monitor for credential leaks** using tools like GitGuardian

### Production Deployment

For production environments, consider using:
- Docker Secrets
- Kubernetes Secrets
- Cloud provider secret managers (AWS Secrets Manager, Azure Key Vault, etc.)
- Environment-specific CI/CD secret injection

## Vulnerability Resolution

This security guide was created to resolve KAN-14: Username/Password vulnerability detection in the repository.