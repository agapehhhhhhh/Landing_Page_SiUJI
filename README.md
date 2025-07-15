# 🚀 SIUJI - Landing Page Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)

**SIUJI** adalah platform landing page modern yang dibangun dengan teknologi terdepan untuk memberikan pengalaman pengguna yang luar biasa dan manajemen konten yang mudah.

---

## 📋 **Daftar Isi**

- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ Arsitektur Project](#-arsitektur-project)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Setup](#-environment-setup)
- [🐳 Docker Configuration](#-docker-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎨 Frontend Features](#-frontend-features)
- [🔧 Development](#-development)
- [🚀 Production Deployment](#-production-deployment)
- [🧪 Testing](#-testing)
- [📖 Collections Schema](#-collections-schema)
- [🤝 Contributing](#-contributing)

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Vue.js 3** - Progressive JavaScript framework
- **Vite 7** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client untuk API calls

### **Backend**
- **Next.js 15** - React framework untuk backend
- **Payload CMS 3** - Headless CMS dengan TypeScript
- **TypeScript** - Type-safe development
- **PostgreSQL** - Database relasional

### **Infrastructure**
- **Docker & Docker Compose** - Containerization
- **Node.js 20** - JavaScript runtime
- **PNPM** - Fast, disk space efficient package manager

---

## 🏗️ **Arsitektur Project**

```
siuji-landingpage/
├── 📁 landingpage-frontend/     # Vue.js Frontend Application
│   ├── src/
│   │   ├── components/          # Vue components
│   │   ├── sections/           # Landing page sections
│   │   └── services/           # API services
│   └── Dockerfile
├── 📁 landingpage-cms/         # Payload CMS Backend
│   ├── src/
│   │   ├── collections/        # CMS collections schema
│   │   ├── app/                # Next.js app
│   │   └── payload.config.ts   # Payload configuration
│   └── Dockerfile
├── 🐳 docker-compose.yml       # Docker orchestration
├── 📄 .env                     # Environment variables
└── 📖 README.md
```

---

## 🚀 **Quick Start**

### **Prasyarat**
- **Docker** & **Docker Compose** installed
- **Node.js 20+** (untuk development lokal)
- **Git** untuk version control

### **1. Clone Repository**
```bash
git clone <repository-url>
cd siuji-landingpage
```

### **2. Setup Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env sesuai kebutuhan (opsional untuk development)
```

### **3. Run dengan Docker**
```bash
# Start semua services
docker-compose up --build

# Atau run in background
docker-compose up -d --build
```

### **4. Access Applications**
- 🎨 **Frontend**: http://localhost:5173
- 🏠 **Backend API**: http://localhost:3000/api
- ⚙️ **Admin Panel**: http://localhost:3000/admin
- 🐘 **Database**: localhost:5432

---

## ⚙️ **Environment Setup**

### **📋 Quick Setup**

#### **1. Initial Setup**
```bash
# Copy environment template
cp .env.example .env
```

#### **2. Choose Your Environment**

##### **🐳 Docker Development (Recommended)**
```bash
# Edit .env file:
# 1. Uncomment "OPTION 1: DOCKER DATABASE" section
# 2. Comment out "OPTION 2: LOCAL DATABASE" section

# Example .env for Docker:
NODE_ENV=development
DOCKER_TARGET=development
DATABASE_URI=postgresql://user:password@db:5432/siuji_db
DB_USER=user
DB_PASSWORD=password
DB_NAME=siuji_db
DB_HOST=db
DB_PORT=5432
```

##### **💻 Local Development**
```bash
# Edit .env file:
# 1. Comment out "OPTION 1: DOCKER DATABASE" section  
# 2. Uncomment "OPTION 2: LOCAL DATABASE" section

# Example .env for Local:
NODE_ENV=development
DOCKER_TARGET=development
DATABASE_URI=postgresql://postgres:root@localhost:5432/landingpage-cms
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=landingpage-cms
DB_HOST=localhost
DB_PORT=5432
```

### **🔄 Environment Switching**

#### **Switch to Docker**
```bash
# 1. Edit .env - uncomment Docker database config
# 2. Comment out local database config
# 3. Start Docker
docker-compose up

# Access:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
# - Database: localhost:5432
```

#### **Switch to Local**
```bash
# 1. Edit .env - uncomment local database config
# 2. Comment out Docker database config
# 3. Start services manually
cd landingpage-cms && npm run dev     # Terminal 1
cd landingpage-frontend && npm run dev # Terminal 2

# Access:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
```

#### **Switch to Production**
```bash
# 1. Edit .env - uncomment production settings
# 2. Comment out development settings
# 3. Update production values
# 4. Deploy
docker-compose up --build
```

### **🛠️ Configuration Templates**

#### **Docker Template**
```bash
# Copy and paste to .env for Docker setup
NODE_ENV=development
DOCKER_TARGET=development
DATABASE_URI=postgresql://user:password@db:5432/siuji_db
DB_USER=user
DB_PASSWORD=password
DB_NAME=siuji_db
DB_HOST=db
DB_PORT=5432
DB_PORT_EXPOSE=5432
PAYLOAD_SECRET=K8mN9pQ2rS5tV7wX0yZ3bC6dF9gH2jK5mN8pQ1rS4tV7wX0yZ3bC6dF9gH2jK5mN
VITE_API_URL=http://localhost:3000/api
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CSRF_ORIGINS=http://localhost:5173
```

#### **Local Template**
```bash
# Copy and paste to .env for Local setup
NODE_ENV=development
DOCKER_TARGET=development
DATABASE_URI=postgresql://postgres:root@localhost:5432/landingpage-cms
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=landingpage-cms
DB_HOST=localhost
DB_PORT=5432
DB_PORT_EXPOSE=5432
PAYLOAD_SECRET=K8mN9pQ2rS5tV7wX0yZ3bC6dF9gH2jK5mN8pQ1rS4tV7wX0yZ3bC6dF9gH2jK5mN
VITE_API_URL=http://localhost:3000/api
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CSRF_ORIGINS=http://localhost:5173
```

#### **Production Template**
```bash
# Copy and paste to .env for Production setup
NODE_ENV=production
DOCKER_TARGET=production
DATABASE_URI=postgresql://prod_user:strong-password@db:5432/siuji_production
DB_USER=prod_user
DB_PASSWORD=strong-password
DB_NAME=siuji_production
DB_HOST=db
DB_PORT=5432
# DB_PORT_EXPOSE=     # Don't expose in production
PAYLOAD_SECRET=production-secret-64-chars-minimum-length-required
VITE_API_URL=https://your-domain.com/api
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
CSRF_ORIGINS=https://your-domain.com
```

### **🔐 Security Notes**

#### **Generate New Payload Secret**
```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### **Database Security**
- Use strong passwords in production
- Don't expose database ports in production
- Use environment variables for sensitive data

### **🚨 Troubleshooting**

#### **Common Issues**

##### **Port Already in Use**
```bash
# Kill processes using ports
netstat -tulpn | grep :3000
sudo kill -9 <PID>
```

##### **Database Connection Failed**
```bash
# Check database is running
docker-compose ps
# Or for local PostgreSQL
pg_isready -h localhost -p 5432
```

##### **Environment Variables Not Loading**
```bash
# Check .env file exists
ls -la .env

# Check variables are set
echo $DATABASE_URI
```

### **📝 Development Workflow**

#### **Daily Development**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Check environment
cat .env

# 3. Start development
docker-compose up    # Docker
# OR
npm run dev         # Local

# 4. Make changes
# Edit files in src/

# 5. Test changes
# Auto-reload with hot reload

# 6. Commit changes
git add .
git commit -m "feat: add new feature"
git push origin main
```

#### **Environment Switching Workflow**
```bash
# 1. Stop current services
docker-compose down   # Docker
# OR
Ctrl+C               # Local

# 2. Edit .env file
# Switch database configuration

# 3. Start services
docker-compose up     # Docker
# OR
npm run dev          # Local

# 4. Verify connection
curl http://localhost:3000/api
```

### **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `DOCKER_TARGET` | Docker build target | `development` |
| `DATABASE_URI` | PostgreSQL connection string | `postgresql://user:password@db:5432/siuji_db` |
| `PAYLOAD_SECRET` | Secret key untuk Payload CMS | Auto-generated |
| `VITE_API_URL` | Frontend API endpoint | `http://localhost:3000/api` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:5173,http://localhost:3000` |

---

## 🐳 **Docker Configuration**

### **Services Overview**

#### **Frontend Service**
- **Image**: Node.js 20 Alpine
- **Port**: 5173
- **Development**: Hot reload dengan Vite
- **Production**: Static files served dengan `serve`

#### **Backend Service**
- **Image**: Node.js 20 Alpine dengan PNPM
- **Port**: 3000
- **Development**: Hot reload dengan Next.js
- **Production**: Optimized build dengan security features

#### **Database Service**
- **Image**: PostgreSQL 15 Alpine
- **Port**: 5432 (exposed untuk development)
- **Health Check**: Built-in PostgreSQL health monitoring

### **Docker Commands**

```bash
# Build semua services
docker-compose build

# Start development
docker-compose up

# Start production
# (Edit .env untuk production settings)
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset dengan clean volumes
docker-compose down -v && docker-compose up --build
```

---

## 📚 **API Documentation**

### **Base URL**
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### **Main Endpoints**

#### **Landing Page Data**
```http
GET /api/landing-page-aggregate
```
Mengambil semua data landing page dalam satu request.

#### **Collections Endpoints**
```http
GET /api/hero-section          # Hero section data
GET /api/features              # Features list
GET /api/testimonials          # Customer testimonials
GET /api/faq                   # Frequently asked questions
GET /api/products              # Product information
GET /api/header                # Header configuration
GET /api/footer                # Footer configuration
```

#### **Admin Panel**
```http
GET /admin                     # Payload CMS admin interface
```

---

## 🎨 **Frontend Features**

### **Landing Page Sections**
- ✅ **Hero Section** - Main banner dengan CTA
- ✅ **Features Section** - Product features showcase
- ✅ **Products Section** - Product/service listings
- ✅ **Testimonials** - Customer reviews
- ✅ **FAQ Section** - Frequently asked questions
- ✅ **Why Choose Section** - Value propositions
- ✅ **CTA Section** - Call-to-action areas
- ✅ **Footer** - Site footer dengan links

### **Vue.js Components**
```
src/components/
├── sections/
│   ├── HeroSection.vue        # Main hero banner
│   ├── FeaturesSection.vue    # Features showcase
│   ├── TestimonialsSection.vue # Customer testimonials
│   ├── FAQSection.vue         # FAQ accordion
│   └── FooterSection.vue      # Site footer
└── services/
    └── payloadService.js      # API service layer
```

---

## 🔧 **Development**

### **Local Development (Tanpa Docker)**

#### **Backend Setup**
```bash
cd landingpage-cms
npm install
npm run dev
```

#### **Frontend Setup**
```bash
cd landingpage-frontend
npm install
npm run dev
```

#### **Database Setup**
```bash
# Jalankan PostgreSQL dengan Docker
docker run --name siuji-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine
```

### **Development Workflow**
1. **Edit collections** di `landingpage-cms/src/collections/`
2. **Update frontend components** di `landingpage-frontend/src/components/`
3. **Test changes** dengan hot reload
4. **Commit changes** dengan conventional commits

---

## 🚀 **Production Deployment**

### **Pre-deployment Checklist**
- [ ] Update production environment variables
- [ ] Set strong `PAYLOAD_SECRET`
- [ ] Configure production database
- [ ] Set proper CORS origins
- [ ] Update API URLs

### **Deployment Steps**
```bash
# 1. Set production environment
# Edit .env dan aktifkan production settings

# 2. Build production images
docker-compose build --no-cache

# 3. Start production services
docker-compose up -d

# 4. Verify deployment
curl http://localhost:3000/api/health
curl http://localhost:5173
```

### **Production Optimizations**
- ✅ Multi-stage Docker builds
- ✅ Non-root user untuk security
- ✅ Health checks untuk monitoring
- ✅ Optimized static assets
- ✅ Environment-based configuration

---

## 🧪 **Testing**

### **Backend Testing**
```bash
cd landingpage-cms

# Integration tests
pnpm test:int

# E2E tests
pnpm test:e2e

# All tests
pnpm test
```

### **Frontend Testing**
```bash
cd landingpage-frontend

# Unit tests (ketika tersedia)
npm test

# E2E tests (ketika tersedia)
npm run test:e2e
```

---

## 📖 **Collections Schema**

### **HeroSection**
```typescript
{
  title: string;           // Main headline
  subtitle: string;        // Supporting text
  ctaText: string;         // Button text
  ctaLink: string;         // Button URL
  backgroundImage: Media;  // Hero background
}
```

### **Features**
```typescript
{
  title: string;           // Feature title
  description: string;     // Feature description
  icon: Media;            // Feature icon
  order: number;          // Display order
}
```

### **Products**
```typescript
{
  name: string;           // Product name
  description: string;    // Product description
  price: number;          // Product price
  image: Media;          // Product image
  features: string[];     // Product features
}
```

### **Testimonials**
```typescript
{
  name: string;           // Customer name
  company: string;        // Customer company
  message: string;        // Testimonial text
  rating: number;         // Star rating (1-5)
  avatar: Media;         // Customer photo
}
```

---

## 🤝 **Contributing**

### **Development Guidelines**
1. **Follow TypeScript** best practices
2. **Use conventional commits** untuk commit messages
3. **Test your changes** sebelum commit
4. **Update documentation** jika diperlukan
5. **Follow code formatting** dengan ESLint/Prettier

### **Commit Message Format**
```
type(scope): description

feat(frontend): add new testimonials section
fix(backend): resolve CORS configuration issue
docs(readme): update deployment instructions
```

### **Pull Request Process**
1. Fork repository
2. Create feature branch
3. Make changes dengan tests
4. Submit pull request dengan description

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ **Support**

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. **Check documentation** di README ini
2. **Search existing issues** di repository
3. **Create new issue** dengan detail yang lengkap
4. **Contact team** untuk support urgent

---

## 🚀 **What's Next?**

### **Planned Features**
- [ ] Content scheduling
- [ ] Multi-language support
- [ ] Advanced SEO features
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Automated testing pipeline

---

**Happy Coding! 🎉**

*Built with ❤️ by SIUJI Team*
