# Development Environment Variables
project_name = "pixelated-empathy-development"
environment = "development"
aws_region = "us-east-1"

# Environment-specific sizing
node_group_min_size = 1
node_group_max_size = 3
node_group_desired_size = 1

# Database sizing
db_instance_class = "db.t3.micro"
db_allocated_storage = 20

# Redis sizing  
redis_node_type = "cache.t3.micro"
redis_num_cache_nodes = 1
