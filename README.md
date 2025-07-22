# 🚀 SIUJI - Landing Page Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![Payload](https://img.shields.io/badge/payload-3.x-blue.svg)

**SIUJI** adalah platform landing page modern yang dibangun dengan **Payload CMS** (backend) dan **Vue.js** (frontend). Platform ini dirancang untuk kemudahan pengembangan dan deployment dengan Docker.

---

## 🏗️ **Arsitektur**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Vue.js        │────│  Payload CMS    │────│   PostgreSQL    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
│   Port: 5173    │    │   Port: 3000    │    │   Port: 5432    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## ⚡ **Quick Start**

### **🔧 Development Mode (Recommended)**
```bash
# 1. Clone repository
git clone <repository-url>
cd Landing_Page_SiUJI

# 2. Setup environment variables
cp .env.example .env

# 3. Generate Payload secret
npm run generate:secret

# 4. Update .env file dengan secret yang dihasilkan

# 5. Start development dengan Docker
npm run dev

# 6. Access aplikasi:
# Frontend: http://localhost:5173
# Backend(CMS): http://localhost:3000/admin
```

### **🚀 Production Mode**
```bash
# Start production environment
npm run prod

# Access aplikasi:
# Frontend: http://localhost:8080
# Backend: http://localhost:3000/admin
```

---

## 📋 **Prerequisites**

