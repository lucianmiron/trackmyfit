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

## K8S

### Google cloud engine setup

gcloud init

gcloud config configurations create trackmyfit

gcloud config set project trackmyfit-459021

gcloud auth application-default login

gcloud artifacts repositories list

I got an error with account and then: gcloud config set account zisushd@gmail.com

gcloud auth configure-docker europe-central2-docker.pkg.dev

### Setting up with helm chart

kubectl create deployment activities --image=europe-central2-docker.pkg.dev/trackmyfit-459021/activities/production --dry-run=client -o yaml > deployment.yaml

Create the deployment with helm
helm install trackmyfit .

docker pull europe-central2-docker.pkg.dev/trackmyfit-459021/activities/production

kubectl create secret docker-registry gcr-json-key --docker-server=europe-central2-docker.pkg.dev --docker-username=\_json_key --docker-password="$(cat ./<>)" --docker-email=<>

kubectl create secret docker-registry gcr-json-key --docker-server=europe-central2-docker.pkg.dev --docker-username=\_json_key --docker-password="$(type <>)" --docker-email=<>

kubectl describe serviceaccount default
kubectl patch serviceaccount default -p "{\"imagePullSecrets\": [{\"name\": \"gcr-json-key\"}]}"
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'
kubectl rollout restart deployment activities

(utility)
kubectl describe po <pod>
kubectl logs <pod>

helm upgrade trackmyfit . -> will add new deployments or env variables

(open 2 ports on this service)
kubectl create service clusterip auth --tcp=3002,3003 --dry-run=client -o yaml > service.yaml

### Dealing with env variables
kubectl create secret generic postgres --from-literal=<key>(e.g. host)=<value>(e.g. blabla)

kubectl get secret postgres-password -o jsonpath='{.data.password}' | base64 -d

### Creating the services

kubectl create service clusterip auth --tcp=3002 --dry-run=client -o yaml > service.yaml
delete status and creationTimestamp

kubectl create service nodeport activities --tcp=3001 --dry-run=client -o yaml > service.yaml
# Google cloud services

Artifacts Registry

# Postgres

Local port 5432
