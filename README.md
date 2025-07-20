# 🚀 SIUJI - Landing Page Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![Payload](https://img.shields.io/badge/payload-3.x-blue.svg)

**SIUJI** adalah platform landing page modern dengan Payload CMS dan Vue.js. Dioptimalkan untuk deployment yang mudah dan pengembangan yang cepat.

---

## 📋 **Quick Commands**

### **Development**
```bash
# 1. Copy environment file
cp .env.dev .env

# 2. Start development environment
npm run dev

# 3. View logs
npm run dev:logs

# 4. Stop services
npm run dev:down
```

### **Production**
```bash
# 1. Copy production environment file
cp .env.prod .env

# 2. Configure production values in .env
# 3. Start production environment
npm run prod
```

---

## 🏗️ **Arsitektur**

| Komponen | Teknologi | Port | URL |
|----------|-----------|------|-----|
| **Frontend** | Vue.js 3 + Vite | 5173 | http://localhost:5173 |
| **Backend** | Payload CMS + Next.js | 3000 | http://localhost:3000/api |
| **Admin Panel** | Payload CMS | 3000 | http://localhost:3000/admin |
| **Database** | PostgreSQL | 5432 | localhost:5432 |

```
siuji-landingpage/
├── 📁 landingpage-frontend/     # Vue.js Frontend
├── 📁 landingpage-cms/         # Payload CMS Backend  
├── 🐳 docker-compose.yaml      # Development orchestration
├── 🐳 docker-compose.prod.yml  # Production orchestration
├── 📄 .env.dev                 # Development environment
├── 📄 .env.prod                # Production template
└── 📖 README.md                # This file
```

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Vue.js 3** - Progressive framework
- **Vite 7** - Build tool
- **Axios** - HTTP client

### **Backend**
- **Payload CMS 3** - Headless CMS
- **Next.js 15** - React framework
- **PostgreSQL** - Database

### **Infrastructure**
- **Docker & Docker Compose** - Containerization
- **Node.js 20** - Runtime

---

## ⚙️ **Environment Setup**

### **Environment Files**
- `.env.dev` - Development configuration (safe defaults)
- `.env.prod` - Production template (requires setup)
- `.env.example` - Documentation template

### **Development Environment**
```bash
# 1. Copy development environment
cp .env.dev .env

# 2. Start development
npm run dev

# 3. Access services
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api  
# Admin Panel: http://localhost:3000/admin
```

### **Production Environment**
```bash
# 1. Copy production template
cp .env.prod .env

# 2. Configure required values:
# - DB_PASSWORD (strong password)
# - PAYLOAD_SECRET (32+ characters)
# - Domain URLs for production

# 3. Start production
npm run prod
```

---

## 🐳 **Docker Configuration**

### **Development (docker-compose.yaml)**
- Hot reloading enabled
- Volume mounting for live changes
- Development database with default credentials
- Optimized for local development

### **Production (docker-compose.prod.yml)**
- Multi-stage builds for optimization
- Production-ready configurations
- Health checks enabled
- Security-focused setup

### **Available Scripts**
```bash
# Development
npm run dev              # Start development environment
npm run dev:detached     # Start in background
npm run dev:logs         # View logs
npm run dev:down         # Stop services
npm run dev:clean        # Stop and remove volumes

# Production  
npm run prod             # Start production environment
npm run prod:detached    # Start in background
npm run prod:down        # Stop production services

# Maintenance
npm run setup            # Install dependencies
npm run seed             # Seed database with sample data
npm run test             # Run tests
```

---

## 🔧 **Development**

### **Prerequisites**
- Docker & Docker Compose
- Node.js 20+ (optional, for local development)
- Git

### **Getting Started**
```bash
# 1. Clone repository
git clone <repository-url>
cd Landing_Page_SiUJI

# 2. Start development environment
cp .env.dev .env
npm run dev

# 3. Wait for services to start (check logs)
npm run dev:logs

# 4. Access applications
# - Frontend: http://localhost:5173
# - Admin Panel: http://localhost:3000/admin
# - API: http://localhost:3000/api
```

### **Local Development (Without Docker)**
```bash
# 1. Install dependencies
npm run setup

# 2. Start PostgreSQL locally
# Configure .env with local database

# 3. Start services
cd landingpage-cms && npm run dev &
cd landingpage-frontend && npm run dev
```

### **Development Workflow**
1. **Frontend changes**: Edit files in `landingpage-frontend/src/` 
2. **Backend changes**: Edit files in `landingpage-cms/src/`
3. **CMS content**: Use admin panel at http://localhost:3000/admin
4. **Database**: Access via any PostgreSQL client at localhost:5432

---

## 🚀 **Production Deployment**

### **Docker Deployment**
```bash
# 1. Setup production environment
cp .env.prod .env
# Edit .env with production values

# 2. Deploy
npm run prod:detached

# 3. Verify deployment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml ps
```

### **Manual Deployment**
```bash
# 1. Build applications
cd landingpage-cms && npm run build
cd landingpage-frontend && npm run build

# 2. Setup production database
# 3. Configure production environment variables
# 4. Start applications with PM2 or similar
```

### **Environment Variables (Production)**
Required production environment variables:
```bash
# Database (Required)
DB_PASSWORD=your_secure_password_here

# Security (Required)  
PAYLOAD_SECRET=your_32_character_secret_key_here

# URLs (Required)
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
FRONTEND_URL=https://your-frontend-domain.com
API_URL=https://your-domain.com/api

# Optional: Email, S3, etc.
```

---

## 📖 **Collections Schema**

Payload CMS collections untuk mengelola konten landing page:

| Collection | Description | Fields |
|------------|-------------|---------|
| **HeroSection** | Main banner/header | title, subtitle, image, CTA |
| **Features** | Product features | title, description, icon |
| **AboutSection** | About company | content, images |
| **Testimonials** | Customer reviews | name, review, rating, photo |
| **FAQ** | Frequently asked questions | question, answer |
| **ContactSection** | Contact information | email, phone, address |
| **PricingPlans** | Pricing information | name, price, features |
| **Partners** | Partners/clients | name, logo, website |
| **Media** | File uploads | images, documents |
| **Users** | User management | admin users |

### **API Endpoints**
```
GET /api/hero-sections        # Hero content
GET /api/features            # Features list  
GET /api/testimonials        # Customer testimonials
GET /api/faqs                # FAQ list
GET /api/contact-sections    # Contact info
GET /api/pricing-plans       # Pricing data
```

---

## 🧪 **Testing**

```bash
# Run all tests
npm run test

# Run CMS tests only
npm run test:cms

# Run frontend tests only  
npm run test:frontend

# Run E2E tests
cd landingpage-cms && npm run test:e2e
```

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Check what's using the port
netstat -tulpn | grep :3000
# Kill the process or change port in .env
```

#### **Database Connection Issues**
```bash
# Check if PostgreSQL is running
docker-compose ps
# Check logs
npm run dev:logs
```

#### **Permission Issues (Windows)**
```bash
# Run PowerShell as Administrator
# Or enable Docker Desktop integration
```

#### **Build Failures**
```bash
# Clean rebuild
npm run dev:clean
npm run dev
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)  
5. Open Pull Request

### **Development Guidelines**
- Use TypeScript for type safety
- Follow Vue.js 3 Composition API patterns
- Write tests for new features
- Update documentation as needed

---

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 **Support**

- **Issues**: [GitHub Issues](https://github.com/your-username/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/your-repo/discussions)
- **Documentation**: This README file

---

**Made with ❤️ for modern web development**
