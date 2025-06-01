# Dockerfile

# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port (adjust if different)
EXPOSE 5002

# Start the app
CMD ["node", "app.js"]
