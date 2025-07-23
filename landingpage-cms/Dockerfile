# landingpage-cms/Dockerfile

# --- Tahap 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy file package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy sisa source code
COPY . .

# Build aplikasi Next.js/PayloadCMS
RUN npm run build

# --- Tahap 2: Produksi ---
FROM node:20-alpine

WORKDIR /app

# Install netcat untuk database health check
RUN apk add --no-cache netcat-openbsd

# Install hanya production dependencies
COPY package*.json ./
RUN npm ci --only=production --silent && npm cache clean --force

# Copy hasil build dari tahap builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Set entrypoint dan default command
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "start"]