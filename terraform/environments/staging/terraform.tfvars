# Staging Environment Variables
project_name = "pixelated-empathy-staging"
environment = "staging"
aws_region = "us-east-1"

# Environment-specific sizing
node_group_min_size = 2
node_group_max_size = 5
node_group_desired_size = 2

# Database sizing
db_instance_class = "db.t3.small"
db_allocated_storage = 50

# Redis sizing  
redis_node_type = "cache.t3.small"
redis_num_cache_nodes = 2
