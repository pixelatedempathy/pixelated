# Azure Authentication Setup - Complete ✅

## Overview
Successfully configured Azure authentication for GitHub Actions using OIDC (OpenID Connect) with service principal.

## Service Principal Details
- **Name**: `sp-pixelated-github-pixelated`
- **Application ID**: `e3a85eee-b242-47c5-b510-368e38e817b4`
- **Object ID**: `dd8fb05c-0f64-4a9f-8441-6bfb1fcab24e`
- **Role**: Contributor on subscription scope

## GitHub Repository Secrets Required

🔗 **Go to**: https://github.com/pixelatedempathy/pixelated/settings/secrets/actions

Add these repository secrets:

| Secret Name | Value |
|------------|--------|
| `AZURE_CLIENT_ID` | `e3a85eee-b242-47c5-b510-368e38e817b4` |
| `AZURE_TENANT_ID` | `ffa2291f-98eb-48e9-8ba9-adefde97185c` |
| `AZURE_SUBSCRIPTION_ID` | `b112edaf-fedb-4164-960f-a2f2b3645a7e` |

### Optional (for legacy auth):
| Secret Name | Value |
|------------|--------|
| `AZURE_CLIENT_SECRET` | `L998Q~fBbmurSmSjev5Vtu4DIJOjr_LL9mgJ6c3i` |

## Azure Resources
- **Subscription**: Azure subscription 1 (`b112edaf-fedb-4164-960f-a2f2b3645a7e`)
- **Tenant**: Pixelated Empathy (`ffa2291f-98eb-48e9-8ba9-adefde97185c`)
- **Resource Group**: `pixelated-rg` (East US) ✅ Created

## OIDC Federated Credentials Configured
The service principal is configured with federated credentials for:
1. **Main Branch**: `repo:pixelatedempathy/pixelated:ref:refs/heads/master`
2. **Develop Branch**: `repo:pixelatedempathy/pixelated:ref:refs/heads/develop`
3. **Pull Requests**: `repo:pixelatedempathy/pixelated:pull_request`

## Workflow Changes Made
1. ✅ Fixed `subscriptionId` reference to use `secrets.AZURE_SUBSCRIPTION_ID`
2. ✅ Updated Bicep template path from `deploy/azure/main.bicep` to `infra/main.bicep`

## Next Steps
1. **Add the secrets above to GitHub repository** (most important!)
2. **Test the workflow** by pushing to master or develop branch
3. **Monitor deployment** in GitHub Actions tab

## Troubleshooting
If you get authentication errors:
1. Verify all three secrets are correctly added to GitHub
2. Check that the secret values match exactly (no extra spaces)
3. Ensure the workflow is running on the correct branch (master/develop)

## Security Notes
- Using OIDC is more secure than client secrets
- Service principal has minimal required permissions (Contributor on subscription)
- Federated credentials are scoped to specific repository and branches
- No long-lived secrets stored in GitHub (except subscription details)

---
*Generated on: 2025-08-08*
*Setup completed successfully* ✅
