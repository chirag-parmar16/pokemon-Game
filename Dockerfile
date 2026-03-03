FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx","-y","serve","-s","dist","-l","tcp://0.0.0.0:3000"]