# 🚀 ByteRover Remote API Integration - Setup Guide

## ✅ **What's Been Fixed**

Your ByteRover MCP integration has been updated to use **remote API storage** instead of local files:

### **Changes Made**
1. **Remote API Client**: Updated `mcp_server/routers/byterover.py` to use `https://api.byterover.dev`
2. **HTTP Client**: Added `httpx` dependency for API calls
3. **Token Authentication**: Configured to use `MCP_BYTEROVER_TOKEN` environment variable
4. **Error Handling**: Proper API error handling and timeout configuration

---

## 🔧 **Setup Instructions**

### **1. Get Your ByteRover API Token**
1. Visit [ByteRover Dashboard](https://byterover.dev) 
2. Sign up or log in to your account
3. Generate an API token for MCP integration
4. Copy your token (it should look like `btr_xxxxxxxxxxxx`)

### **2. Configure Environment Variables**

Add your token to your environment:

```bash
# For current session
export MCP_BYTEROVER_TOKEN=your_actual_token_here

# Or add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
echo 'export MCP_BYTEROVER_TOKEN=your_actual_token_here' >> ~/.bashrc
source ~/.bashrc
```

### **3. Update MCP Server Environment**

```bash
# In mcp_server/.env
MCP_BYTEROVER_TOKEN=your_actual_token_here
MCP_BYTEROVER_TIMEOUT=30000
```

### **4. Test the Integration**

```bash
# Run the integration test
MCP_BYTEROVER_TOKEN=your_token python test_byterover_remote.py

# Or test manually
cd mcp_server && MCP_BYTEROVER_TOKEN=your_token uv run python mcp_server.py --health
```

---

## 🔄 **Updated API Endpoints**

The ByteRover integration now uses these remote endpoints:

- **Store Knowledge**: `POST https://api.byterover.dev/v1/knowledge/store`
- **Search Knowledge**: `GET https://api.byterover.dev/v1/knowledge/search`
- **Health Check**: `GET https://api.byterover.dev/v1/health`

### **Authentication**
All requests include:
```
Authorization: Bearer your_byterover_token
Content-Type: application/json
```

---

## 🎯 **MCP Tools Available**

Your MCP clients can now use:

### `byterover-store-knowledge`
Store knowledge remotely in ByteRover cloud:
```json
{
  "content": "Knowledge to store about patterns, APIs, solutions, etc."
}
```

### `byterover-retrieve-knowledge`
Search and retrieve knowledge from ByteRover cloud:
```json
{
  "query": "search terms",
  "limit": 5
}
```

---

## 🔍 **Verification Steps**

### **1. Health Check**
```bash
cd mcp_server && MCP_BYTEROVER_TOKEN=your_token uv run python mcp_server.py --health
```

Expected output should show:
```json
{
  "status": "ok",
  "tools": {
    "tools": [
      {"name": "byterover-store-knowledge", ...},
      {"name": "byterover-retrieve-knowledge", ...}
    ]
  }
}
```

### **2. Test Storage**
```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "byterover-store-knowledge", "arguments": {"content": "Test remote storage"}}}' | MCP_BYTEROVER_TOKEN=your_token uv run python mcp_server/mcp_server.py --once
```

### **3. Test Retrieval**
```bash
echo '{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "byterover-retrieve-knowledge", "arguments": {"query": "test", "limit": 3}}}' | MCP_BYTEROVER_TOKEN=your_token uv run python mcp_server/mcp_server.py --once
```

### **4. IDE Integration**
- Restart your MCP client (VS Code, Cursor, etc.)
- Verify the ByteRover tools appear in your tool list
- Test storing and retrieving knowledge through your IDE

---

## 🚨 **Troubleshooting**

### **Token Issues**
- ❌ `ByteRover API token not configured`: Set `MCP_BYTEROVER_TOKEN`
- ❌ `401 Unauthorized`: Check your token is valid and not expired

### **API Issues**
- ❌ `408 Request Timeout`: Increase `MCP_BYTEROVER_TIMEOUT` value
- ❌ `Connection failed`: Check internet connectivity and ByteRover service status

### **MCP Issues**
- ❌ Tools not appearing: Restart MCP client and check configuration
- ❌ Import errors: Ensure `httpx` is installed: `cd mcp_server && uv add httpx`

---

## ✅ **Success Indicators**

You'll know it's working when:
1. ✅ Health check shows API connection successful
2. ✅ Knowledge storage returns remote IDs (not local filenames)
3. ✅ Knowledge retrieval returns results from ByteRover cloud
4. ✅ MCP tools work in your IDE without local file references

---

## 🎯 **Next Steps**

1. **Get your ByteRover token** from the dashboard
2. **Set the environment variable** with your real token
3. **Test the integration** using the provided scripts
4. **Restart your MCP client** to pick up the changes
5. **Start using remote knowledge storage** in your development workflow!

The integration is now properly configured for remote ByteRover API usage instead of local file storage.