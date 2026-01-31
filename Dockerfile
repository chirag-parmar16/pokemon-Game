FROM node:20-alpine

WORKDIR /app

# Install Package Manager if needed


# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Source
COPY . .

# Build (if needed)
RUN npm run build

# Expose Port
EXPOSE 3000

# Start Command
CMD ["npx","-y","serve","-s","dist","-l","3000"]