FROM node:18-alpine3.15
WORKDIR /web
ENV LANG=C.UTF-8 \
 TZ=Asia/Tokyo
COPY package.json yarn.lock ./
RUN apk update && \
  apk add git && \
  yarn --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000