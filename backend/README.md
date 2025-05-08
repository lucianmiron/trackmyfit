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

Running from backend/apps/activities folder
docker build -t activities -f Dockerfile ../../
docker tag activities europe-central2-docker.pkg.dev/trackmyfit-459021/activities/production
docker push europe-central2-docker.pkg.dev/trackmyfit-459021/activities/production

# Google cloud services

Artifacts Registry

# Postgres

Local port 5432
