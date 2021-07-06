FROM node:14.15.4-alpine

WORKDIR /usr/app

COPY package.json .

RUN yarn install

ADD . /usr/app

RUN yarn build

CMD [ "yarn", "start:dev" ]

EXPOSE 8080
