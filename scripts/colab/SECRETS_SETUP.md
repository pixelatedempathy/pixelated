# Colab Secrets - Easy Environment Variable Setup

Stop copying/pasting secrets every time! Use Colab's built-in Secrets manager.

## Method 1: Colab Secrets (Recommended)

Colab has a built-in secrets manager in the left sidebar.

### Step 1: Open Secrets Panel

1. Look at the **left sidebar** in Colab
2. Click the **🔑 key icon** (Secrets)
3. Or go to: `Tools` → `Secrets`

### Step 2: Add Your Secrets

Click **"Add new secret"** and add these:

| Secret Name | Value |
|-------------|-------|
| `OVH_S3_ACCESS_KEY` | `b6939e6b65ef4252b20338499421a5f0` |
| `OVH_S3_SECRET_KEY` | `4a7e939381c6467c88f81a5024672a96` |
| `OVH_S3_BUCKET` | `pixel-data` |
| `OVH_S3_ENDPOINT` | `https://s3.us-east-va.io.cloud.ovh.us` |
| `WANDB_API_KEY` | `your-wandb-key` (optional) |
| `HF_TOKEN` | `hf_your-token` (optional) |

### Step 3: Use Secrets in Notebook

```python
from google.colab import userdata

# Get secrets (no more copy/paste!)
os.environ['OVH_S3_ACCESS_KEY'] = userdata.get('OVH_S3_ACCESS_KEY')
os.environ['OVH_S3_SECRET_KEY'] = userdata.get('OVH_S3_SECRET_KEY')
os.environ['OVH_S3_BUCKET'] = userdata.get('OVH_S3_BUCKET')
os.environ['OVH_S3_ENDPOINT'] = userdata.get('OVH_S3_ENDPOINT')

# Optional
os.environ['WANDB_API_KEY'] = userdata.get('WANDB_API_KEY')
os.environ['HF_TOKEN'] = userdata.get('HF_TOKEN')

print("✅ Secrets loaded from Colab Secrets!")
```

**Note**: First time you run, it will ask for permission to access each secret.

---

## Method 2: Mount Google Drive

Store a `.env` file in Drive and load it:

### Step 1: Create .env File

Create a file called `pixelated-secrets.env` on your local computer:

```bash
OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
OVH_S3_BUCKET=pixel-data
OVH_S3_ENDPOINT=https://s3.us-east-va.io.cloud.ovh.us
WANDB_API_KEY=your-wandb-key
HF_TOKEN=hf_your-token
```

Upload to Google Drive (any folder).

### Step 2: Load in Colab

```python
from google.colab import drive
import os

# Mount Drive
drive.mount('/content/drive')

# Load .env file
env_path = '/content/drive/MyDrive/pixelated-secrets.env'

with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            key, value = line.split('=', 1)
            os.environ[key] = value

print("✅ Secrets loaded from Google Drive!")
```

---

## Method 3: One-Cell Setup (Copy Once)

If you still want copy/paste but only once:

```python
# Copy this entire cell once, then save the notebook
import os

secrets = """
OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
OVH_S3_BUCKET=pixel-data
OVH_S3_ENDPOINT=https://s3.us-east-va.io.cloud.ovh.us
"""

for line in secrets.strip().split('\n'):
    if '=' in line:
        key, value = line.split('=', 1)
        os.environ[key] = value

print("✅ All secrets set!")
```

Save the notebook after adding this cell - secrets persist in the notebook (but **don't commit to GitHub!**).

---

## Method 4: Environment Module

Create a reusable Python module:

```python
# In a cell, create env_loader.py
%%writefile env_loader.py
import os
from google.colab import userdata

def load_secrets():
    """Load all secrets from Colab Secrets."""
    secrets = {
        'OVH_S3_ACCESS_KEY': userdata.get('OVH_S3_ACCESS_KEY'),
        'OVH_S3_SECRET_KEY': userdata.get('OVH_S3_SECRET_KEY'),
        'OVH_S3_BUCKET': userdata.get('OVH_S3_BUCKET'),
        'OVH_S3_ENDPOINT': userdata.get('OVH_S3_ENDPOINT'),
    }
    
    # Optional secrets
    try:
        secrets['WANDB_API_KEY'] = userdata.get('WANDB_API_KEY')
    except:
        pass
    
    try:
        secrets['HF_TOKEN'] = userdata.get('HF_TOKEN')
    except:
        pass
    
    for key, value in secrets.items():
        if value:
            os.environ[key] = value
    
    print("✅ Secrets loaded!")
    return secrets
```

Then in any notebook:

```python
import env_loader
env_loader.load_secrets()
```

---

## Quick Comparison

| Method | Setup Time | Reusability | Security |
|--------|------------|-------------|----------|
| **Colab Secrets** | 5 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Google Drive** | 10 min | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **One-cell** | 2 min | ⭐⭐ | ⭐⭐ |
| **env_loader module** | 15 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## Recommendation

1. **First time**: Use **Method 1 (Colab Secrets)** - add all secrets once
2. **Future runs**: Just run the 6-line loader code
3. **Team sharing**: Use **Method 2 (Google Drive)** with shared Drive

## Example Complete Setup

```python
# Cell 1: Mount drive (optional)
from google.colab import drive
drive.mount('/content/drive')

# Cell 2: Load secrets (choose ONE method)

# Option A: Colab Secrets
from google.colab import userdata
os.environ['OVH_S3_ACCESS_KEY'] = userdata.get('OVH_S3_ACCESS_KEY')
os.environ['OVH_S3_SECRET_KEY'] = userdata.get('OVH_S3_SECRET_KEY')
os.environ['OVH_S3_BUCKET'] = userdata.get('OVH_S3_BUCKET')
os.environ['OVH_S3_ENDPOINT'] = userdata.get('OVH_S3_ENDPOINT')

# Option B: Drive .env file
# import dotenv
# dotenv.load_dotenv('/content/drive/MyDrive/.env')

# Cell 3: Verify
print("Secrets loaded:")
print(f"  Bucket: {os.environ.get('OVH_S3_BUCKET')}")
print(f"  Endpoint: {os.environ.get('OVH_S3_ENDPOINT')}")

# Cell 4: Run training
!python train.py --stage stage1
```

---

## Security Note

⚠️ **Never commit secrets to GitHub!**

If you save notebooks with secrets:
- Use **Colab Secrets** (secrets not in notebook)
- Or use **Drive** (secrets external)
- Avoid hardcoding in notebook cells that get saved

The **Secrets** panel is the safest option - secrets stay encrypted and separate from your code.
