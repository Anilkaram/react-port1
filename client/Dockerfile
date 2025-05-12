FROM node:20-alpine3.20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as Production
COPY --from=builder /app/build /usr/share/nginx/html
RUN npm install --production
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]