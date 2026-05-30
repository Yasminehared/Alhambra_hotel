FROM node:20-alpine AS build

WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json Frontend/.npmrc ./
RUN npm ci --legacy-peer-deps

COPY Frontend/ .
# Do not set CI=true — Create React App treats ESLint warnings as errors when CI is set
ENV CI=false
ENV GENERATE_SOURCEMAP=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
