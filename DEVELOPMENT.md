# 🔧 SIUJI - Development Guide

Panduan development lengkap untuk SIUJI Landing Page Platform.

## 🚀 **Quick Setup**

### **1. Persiapan Environment**
```bash
# Clone repository
git clone <repository-url>
cd siuji-landingpage

# Copy environment template
cp .env.example .env

# Edit .env jika diperlukan (opsional untuk development)
```

### **2. Start dengan Docker (Recommended)**
```bash
# Build dan start semua services
docker-compose up --build

# Atau background mode
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### **3. Access Points**
- 🎨 **Frontend**: http://localhost:5173
- ⚙️ **Admin Panel**: http://localhost:3000/admin  
- 🏠 **Backend API**: http://localhost:3000/api
- 🐘 **Database**: localhost:5432

### **4. First Time Setup**
1. Buka admin panel: http://localhost:3000/admin
2. Buat admin user pertama
3. Login dan mulai mengelola content

---

## 🎯 **Development Workflow**

### **Typical Development Flow**
```bash
# 1. Start development environment
docker-compose up

# 2. Make changes ke code
# - Frontend: landingpage-frontend/src/
# - Backend: landingpage-cms/src/

# 3. Changes akan auto-reload
# - Frontend: Hot Module Replacement
# - Backend: Next.js hot reload

# 4. Test changes di browser
# 5. Commit changes
```

### **Working dengan Collections**
```bash
# 1. Edit collection schema
# File: landingpage-cms/src/collections/NamaCollection.ts

# 2. Server akan auto-restart
# 3. Database schema akan auto-update
# 4. TypeScript types akan regenerate

# 5. Update frontend components jika perlu
# File: landingpage-frontend/src/components/sections/
```

---

## 🔧 **Local Development (Tanpa Docker)**

### **Prerequisites**
- Node.js 20+
- PNPM (recommended) atau NPM
- PostgreSQL 15+

### **Database Setup**
```bash
# Install PostgreSQL
# Windows: Download dari postgresql.org
# Mac: brew install postgresql
# Linux: apt install postgresql

# Create database
createdb siuji_db

# Set DATABASE_URI di .env
DATABASE_URI=postgresql://username:password@localhost:5432/siuji_db
```

### **Backend Setup**
```bash
cd landingpage-cms

# Install dependencies
pnpm install

# Generate types
pnpm generate:types

# Start development server
pnpm dev
```

### **Frontend Setup**
```bash
cd landingpage-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🐛 **Troubleshooting Guide**

### **Docker Issues**

#### **Port sudah digunakan**
```bash
# Cek port yang digunakan
netstat -tulpn | grep :3000
netstat -tulpn | grep :5173

# Stop service yang menggunakan port
sudo kill -9 <PID>

# Atau ubah port di docker-compose.yml
```

#### **Container build error**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild tanpa cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs backend
docker-compose logs frontend
```

#### **Volume permission issues**
```bash
# Fix permissions (Linux/Mac)
sudo chown -R $USER:$USER ./landingpage-cms/node_modules
sudo chown -R $USER:$USER ./landingpage-frontend/node_modules
```

### **Database Issues**

#### **Connection failed**
```bash
# Test database connection
docker-compose exec db psql -U user -d siuji_db -c "SELECT 1;"

# Check database logs
docker-compose logs db

# Reset database
docker-compose down -v
docker-compose up db
```

#### **Migration errors**
```bash
# Reset Payload database
docker-compose exec backend pnpm payload migrate

# Or manual reset
docker-compose exec db psql -U user -d siuji_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

### **Frontend Issues**

#### **Vite crypto.hash error**
```bash
# Pastikan menggunakan Node.js 20+
node --version

# Clear node_modules
rm -rf landingpage-frontend/node_modules
docker-compose build --no-cache frontend
```

#### **API connection failed**
```bash
# Check environment variable
echo $VITE_API_URL

# Test API endpoint
curl http://localhost:3000/api

# Check CORS settings di backend
```

### **Backend Issues**

#### **Payload secret error**
```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update .env
PAYLOAD_SECRET=<generated-secret>
```

