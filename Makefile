# For running db in container (while running api on local machine)
up-dev-db:
	docker compose -f docker-compose.dev.yml --env-file .env.dev up -d

down-dev-db:
	docker stop blog-db pgadmin4 redis-db redis-commander
	docker rm --volumes blog-db pgadmin4 redis-db redis-commander


# For running integration tests on local machine or github workflow
up-test-db:
	docker compose -f docker-compose.test-int.yml --env-file .env.test up -d

down-test-db:
	docker stop notes-db_test-int pgadmin4_test-int
	docker rm --volumes notes-db_test-int pgadmin4_test-int