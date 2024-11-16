# !/bin/bash

source ../.env
printf "NEST_BLOG_API_TYPEORM_HOST=$NEST_BLOG_API_TYPEORM_HOST\nNEST_BLOG_API_POSTGRES_PORT=$NEST_BLOG_API_POSTGRES_PORT\n" > .env
echo "successfully created .env file"

docker stop nest-blog-api_postgres nest-blog-api_pgweb nest-blog-api_server
docker system prune -af

# run all containers in docker
echo "starting postgres, pgweb, and nest-blog-api_server containers..."
sudo docker compose -f docker-compose.dev.yml --env-file ../.env up -d nest-blog-api_postgres nest-blog-api_pgweb

# start server in terminal
npm run start