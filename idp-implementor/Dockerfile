FROM node:7.10.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --loglevel error

COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "start"]

