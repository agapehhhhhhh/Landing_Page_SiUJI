# landingpage-frontend/Dockerfile

# --- Tahap 1: Build Stage ---
# Menggunakan Node.js untuk build aplikasi Vue
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code aplikasi
COPY . .

# Build aplikasi Vue untuk produksi
# Vite (sesuai vite.config.js) biasanya menggunakan 'npm run build'
RUN npm run build

# --- Tahap 2: Production Stage ---
# Menggunakan Nginx untuk menyajikan file statis hasil build
FROM nginx:stable-alpine

# Copy hasil build dari tahap sebelumnya ke direktori root Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Ketika container dijalankan, Nginx akan otomatis menyajikan file dari /usr/share/nginx/html