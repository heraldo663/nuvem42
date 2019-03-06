FROM node:10.15.1

ENV INSTALL_PATH /usr/src/nuvem42

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm install  --only=prod

RUN sudo apt-get install yarn

RUN npm install pm2 -g

COPY . .