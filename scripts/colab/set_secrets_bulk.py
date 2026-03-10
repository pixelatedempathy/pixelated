#!/usr/bin/env python3
"""
Bulk Secrets Import for Google Colab
Run ONCE to add all secrets, then never paste again!
"""

# ============================================================================
# PASTE YOUR SECRETS HERE (one time only)
# ============================================================================

SECRETS = """
OVH_S3_ACCESS_KEY=b6939e6b65ef4252b20338499421a5f0
OVH_S3_SECRET_KEY=4a7e939381c6467c88f81a5024672a96
OVH_S3_BUCKET=pixel-data
OVH_S3_ENDPOINT=https://s3.us-east-va.io.cloud.ovh.us
OVH_S3_REGION=us-east-va
"""

# Optional: Add your own secrets below
# WANDB_API_KEY=your-wandb-key
# HF_TOKEN=hf_your-token

# ============================================================================
# DON'T MODIFY BELOW THIS LINE
# ============================================================================


def parse_secrets(secrets_text: str) -> dict:
    """Parse secrets from text."""
    secrets = {}
    for line in secrets_text.strip().split("\n"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            secrets[key.strip()] = value.strip()
    return secrets


def set_colab_secrets(secrets: dict):
    """Set secrets in Colab."""
    try:
        from google.colab import userdata

        print("Adding secrets to Colab...")
        print("=" * 50)

        for name, value in secrets.items():
            if value and not value.startswith("your-"):
                try:
                    userdata.set(name, value)
                    print(f"✅ {name}")
                except Exception as e:
                    print(f"❌ {name}: {e}")
            else:
                print(f"⚠️  Skipped {name} (placeholder)")

        print("=" * 50)
        print("\n🎉 Done! All secrets saved to Colab.")
        print("\nTo use them in any notebook:")
        print("  from google.colab import userdata")
        print("  import os")
        print("  os.environ['SECRET_NAME'] = userdata.get('SECRET_NAME')")

    except ImportError:
        print("❌ Error: Not running in Google Colab!")
        print("This script only works in Colab notebooks.")


def main():
    """Main function."""
    secrets = parse_secrets(SECRETS)

    print("Bulk Secrets Import for Colab")
    print(f"Found {len(secrets)} secrets to import\n")

    set_colab_secrets(secrets)


if __name__ == "__main__":
    main()
