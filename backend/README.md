# Nest

nest generate libray <name>
nest generate module <name> -p <project>
nest g resource <name>
nest g module/controller/service <name>
nest generate app my-microservice

# Docker

docker build ../../ -f Dockerfile -t sleepr_reservations
docker run sleepr_reservations

## Run and specify enviornment variables with docker compose (cli tool)

docker-compose up --build (forces build) --watch
docker-compose down -v (from volumes)

# Google cloud services

Artifacts Registry

# Postgres

Local port 5432
