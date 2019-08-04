FROM node:10.16.1-alpine

ENV INSTALL_PATH /usr/src/fileserver

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm install  --only=prod

RUN npm install -g sequelize-cli

RUN npm install pm2 -g

COPY . .