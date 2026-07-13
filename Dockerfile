# syntax=docker/dockerfile:1

ARG NODE_IMAGE_TAG=20-alpine
ARG NGINX_IMAGE_TAG=1.27-alpine

# Stage ui build
FROM node:${NODE_IMAGE_TAG} AS ui-build
WORKDIR /app
COPY aristochat-ui/package.json aristochat-ui/package-lock.json ./
RUN npm ci
COPY aristochat-ui/ ./
COPY manifest.json ./manifest.json
RUN npm run build:docker

# Stage ui run
FROM nginx:${NGINX_IMAGE_TAG} AS ui
COPY --from=ui-build /app/build /usr/share/nginx/html
COPY --from=ui-build /app/manifest.json /usr/share/nginx/html/manifest.json
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY .docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g","daemon off;" ]
