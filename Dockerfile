FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install mongodb
RUN apk add --no-cache mongodb-tools

# Install Express framework
RUN npm install express

COPY . .


CMD ["node", "Mongodb.js","mongod"]
