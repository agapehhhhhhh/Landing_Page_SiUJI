# Multi-stage Dockerfile for Vue.js frontend

# Development stage
FROM node:20-alpine AS development
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S vueuser -u 1001

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy source code and change ownership
COPY --chown=vueuser:nodejs . .

USER vueuser

EXPOSE 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install security updates
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx configuration
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Create non-root user for nginx
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginxuser -u 1001 -G nginx

# Change ownership of nginx directories
RUN chown -R nginxuser:nginx /usr/share/nginx/html && \
    chown -R nginxuser:nginx /var/cache/nginx && \
    chown -R nginxuser:nginx /var/log/nginx && \
    chown -R nginxuser:nginx /etc/nginx/conf.d

USER nginxuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
