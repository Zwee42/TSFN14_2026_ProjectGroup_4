# Use Node image
FROM node:20

# Create working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Expose backend port
EXPOSE 3000

# Start server
CMD ["npm", "run", "dev"]