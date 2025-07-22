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

# Install hanya production dependencies
COPY package*.json ./
RUN npm ci --only=production --silent && npm cache clean --force

# Copy hasil build dari tahap builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]