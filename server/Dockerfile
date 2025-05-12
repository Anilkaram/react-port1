# Stage 1: Build dependencies
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run app with a slim image
FROM node:18-slim

WORKDIR /app
COPY --from=build /app /app

EXPOSE 5000
CMD ["npm", "start"]
