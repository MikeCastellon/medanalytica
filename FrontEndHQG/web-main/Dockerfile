# Specify a base image
FROM node:18-alpine3.17 as builder

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build


# Stage 2
FROM nginx:1.17.1-alpine as production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

