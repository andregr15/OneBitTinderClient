FROM node:12.14.0-stretch

RUN apt-get update &&  \
    apt-get install -y git wget curl unzip build-essential gcc make && \
    yarn global add @vue/cli

RUN mkdir -p app

WORKDIR /app

COPY . .