### **Option 1: Docker (Recommended)**
- [Docker Desktop](https://www.docker.com/products/docker-desktop) atau Docker Engine
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git

### **Option 2: Local Development**
- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- Git

---

## 🛠️ **Development Setup**

### **Step 1: Clone Repository**
```bash
git clone <repository-url>
cd Landing_Page_SiUJI
```

### **Step 2: Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Generate Payload secret key
npm run generate:secret
```

**Edit `.env` file:**
```env
# Database Configuration
POSTGRES_DB=siuji_db
POSTGRES_USER=siuji_user
POSTGRES_PASSWORD=your-secure-password

# PayloadCMS Configuration
PAYLOAD_SECRET=your-32-character-secret-key-here
SERVER_URL=http://localhost:3000
```

### **Step 3: Start Development**

#### **🐳 With Docker (Recommended)**
```bash
# Start all services with hot reload
npm run dev

# Start in background
npm run dev:detached

# View logs
npm run dev:logs

# Stop services
npm run dev:down
```

#### **💻 Local Development (Alternative)**
```bash
# Terminal 2: Start backend
cd landingpage-cms
npm install
npm run dev

# Terminal 3: Start frontend
cd landingpage-frontend
npm install
npm run dev
```

### **Step 4: Access Applications**

| Service | Development | Production |
|---------|-------------|------------|
| **Frontend** | http://localhost:5173 | http://localhost:8080 |
| **Backend Admin** | http://localhost:3000/admin | http://localhost:3000/admin |
| **Backend API** | http://localhost:3000/api | http://localhost:3000/api |
| **Database** | localhost:5432 | localhost:5432 |

---

## 📊 **Available Commands**

### **Development Commands**
```bash
npm run dev                 # Start development environment
npm run dev:detached        # Start in background
npm run dev:down           # Stop development environment
npm run dev:logs           # View logs
npm run dev:clean          # Clean up containers and volumes
```

### **Production Commands**
```bash
npm run prod               # Start production environment
npm run prod:detached      # Start production in background
npm run prod:down          # Stop production environment
```

### **Utility Commands**
```bash
npm run generate:secret    # Generate Payload secret key
npm run setup              # Install dependencies for both projects
npm run setup:cms          # Install backend dependencies only
npm run setup:frontend     # Install frontend dependencies only
```

---

## 🔧 **Development Workflow**

### **1. Making Changes**
- **Frontend**: Edit files in `landingpage-frontend/src/`
- **Backend**: Edit files in `landingpage-cms/src/`
- Changes akan otomatis ter-reload (hot reload)

### **2. Database Management**
```bash
# Access database
docker exec -it siuji-postgres-db-dev psql -U siuji_user -d siuji_db

# Run migrations (if needed)
docker exec -it siuji-backend-cms-dev npm run payload migrate

# Seed data
docker exec -it siuji-backend-cms-dev npm run seed
```

### **3. Debugging**
```bash
# View all logs
docker-compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f db
```

### **4. Testing**
```bash
# Frontend tests
cd landingpage-frontend
npm run test

# Backend tests
cd landingpage-cms
npm run test

# E2E tests
cd landingpage-cms
npm run test:e2e
```

---

## 📁 **Project Structure**

```
Landing_Page_SiUJI/
├── 📁 landingpage-cms/          # Payload CMS Backend
│   ├── 📁 src/                  # Source code
│   │   ├── 📁 collections/      # Database collections
│   │   ├── 📁 app/             # Next.js app router
│   │   └── payload.config.ts    # Payload configuration
│   ├── Dockerfile              # Production build
│   ├── Dockerfile.dev          # Development build
│   └── package.json
├── 📁 landingpage-frontend/     # Vue.js Frontend
│   ├── 📁 src/                  # Source code
│   │   ├── 📁 components/       # Vue components
│   │   ├── 📁 views/           # Vue pages
│   │   └── main.js             # Entry point
│   ├── Dockerfile              # Production build
│   ├── Dockerfile.dev          # Development build
│   └── package.json
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose
├── .env.example               # Environment template
└── README.md                  # Documentation
```

---

## 🔐 **Environment Variables**

### **Required Variables**
```env
# Database
POSTGRES_DB=siuji_db
POSTGRES_USER=siuji_user
POSTGRES_PASSWORD=your-secure-password

# Payload CMS
PAYLOAD_SECRET=your-32-character-secret-here
SERVER_URL=http://localhost:3000

# Optional
NODE_ENV=development
```

### **Generate Payload Secret**
```bash
# Method 1: NPM Script (Recommended)
npm run generate:secret

# Method 2: Node.js
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Method 3: OpenSSL
openssl rand -hex 16

# Method 4: PowerShell (Windows)
-join ((1..32) | ForEach {'{0:X}' -f (Get-Random -Max 16)})
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **1. Database Connection Error**
```bash
# Check if database is running
docker ps | grep postgres

# Restart database
docker-compose -f docker-compose.dev.yml restart db

# Check database logs
docker-compose -f docker-compose.dev.yml logs db
```

#### **2. Port Already in Use**
```bash
# Check which process is using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Linux/Mac)
kill -9 <PID>
```

#### **3. Docker Build Issues**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
npm run dev:clean
npm run dev
```

#### **4. Node Modules Issues**
```bash
# Clean and reinstall
rm -rf landingpage-*/node_modules
rm -rf landingpage-*/package-lock.json
npm run setup
```

---

## 📝 **Development Guidelines**

### **Code Style**
- ESLint configured untuk consistency
- Prettier untuk code formatting
- TypeScript untuk type safety

### **Commit Convention**
```bash
# Format
type(scope): description

# Examples
feat(frontend): add hero section component
fix(backend): resolve database connection issue
docs(readme): update installation guide
style(frontend): format vue components
refactor(backend): optimize payload config
```

### **Branch Strategy**
```bash
# Feature development
git checkout -b feature/nama-fitur
git commit -m "feat: add new feature"
git push origin feature/nama-fitur

# Bug fixes
git checkout -b fix/nama-bug
git commit -m "fix: resolve issue"
git push origin fix/nama-bug
```

---

## 🚀 **Production Deployment**

### **Docker Production**
```bash
# Build production images
npm run prod

# Or with custom compose file
docker-compose -f docker-compose.prod.yml up --build
```

### **Manual Deployment**
```bash
# Backend
cd landingpage-cms
npm ci --only=production
npm run build
npm start

# Frontend
cd landingpage-frontend
npm ci --only=production
npm run build
# Serve dist/ folder with nginx or similar
```

### **Environment Variables (Production)**
```env
NODE_ENV=production
DATABASE_URI=postgres://user:pass@host:5432/db
PAYLOAD_SECRET=your-production-secret
SERVER_URL=https://yourdomain.com
```

---

## 📚 **Documentation**

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🤝 **Contributing**

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

---

## 📄 **License**

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👥 **Support**

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. **Check documentation** di atas
2. **Search issues** di repository ini
3. **Create new issue** dengan detail lengkap
4. **Join Discord/Slack** (jika ada)

---

## 🎯 **Roadmap**

- [ ] Add unit testing coverage
- [ ] Implement CI/CD pipeline
- [ ] Add internationalization (i18n)
- [ ] Performance optimization
- [ ] Mobile responsive improvements
- [ ] SEO optimization
- [ ] Analytics integration

---

**Happy Coding! 🎉**
