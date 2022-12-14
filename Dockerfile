FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG PORT=80

ENV PORT=$PORT

EXPOSE $PORT

CMD [ "npm", "run", "start" ]