# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose port
EXPOSE 5001

# Start backend
CMD ["node", "server.js"]
