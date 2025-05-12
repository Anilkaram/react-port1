FROM node:20-alpine3.20 AS buildder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

FROM node:20-apline3.20 as Production
WORKDIR /app
COPY --from=builder /app/build ./
RUN npm install --production
COPY package*.json ./
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]
