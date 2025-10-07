# Production Environment Variables
project_name = "pixelated-empathy-production"
environment = "production"
aws_region = "us-east-1"

# Environment-specific sizing
node_group_min_size = 3
node_group_max_size = 20
node_group_desired_size = 3

# Database sizing
db_instance_class = "db.r5.large"
db_allocated_storage = 100

# Redis sizing  
redis_node_type = "cache.r5.large"
redis_num_cache_nodes = 3
