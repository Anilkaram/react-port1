FROM node:20-alpine3.20 as build
WORKDIR /app
COPY *.json ./
RUN npm install express mysql2 cors
COPY . .

FROM build as test
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
