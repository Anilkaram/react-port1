FROM node:20-alpine3.20 as build
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . .
RUN npm run build

FROM build as test
RUN npm install --production
COPY . . 
EXPOSE 3000
CMD ["npm", "start"]
