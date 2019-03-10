FROM node:10.15.3

ENV INSTALL_PATH /usr/src/nuvem42

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN yarn install --production=true

RUN npm install pm2 -g

COPY . .