# Setup

docker network create trackmyfit_network

# Running

Database:
docker compose -f docker-compose.yml -f docker-compose.db.yml up

Frontend:
docker compose -f docker-compose.yml -f docker-compose.frontend.yml up

Backend:
docker compose -f docker-compose.yml -f docker-compose.db.yml -f docker-compose.backend.yml up
docker compose -f docker-compose.backend.yml up

Full stack:
docker compose -f docker-compose.yml -f docker-compose.db.yml -f docker-compose.frontend.yml -f docker-compose.backend.yml up
