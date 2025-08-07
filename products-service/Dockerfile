# Use official Node.js LTS image
FROM node:20-alpine
ENV http_proxy=http://127.0.0.1:10808
ENV https_proxy=http://127.0.0.1:10808
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source
COPY . .

# Start the app
CMD ["node", "index.js"]