#### **TypeScript errors**
```bash
cd landingpage-cms

# Regenerate types
pnpm generate:types

# Clear Next.js cache
rm -rf .next

# Restart development server
pnpm dev
```

---

## 📋 **Environment Variables Reference**

### **Development (.env)**
```bash
# Environment
NODE_ENV=development
DOCKER_TARGET=development

# Database
DATABASE_URI=postgresql://user:password@db:5432/siuji_db
DB_USER=user
DB_PASSWORD=password
DB_NAME=siuji_db
DB_PORT_EXPOSE=5432

# Payload CMS
PAYLOAD_SECRET=K8mN9pQ2rS5tV7wX0yZ3bC6dF9gH2jK5mN8pQ1rS4tV7wX0yZ3bC6dF9gH2jK5mN

# Frontend
VITE_API_URL=http://localhost:3000/api

# Security
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CSRF_ORIGINS=http://localhost:5173
```

### **Production (.env)**
```bash
# Environment
NODE_ENV=production
DOCKER_TARGET=production

# Database (production)
DATABASE_URI=postgresql://prod_user:strong_password@db:5432/siuji_prod
DB_USER=prod_user
DB_PASSWORD=strong_password
DB_NAME=siuji_prod
# DB_PORT_EXPOSE=  # Comment out untuk production

# Payload CMS (production)
PAYLOAD_SECRET=production-secret-64-chars-minimum-length-for-security

# Frontend (production)
VITE_API_URL=https://your-domain.com/api

# Security (production)
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
CSRF_ORIGINS=https://your-domain.com
```

---

## 🚀 **Deployment Guide**

### **Development ke Production**
```bash
# 1. Update .env untuk production
# Uncomment production settings
# Comment development settings

# 2. Build production images
docker-compose build --no-cache

# 3. Start production
docker-compose up -d

# 4. Verify
curl https://your-domain.com/api
curl https://your-domain.com
```

### **Environment Switching**
```bash
# Ke Development
# Edit .env:
NODE_ENV=development
DOCKER_TARGET=development
# ... development settings

# Ke Production  
# Edit .env:
NODE_ENV=production
DOCKER_TARGET=production
# ... production settings

# Restart containers
docker-compose down
docker-compose up --build
```

---

## 📝 **Code Style & Best Practices**

### **TypeScript**
- Gunakan strict TypeScript di semua files
- Define interfaces untuk semua data structures
- Gunakan type guards untuk runtime validation

### **Vue.js Components**
```vue
<!-- Good: Composition API dengan TypeScript -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HeroSection } from '@/types';

const heroData = ref<HeroSection | null>(null);

onMounted(async () => {
  // Load data
});
</script>
```

### **Payload Collections**
```typescript
// Good: Typed collection dengan validation
export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'isActive']
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    }
  ]
};
```

### **Git Workflow**
```bash
# Conventional commits
git commit -m "feat(frontend): add testimonials section"
git commit -m "fix(backend): resolve CORS issue"
git commit -m "docs(readme): update deployment guide"
```

---

## 🧪 **Testing**

### **Backend Testing**
```bash
cd landingpage-cms

# Integration tests
pnpm test:int

# E2E tests
pnpm test:e2e

# Watch mode
pnpm test:int --watch
```

### **Frontend Testing (Future)**
```bash
cd landingpage-frontend

# Unit tests
npm test

# E2E tests
npm run test:e2e
```

---

## 📚 **Useful Commands**

### **Docker Commands**
```bash
# View running containers
docker-compose ps

# Shell into container
docker-compose exec backend sh
docker-compose exec frontend sh

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart specific service
docker-compose restart backend

# Remove everything
docker-compose down -v --remove-orphans
```

### **Database Commands**
```bash
# Connect to database
docker-compose exec db psql -U user -d siuji_db

# Backup database
docker-compose exec db pg_dump -U user siuji_db > backup.sql

# Restore database
docker-compose exec -T db psql -U user -d siuji_db < backup.sql
```

### **Payload Commands**
```bash
# Generate TypeScript types
docker-compose exec backend pnpm generate:types

# Generate import map
docker-compose exec backend pnpm generate:importmap

# Run migrations
docker-compose exec backend pnpm payload migrate
```

---

**Happy Development! 🎉**
