# landingpage-frontend/Dockerfile.dev - Untuk Development

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (termasuk devDependencies)
RUN npm install

# Copy source code
COPY . .

# Expose port untuk Vite
EXPOSE 5173

# Command untuk development dengan hot reload
CMD ["npm", "run", "dev"]