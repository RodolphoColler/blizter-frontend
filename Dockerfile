FROM node:18.4.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV GENERATE_SOURCEMAP=false

CMD ["npm", "start"]
