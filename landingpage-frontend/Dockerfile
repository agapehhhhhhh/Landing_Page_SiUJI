   # ===========================================
# SIUJI FRONTEND - VUE.JS DOCKERFILE
# ===========================================

# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ===========================================

# Builder stage (untuk build production files)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev dependencies needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build aplikasi untuk production
RUN npm run build

# ===========================================

# Production stage (serve static files dengan Node.js)
FROM node:20-alpine AS production

WORKDIR /app

# Install serve untuk static file serving
RUN npm install -g serve

# Copy built files dari builder stage
COPY --from=builder /app/dist ./dist

# Expose port untuk production
EXPOSE 5173

# Serve static files
CMD ["serve", "-s", "dist", "-l", "5173"]