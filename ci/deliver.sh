#!/usr/bin/env bash

source ./ci/compute-env.sh

sha="$(git rev-parse --short HEAD)"
details="$(git log --pretty=format:"%an, %ar : %s" -1)"

echo '{"version":"'"${VERSION}"'", "sha":"'"${sha}"'", "details":"'"${details}"'"}' > manifest.json

docker login "${CI_REGISTRY}" --username "${CI_REGISTRY_USER}" --password "${CI_REGISTRY_PASSWORD}"

docker buildx bake -f docker-compose-build.yml --push ${SERVICE_NAME}
docker tag "${CI_REGISTRY}/${IMAGE_NAME}:${VERSION}" "${CI_REGISTRY}/${IMAGE_NAME}:${VERSION_SHA}"
docker tag "${CI_REGISTRY}/${IMAGE_NAME}:${VERSION}" "${CI_REGISTRY}/${IMAGE_NAME}:latest"
docker push "${CI_REGISTRY}/${IMAGE_NAME}:${VERSION}"
docker push "${CI_REGISTRY}/${IMAGE_NAME}:${VERSION_SHA}"
docker push "${CI_REGISTRY}/${IMAGE_NAME}:latest"
