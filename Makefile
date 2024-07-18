# For running db in container (while running api on local machine)
up-dev-db:
	docker compose -f docker-compose.dev.yml --env-file .env.dev up -d

down-dev-db:
	docker stop blog-db pgadmin redis-db redis-commander
	docker rm --volumes blog-db pgadmin redis-db redis-commander


# For running integration tests on local machine or github workflow
up-test-db:
	docker compose -f docker-compose.test-int.yml --env-file .env.test up -d

down-test-db:
	docker stop blog-db_test-int pgadmin_test-int redis-db_test-int redis-commander_test-int
	docker rm --volumes blog-db_test-int pgadmin_test-int redis-db_test-int redis-commander_test-int