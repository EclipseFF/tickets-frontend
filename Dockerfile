# Stage 1: Base image with necessary tools and dependencies
FROM node:18-alpine AS base

# Install build dependencies
RUN apk add --no-cache g++ make py3-pip libc6-compat

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Expose the port that the app will run on
EXPOSE 3000

# Stage 2: Builder to compile the application
FROM base AS builder

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production-ready image
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set the user to the newly created user
USER nextjs

# Copy built assets and production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Start the application
CMD ["npm", "start"]
