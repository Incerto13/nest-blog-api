# Use the official PostgreSQL image
FROM postgres:latest


# Copy the custom configuration file into the container
COPY docker/postgres/postgresql.conf /etc/postgresql/postgresql.conf

# Set the command to use the custom configuration file
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

# Copy the seed.sql file into the Docker image
# The default entrypoint script of the Postgres image will handle running the SQL file
COPY docker/postgres/seed.sql /docker-entrypoint-initdb.d/
