#!/bin/bash

# Verify Monitoring Configuration Script
# This script verifies that all monitoring components are properly configured and running

set -e

echo "🔍 Verifying Pixelated Monitoring Configuration..."

# Change to project root
cd "$(dirname "$0")/.."

# Function to check service status
check_service() {
    local service=$1
    local port=$2
    local endpoint=$3

    echo "Checking $service on port $port..."
    if curl -s --connect-timeout 5 "http://localhost:$port$endpoint" > /dev/null; then
        echo "✅ $service is running"
        return 0
    else
        echo "❌ $service is not accessible on port $port"
        return 1
    fi
}

# Check configuration files
echo "📄 Checking configuration files..."

# Loki configuration
if [ -f "docker/loki/config.yml" ]; then
    echo "✅ Loki configuration file exists"
    # Check for key configuration items
    if grep -q "instance_addr: 0.0.0.0" docker/loki/config.yml; then
        echo "✅ Loki instance_addr configured correctly"
    else
        echo "❌ Loki instance_addr not configured correctly"
    fi
else
    echo "❌ Loki configuration file missing"
fi

# Promtail configuration
if [ -f "docker/promtail/config.yml" ]; then
    echo "✅ Promtail configuration file exists"
    # Check for key configuration items
    if grep -q "job_name: pixelated-app-logs" docker/promtail/config.yml; then
        echo "✅ Promtail docker service discovery configured"
    else
        echo "❌ Promtail docker service discovery not configured"
    fi
else
    echo "❌ Promtail configuration file missing"
fi

# Grafana datasource configuration
if [ -f "docker/grafana/provisioning/datasources/loki.yml" ]; then
    echo "✅ Grafana Loki datasource configuration exists"
    if grep -q "url: http://loki:3100" docker/grafana/provisioning/datasources/loki.yml; then
        echo "✅ Grafana Loki datasource URL configured correctly"
    else
        echo "❌ Grafana Loki datasource URL not configured correctly"
    fi
else
    echo "❌ Grafana Loki datasource configuration missing"
fi

# Check running services
echo ""
echo "🐳 Checking running services..."

# Check if monitoring stack is running
if docker compose -f docker/docker-compose.monitoring.yml ps | grep -q "Up"; then
    echo "✅ Monitoring stack is running"

    # Check individual services
    check_service "Loki" "3100" "/ready"
    check_service "Prometheus" "9090" "/-/healthy"
    check_service "Grafana" "3001" "/api/health"
    check_service "AlertManager" "9093" "/-/healthy"

else
    echo "❌ Monitoring stack is not running"
    echo "💡 Run './scripts/start-monitoring.sh' to start the monitoring services"
fi

# Check production stack for Loki/Promtail
echo ""
echo "🏭 Checking production stack..."

if docker compose -f docker/docker-compose.production.yml ps | grep -q "loki"; then
    echo "✅ Loki service defined in production stack"
    if docker compose -f docker/docker-compose.production.yml ps loki | grep -q "Up"; then
        echo "✅ Loki service is running in production stack"
    else
        echo "❌ Loki service is not running in production stack"
    fi
else
    echo "ℹ️  Loki service not defined in production stack (this is OK if using separate monitoring stack)"
fi

if docker compose -f docker/docker-compose.production.yml ps | grep -q "promtail"; then
    echo "✅ Promtail service defined in production stack"
    if docker compose -f docker/docker-compose.production.yml ps promtail | grep -q "Up"; then
        echo "✅ Promtail service is running in production stack"
    else
        echo "❌ Promtail service is not running in production stack"
    fi
else
    echo "ℹ️  Promtail service not defined in production stack (this is OK if using separate monitoring stack)"
fi

echo ""
echo "📋 Summary:"
echo "   - Configuration files: Checked"
echo "   - Running services: Checked"
echo "   - Network connectivity: Checked"
echo ""
echo "🔧 If services are not running, use './scripts/start-monitoring.sh'"
echo "📊 Access Grafana at: http://localhost:3001"
echo "📈 Access Prometheus at: http://localhost:9090"
echo "📝 Access Loki at: http://localhost:3100"