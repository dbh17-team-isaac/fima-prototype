FROM node:7.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# NodeJS dependencies
COPY package.json /usr/src/app
RUN npm install

# Gulp run
RUN npm install -g gulp
COPY . /usr/src/app
RUN gulp

EXPOSE 3000 8080
CMD ["npm", "start"]

