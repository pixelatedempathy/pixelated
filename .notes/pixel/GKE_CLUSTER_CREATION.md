# 🚀 GKE Cluster Creation - Clean Names

**Based on GitHub Workflow Analysis**  
**Project**: pixelated-463209-e5 (from service account)  
**Target**: Production-ready GKE cluster with meaningful names  

---

## 🎯 **CLUSTER CONFIGURATION**

### **Clean, Meaningful Names**
```yaml
Project: pixelated-463209-e5
Cluster Name: pixelated-empathy-prod
Zone: us-central1-c
Region: us-central1
Namespace: pixelated-empathy
Deployment Name: pixelated-app
Service Name: pixelated-service
Node Pool: empathy-workers
```

### **Cluster Specifications**
```yaml
Machine Type: e2-standard-4 (4 vCPU, 16GB RAM)
Node Count: 3 (for high availability)
Disk Size: 50GB SSD per node
Network: Default VPC
Subnetwork: default
Enable Autoscaling: 1-5 nodes
Enable Autorepair: true
Enable Autoupgrade: true
```

---

## 🛠️ **CLUSTER CREATION COMMANDS**

### **1. Create the Main Cluster**
```bash
gcloud container clusters create pixelated-empathy-prod \
  --project=pixelated-463209-e5 \
  --zone=us-central1-c \
  --machine-type=e2-standard-4 \
  --num-nodes=3 \
  --disk-size=50GB \
  --disk-type=pd-ssd \
  --enable-cloud-logging \
  --enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5 \
  --enable-autorepair \
  --enable-autoupgrade \
  --network=default \
  --subnetwork=default \
  --cluster-version=latest \
  --node-locations=us-central1-c \
  --addons=HorizontalPodAutoscaling,HttpLoadBalancing,NodeLocalDNS \
  --enable-ip-alias \
  --workload-pool=pixelated-463209-e5.svc.id.goog
```

### **2. Configure kubectl Access**
```bash
gcloud container clusters get-credentials pixelated-empathy-prod \
  --zone=us-central1-c \
  --project=pixelated-463209-e5
```

### **3. Create Namespace**
```bash
kubectl create namespace pixelated-empathy
kubectl config set-context --current --namespace=pixelated-empathy
```

### **4. Create Basic Deployment (Test)**
```bash
kubectl create deployment pixelated-app \
  --image=ghcr.io/pixelatedempathy/pixelated:latest \
  --replicas=3 \
  --namespace=pixelated-empathy
```

### **5. Expose as Service**
```bash
kubectl expose deployment pixelated-app \
  --type=LoadBalancer \
  --port=80 \
  --target-port=3000 \
  --name=pixelated-service \
  --namespace=pixelated-empathy
```

---

## 📝 **ENVIRONMENT VARIABLES FOR WORKFLOW**

### **Update .env File**
```bash
# GCP Configuration
GCP_PROJECT_ID=pixelated-463209-e5
GKE_CLUSTER_NAME=pixelated-empathy-prod
GKE_ZONE=us-central1-c
GKE_NAMESPACE=pixelated-empathy
GKE_DEPLOYMENT_NAME=pixelated-app
GKE_SERVICE_NAME=pixelated-service
GKE_ENVIRONMENT_URL=https://pixelated-empathy.com
```

### **GitHub Secrets to Set**
```bash
GCP_PROJECT_ID: pixelated-463209-e5
GKE_CLUSTER_NAME: pixelated-empathy-prod
GKE_ZONE: us-central1-c
GKE_NAMESPACE: pixelated-empathy
GKE_DEPLOYMENT_NAME: pixelated-app
GKE_SERVICE_NAME: pixelated-service
```

---

## 🎯 **EXECUTION PLAN**

### **Step 1: Create Cluster**
```bash
echo "🚀 Creating GKE cluster with clean names..."
gcloud container clusters create pixelated-empathy-prod \
  --project=pixelated-463209-e5 \
  --zone=us-central1-c \
  --machine-type=e2-standard-4 \
  --num-nodes=3 \
  --disk-size=50GB \
  --disk-type=pd-ssd \
  --enable-cloud-logging \
  --enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5 \
  --enable-autorepair \
  --enable-autoupgrade \
  --workload-pool=pixelated-463209-e5.svc.id.goog
```

### **Step 2: Verify Cluster**
```bash
echo "✅ Verifying cluster creation..."
gcloud container clusters describe pixelated-empathy-prod \
  --zone=us-central1-c \
  --project=pixelated-463209-e5
```

### **Step 3: Configure Access**
```bash
echo "🔧 Configuring kubectl access..."
gcloud container clusters get-credentials pixelated-empathy-prod \
  --zone=us-central1-c \
  --project=pixelated-463209-e5

kubectl cluster-info
kubectl get nodes
```

### **Step 4: Create Namespace**
```bash
echo "📁 Creating pixelated-empathy namespace..."
kubectl create namespace pixelated-empathy
kubectl config set-context --current --namespace=pixelated-empathy
```

### **Step 5: Test Deployment**
```bash
echo "🧪 Testing basic deployment..."
kubectl create deployment test-app \
  --image=nginx \
  --replicas=1 \
  --namespace=pixelated-empathy

kubectl get deployment test-app
kubectl delete deployment test-app
```

---

## 💰 **COST ESTIMATION**

### **Monthly Costs (Approximate)**
```yaml
Cluster Management Fee: $74.40/month
3 x e2-standard-4 nodes: ~$180/month
50GB SSD storage per node: ~$30/month
Load Balancer: ~$18/month
Network egress: ~$10/month

Total Estimated: ~$312/month
```

### **Cost Optimization Options**
```yaml
Development Cluster Alternative:
- Machine Type: e2-medium (1 vCPU, 4GB RAM)
- Node Count: 2
- Estimated Cost: ~$120/month

Preemptible Nodes (60% savings):
- Add --preemptible flag
- Estimated Cost: ~$125/month
```

---

## 🔒 **SECURITY CONFIGURATION**

### **Workload Identity (Already Configured)**
```bash
# Already set up with binding:
# principalSet://iam.googleapis.com/projects/751556915102/locations/global/workloadIdentityPools/github-pool/attribute.repository/pixelatedempathy/pixelated
```

### **Additional Security**
```bash
# Enable network policy
gcloud container clusters update pixelated-empathy-prod \
  --enable-network-policy \
  --zone=us-central1-c \
  --project=pixelated-463209-e5

# Enable binary authorization (optional)
gcloud container clusters update pixelated-empathy-prod \
  --enable-binauthz \
  --zone=us-central1-c \
  --project=pixelated-463209-e5
```

---

**Ready to execute cluster creation with clean, meaningful names!**