# Use Node.js LTS version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy all application files
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
