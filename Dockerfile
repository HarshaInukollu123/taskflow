# Example base Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/ .
RUN npm install
CMD ["npm", "start"]
