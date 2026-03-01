FROM python:3.11-slim

WORKDIR /app

# Install build dependencies and Python dependencies, then remove build tools
# First copy only requirements to install them
COPY ai-services/requirements.txt .
RUN apt-get update && apt-get install -y --no-install-recommends build-essential && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get purge -y --auto-remove build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy application code
COPY ai-services/ ./
COPY ai-services/security/ ./security/

# Create a non-root user and set ownership of /app
RUN groupadd -r appuser && useradd -r -g appuser appuser && \
    chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose port
EXPOSE 5000

# Run the API server
CMD ["python", "api.py"]