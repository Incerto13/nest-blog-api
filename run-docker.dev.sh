# !/bin/bash

docker stop nest-blog-api_postgres nest-blog-api_pgweb nest-blog-api_server
docker system prune -af

# run all containers in docker
echo "starting postgres, pgweb, and nest-blog-api_server containers..."
sudo docker compose -f docker-compose.dev.yml --env-file ../.env up -d
