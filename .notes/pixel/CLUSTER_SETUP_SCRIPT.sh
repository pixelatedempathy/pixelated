#!/bin/bash
# 🚀 GKE Cluster Setup Script - Clean Names
# Run this script once cluster creation is complete

set -e

echo "🎯 Setting up pixelated-empathy-prod cluster..."

# Configuration
PROJECT_ID="pixelated-463209-e5"
CLUSTER_NAME="pixelated-empathy-prod"
ZONE="us-central1-c"
NAMESPACE="pixelated-empathy"
DEPLOYMENT_NAME="pixelated-app"
SERVICE_NAME="pixelated-service"

echo "📋 Using clean, meaningful names:"
echo "  Cluster: $CLUSTER_NAME"
echo "  Namespace: $NAMESPACE" 
echo "  Deployment: $DEPLOYMENT_NAME"
echo "  Service: $SERVICE_NAME"

# Step 1: Get cluster credentials
echo "🔧 Configuring kubectl access..."
gcloud container clusters get-credentials $CLUSTER_NAME \
  --zone=$ZONE \
  --project=$PROJECT_ID

# Step 2: Verify cluster access
echo "✅ Verifying cluster access..."
kubectl cluster-info
kubectl get nodes

# Step 3: Create namespace
echo "📁 Creating $NAMESPACE namespace..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
kubectl config set-context --current --namespace=$NAMESPACE

# Step 4: Create basic RBAC
echo "🔒 Setting up RBAC..."
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: pixelated-service-account
  namespace: $NAMESPACE
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: $NAMESPACE
  name: pixelated-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pixelated-rolebinding
  namespace: $NAMESPACE
subjects:
- kind: ServiceAccount
  name: pixelated-service-account
  namespace: $NAMESPACE
roleRef:
  kind: Role
  name: pixelated-role
  apiGroup: rbac.authorization.k8s.io
EOF

# Step 5: Create ConfigMap for environment
echo "⚙️ Creating environment ConfigMap..."
kubectl create configmap pixelated-config \
  --from-literal=NODE_ENV=production \
  --from-literal=PORT=3000 \
  --from-literal=CLUSTER_NAME=$CLUSTER_NAME \
  --namespace=$NAMESPACE \
  --dry-run=client -o yaml | kubectl apply -f -

# Step 6: Test deployment
echo "🧪 Creating test deployment..."
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-deployment
  namespace: $NAMESPACE
  labels:
    app: test-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-app
  template:
    metadata:
      labels:
        app: test-app
    spec:
      serviceAccountName: pixelated-service-account
      containers:
      - name: test-container
        image: nginx:alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
EOF

# Step 7: Wait for test deployment
echo "⏳ Waiting for test deployment..."
kubectl rollout status deployment/test-deployment --timeout=300s

# Step 8: Create test service
echo "🌐 Creating test service..."
kubectl expose deployment test-deployment \
  --type=LoadBalancer \
  --port=80 \
  --target-port=80 \
  --name=test-service

# Step 9: Cleanup test resources
echo "🧹 Cleaning up test resources..."
sleep 10
kubectl delete service test-service
kubectl delete deployment test-deployment

# Step 10: Display cluster information
echo "📊 Cluster setup complete!"
echo ""
echo "Cluster Information:"
echo "  Name: $CLUSTER_NAME"
echo "  Zone: $ZONE"
echo "  Namespace: $NAMESPACE"
echo "  Nodes: $(kubectl get nodes --no-headers | wc -l)"
echo "  Kubernetes Version: $(kubectl version --short --client)"
echo ""
echo "Ready for application deployment!"
echo ""
echo "Next steps:"
echo "1. Update GitHub secrets with cluster information"
echo "2. Push code to trigger CI/CD pipeline"
echo "3. Monitor deployment in namespace: $NAMESPACE"

echo "✅ GKE cluster setup completed successfully!"