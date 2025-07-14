# ===========================================
# SIUJI BACKEND - PAYLOAD CMS DOCKERFILE
# ===========================================

# Base stage untuk dependencies
FROM node:18-alpine AS base

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# ===========================================

# Development stage
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]

# ===========================================

# Builder stage
FROM base AS builder

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build aplikasi
RUN pnpm run build

# ===========================================

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm and curl (untuk health check)
RUN npm install -g pnpm && \
    apk add --no-cache curl

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --prod --no-frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check untuk monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api || exit 1

# Start aplikasi
CMD ["pnpm", "start"]
