FROM node:20-alpine AS build

WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json Frontend/.npmrc ./
RUN npm ci --legacy-peer-deps

COPY Frontend/ .
ENV CI=true
ENV GENERATE_SOURCEMAP=false
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
