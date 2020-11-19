# api-handler

## Dockerfile

Stage 1. Base image to create api container

## Dockerfile2

Stage 2. Image to create api container.

---

## Deply

Deploy new image of `nhost/nodeapi`.

```
docker build -t nhost/nodeapi .
docker push nhost/nodeapi:latest
```
