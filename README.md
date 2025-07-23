# 🚀 SIUJI - Landing Page Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)
![Payload](https://img.shields.io/badge/payload-3.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-ready-blue.svg)

**SIUJI** adalah platform ujian online modern dengan landing page yang dibangun menggunakan **Payload CMS** (backend) dan **Vue.js** (frontend). Platform ini menyediakan sistem manajemen konten yang lengkap untuk mengelola landing page dengan fitur-fitur seperti Hero Section, FAQ, Testimonials, Pricing Plans, dan banyak lagi.

## ✨ **Fitur Utama**

- 🎨 **Landing Page Dinamis** - Konten dapat dikelola melalui CMS
- 📱 **Responsive Design** - Optimized untuk semua device
- 🔒 **Authentication System** - User management dengan Payload CMS
- 📊 **Rich Content Management** - Support untuk rich text, media upload, dan lainnya
- 🚀 **Fast Development** - Hot reload untuk development
- 🐳 **Docker Ready** - Containerized untuk easy deployment
- 📈 **SEO Friendly** - Optimized untuk search engines
- 🎯 **TypeScript Support** - Type safety untuk better development experience

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
git clone https://github.com/agapehhhhhhh/Landing_Page_SiUJI.git
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
# Backend (CMS): http://localhost:3000/admin
# Database: localhost:5432
```

### **🚀 Production Mode**
```bash
# Start production environment
npm run prod

# Access aplikasi:
# Frontend: http://localhost:8080
# Backend: http://localhost:3000/admin
```

### **📊 Seed Data (Optional)**
```bash
# Seed initial data untuk demo
npm run seed

# Atau menggunakan script khusus
# Linux/macOS:
./scripts/seed-data.sh

# Windows:
scripts\seed-data.bat
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

### **🐳 Docker Commands**
```bash
npm run dev                 # Start development environment
npm run dev:detached        # Start in background
npm run dev:down           # Stop development environment
npm run dev:logs           # View logs
npm run dev:clean          # Clean up containers and volumes
```

### **🚀 Production Commands**
```bash
npm run prod               # Start production environment
npm run prod:detached      # Start production in background
npm run prod:down          # Stop production environment
```

### **⚙️ Setup & Utility Commands**
```bash
npm run setup              # Run setup script (interactive)
npm run setup:bash         # Run bash setup script (Linux/macOS)
npm run setup:windows      # Run Windows batch setup script
npm run setup:cms          # Install backend dependencies only
npm run setup:frontend     # Install frontend dependencies only
npm run generate:secret    # Generate Payload secret key
npm run health             # Check container status
```

### **🌱 Data Seeding Commands**
```bash
npm run seed               # Seed initial data for demo
./scripts/seed-data.sh     # Linux/macOS seeding script
scripts\seed-data.bat      # Windows seeding script
```

### **🔍 Monitoring Commands**
```bash
npm run logs:cms           # View CMS logs only
npm run logs:frontend      # View frontend logs only
npm run logs:db            # View database logs only
npm run dev:logs           # View all development logs
```

### **🧪 Testing Commands**
```bash
npm run test               # Run all tests
npm run test:cms           # Run backend tests only
npm run test:frontend      # Run frontend tests only
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

### **3. Database Management**
```bash
# Access database
docker exec -it siuji-postgres-db-dev psql -U siuji_user -d siuji_db

# Run migrations (if needed)
docker exec -it siuji-backend-cms-dev npm run payload migrate
```

### **4. Data Seeding**

Platform SIUJI menyediakan sistem seeding untuk mengisi database dengan data demo yang lengkap.

#### **Automatic Seeding (Production)**
Dalam environment production, data akan otomatis di-seed saat container pertama kali dijalankan melalui entrypoint script.

#### **Manual Seeding (Development)**
```bash
# Method 1: Using npm scripts (Recommended)
npm run seed

# Method 2: Using convenience scripts
# Linux/macOS:
./scripts/seed-data.sh

# Windows:
scripts\seed-data.bat

# Method 3: Direct container execution
docker-compose -f docker-compose.dev.yml exec backend npm run seed
```

#### **🔍 Seeded Content:**
Seeding process akan mengisi database dengan data berikut:
- **Hero Section** - Content utama landing page
- **Features** - Fitur-fitur platform SIUJI  
- **About Section** - Informasi tentang platform
- **FAQ** - Frequently Asked Questions dengan rich text answers
- **Contact Information** - Data kontak dan informasi
- **Testimonials** - Testimoni pengguna
- **Pricing Plans** - Paket berlangganan (Basic, Pro, Enterprise)
- **Platform Availability** - Informasi ketersediaan platform
- **Partners** - Data mitra dan partner
- **Why Choose Section** - Alasan memilih SIUJI

#### **Troubleshooting Seeding**
Jika mengalami masalah saat seeding:
```bash
# Reset database dan restart
npm run dev:clean
npm run dev
npm run seed

# Check seeding logs
docker-compose -f docker-compose.dev.yml logs backend
```

### **5. Debugging**
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
│   │   │   ├── AboutSection.ts          # About section content
│   │   │   ├── ContactSection.ts        # Contact information  
│   │   │   ├── Features.ts              # Platform features
│   │   │   ├── FrequentlyAskedQuestion.ts  # FAQ management
│   │   │   ├── HeroSection.ts           # Hero section content
│   │   │   ├── LandingPageContent.ts    # Main landing page
│   │   │   ├── Media.ts                 # File/image management
│   │   │   ├── Partners.ts              # Business partners
│   │   │   ├── PlatformAvailability.ts  # Platform info
│   │   │   ├── PricingPlans.ts          # Subscription plans
│   │   │   ├── Testimonials.ts          # User testimonials
│   │   │   ├── Users.ts                 # User management
│   │   │   └── WhyChooseSection.ts      # Why choose us
│   │   ├── 📁 seeds/            # Database seeding
│   │   │   ├── seedLandingPage.ts       # Main seeding script
│   │   │   └── seedLandingPageCollections.ts  # Collection data
│   │   ├── 📁 app/             # Next.js app router
│   │   │   ├── (frontend)/     # Frontend routes
│   │   │   └── (payload)/      # CMS admin routes
│   │   ├── payload.config.ts    # Payload configuration
│   │   └── payload-types.ts     # TypeScript definitions
│   ├── 📁 tests/               # Test files
│   │   ├── e2e/               # End-to-end tests
│   │   └── int/               # Integration tests
│   ├── Dockerfile              # Production build
│   └── package.json            # Dependencies & scripts
├── 📁 landingpage-frontend/     # Vue.js Frontend
│   ├── 📁 src/                  # Source code
│   │   ├── 📁 components/       # Vue components
│   │   │   ├── common/         # Shared components
│   │   │   └── sections/       # Landing page sections
│   │   ├── 📁 composables/     # Vue composables
│   │   ├── 📁 services/        # API services
│   │   ├── 📁 views/           # Vue pages
│   │   ├── 📁 assets/          # Static assets
│   │   └── main.js             # Entry point
│   ├── 📁 public/              # Public static files
│   ├── Dockerfile              # Production build
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Dependencies & scripts
├── 📁 scripts/                 # Utility scripts
│   ├── seed-data.sh           # Linux/macOS seeding
│   └── seed-data.bat          # Windows seeding
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose
├── .env.example               # Environment template
├── package.json               # Root package.json
└── README.md                  # Documentation
```

---

## 🔐 **Environment Variables**

### **Required Variables**
```env
# Database Configuration
POSTGRES_DB=siuji_db
POSTGRES_USER=siuji_user  
POSTGRES_PASSWORD=your-secure-password

# PayloadCMS Configuration
PAYLOAD_SECRET=your-32-character-secret-here
SERVER_URL=http://localhost:3000

# Database Connection (Docker Internal)
DATABASE_URI=postgres://siuji_user:your-secure-password@db:5432/siuji_db

# Optional Configuration
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
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

# Check database connection
docker-compose -f docker-compose.dev.yml exec db psql -U siuji_user -d siuji_db -c "SELECT 1;"

# Restart database
docker-compose -f docker-compose.dev.yml restart db

# Check database logs
docker-compose -f docker-compose.dev.yml logs db
```

#### **2. Port Already in Use**
```bash
# Check which process is using the port (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Check ports (Linux/macOS)
lsof -i :3000
lsof -i :5173

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Linux/macOS)
kill -9 <PID>
```

#### **3. Docker Build Issues**
```bash
# Clean Docker cache and rebuild
npm run dev:clean
docker system prune -a
npm run dev

# Check Docker resources
docker system df

# Remove unused images
docker image prune -a
```

#### **4. Node Modules Issues**
```bash
# Clean and reinstall (Linux/macOS)
rm -rf landingpage-*/node_modules
rm -rf landingpage-*/package-lock.json
npm run setup

# Clean and reinstall (Windows)
rmdir /s /q landingpage-cms\node_modules
rmdir /s /q landingpage-frontend\node_modules
del landingpage-cms\package-lock.json
del landingpage-frontend\package-lock.json
npm run setup
```

#### **5. Seeding Issues**
```bash
# Reset database and reseed
npm run dev:clean
npm run dev
npm run seed

# Check seeding logs
docker-compose -f docker-compose.dev.yml logs backend

# Manual seeding with verbose logs
docker-compose -f docker-compose.dev.yml exec backend npm run seed
```

#### **6. Environment Variables Issues**
```bash
# Check if .env file exists
ls -la .env

# Validate environment variables
docker-compose -f docker-compose.dev.yml config

# Generate new Payload secret
npm run generate:secret
```

### **Performance Tips**

#### **Development Performance**
```bash
# Use detached mode for background running
npm run dev:detached

# Check container resource usage
docker stats

# Optimize Docker memory usage
# Add to Docker Desktop settings: Memory limit 4GB+
```

#### **Build Performance**
```bash
# Enable Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1  # Linux/macOS
set DOCKER_BUILDKIT=1     # Windows

# Use multi-stage builds (already implemented in Dockerfiles)
# Cache node_modules between builds
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

### **🐳 Docker Production Deployment**
```bash
# Clone repository
git clone https://github.com/agapehhhhhhh/Landing_Page_SiUJI.git
cd Landing_Page_SiUJI

# Setup production environment
cp .env.example .env
# Edit .env dengan production values

# Build dan start production
npm run prod

# Check deployment
npm run health
```

### **🔧 Manual Production Deployment**

#### **Backend (CMS)**
```bash
cd landingpage-cms
npm ci --only=production
npm run build
npm start
```

#### **Frontend**
```bash
cd landingpage-frontend  
npm ci --only=production
npm run build

# Serve dengan nginx atau static server
# Serve folder dist/ pada port 80/443
```

### **☁️ Cloud Deployment Options**

#### **Docker-based Platforms**
- **Heroku**: Deploy dengan Heroku Container Registry
- **DigitalOcean App Platform**: Deploy dari Docker Hub
- **AWS ECS**: Container orchestration
- **Google Cloud Run**: Serverless containers

#### **Traditional Hosting**
- **VPS/Dedicated Server**: Dengan Docker Compose
- **AWS EC2**: Custom deployment
- **DigitalOcean Droplets**: Manual setup

### **📋 Production Checklist**

```bash
# ✅ Pre-deployment
[ ] Environment variables configured
[ ] Database production ready
[ ] SSL certificates installed
[ ] Domain DNS configured
[ ] Backup strategy implemented

# ✅ Security
[ ] Remove development secrets
[ ] Enable HTTPS only
[ ] Configure CORS properly
[ ] Set secure headers
[ ] Enable rate limiting

# ✅ Performance
[ ] Enable compression
[ ] Configure CDN (if needed)
[ ] Optimize images
[ ] Enable caching
[ ] Monitor resource usage

# ✅ Monitoring
[ ] Health checks configured
[ ] Logging system setup
[ ] Error tracking enabled
[ ] Performance monitoring
[ ] Backup verification
```

### **🔐 Production Environment Variables**
```env
# Production configuration
NODE_ENV=production
DATABASE_URI=postgres://user:pass@production-host:5432/siuji_prod
PAYLOAD_SECRET=your-super-secure-production-secret-32chars
SERVER_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Security
COOKIE_SECURE=true
CORS_ORIGIN=https://yourdomain.com
```

---

## 🛠️ **Tech Stack**

### **Frontend (landingpage-frontend)**
- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS3 with modern features, responsive design
- **HTTP Client**: Axios for API communication
- **Animations**: Lottie for smooth animations
- **Icons**: Custom SVG icons and assets

### **Backend (landingpage-cms)**
- **CMS Framework**: Payload CMS 3.x
- **Runtime**: Node.js 20+ with ES modules
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript for type safety
- **Database ORM**: Built-in Payload database layer
- **Authentication**: Payload Auth with JWT

### **Database**
- **Primary Database**: PostgreSQL 15
- **Connection**: Native PostgreSQL adapter
- **Features**: ACID compliance, JSON support, full-text search

### **DevOps & Deployment**
- **Containerization**: Docker & Docker Compose
- **Development**: Hot reload for both frontend and backend
- **Production**: Multi-stage builds for optimization
- **Environment**: Environment-based configuration
- **Health Checks**: Container health monitoring

### **Development Tools**
- **Code Quality**: ESLint, Prettier
- **Testing**: Vitest (frontend), Playwright (E2E)
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Pre-commit hooks for code quality
- **Documentation**: Auto-generated API docs

---

## 📚 **Documentation & API**

### **📖 Additional Documentation**
- **[Vue.js 3 Guide](https://vuejs.org/guide/)** - Frontend framework documentation
- **[Payload CMS Docs](https://payloadcms.com/docs)** - CMS documentation
- **[Docker Guide](https://docs.docker.com/get-started/)** - Container platform documentation
- **[PostgreSQL Manual](https://www.postgresql.org/docs/)** - Database documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript documentation

### **🔌 API Endpoints**

#### **Public API Endpoints (No Auth Required)**
```bash
# Landing Page Content
GET /api/landing-page-content    # Get main landing page data
GET /api/hero-section           # Get hero section content
GET /api/features               # Get platform features
GET /api/about-section          # Get about section content
GET /api/faq                    # Get FAQ entries
GET /api/testimonials           # Get user testimonials
GET /api/pricing-plans          # Get subscription plans
GET /api/partners               # Get business partners
GET /api/why-choose-section     # Get why choose us content
GET /api/platform-availability  # Get platform info
GET /api/contact-section        # Get contact information
```

#### **Media & Assets**
```bash
GET /api/media                  # Get uploaded media files
GET /api/media/:id              # Get specific media file
```

#### **Admin API Endpoints (Auth Required)**
```bash
# Authentication
POST /api/users/login           # User login
POST /api/users/logout          # User logout
POST /api/users/refresh-token   # Refresh JWT token

# Content Management (CRUD operations for all collections)
GET    /api/:collection         # List items
POST   /api/:collection         # Create item
GET    /api/:collection/:id     # Get specific item
PATCH  /api/:collection/:id     # Update item
DELETE /api/:collection/:id     # Delete item
```

#### **API Usage Examples**
```javascript
// Frontend Service Example (payloadService.js)
export class PayloadService {
  static async getLandingPageContent() {
    const response = await fetch(`${API_BASE}/api/landing-page-content`);
    return await response.json();
  }
  
  static async getFAQ() {
    const response = await fetch(`${API_BASE}/api/faq`);
    return await response.json();
  }
}
```

### **🔍 GraphQL API**

Payload CMS juga menyediakan GraphQL endpoint untuk query yang lebih fleksibel:

```bash
# GraphQL Endpoint
POST /api/graphql               # GraphQL queries and mutations

# GraphQL Playground (Development only)
GET /api/graphql-playground     # Interactive GraphQL explorer
```

#### **GraphQL Query Examples**
```graphql
# Get all FAQ entries with specific fields
query GetFAQ {
  FAQ {
    docs {
      id
      question
      answer
      category
      isActive
    }
  }
}

# Get landing page with nested relations
query GetLandingPage {
  LandingPageContent {
    docs {
      id
      title
      hero {
        title
        subtitle
      }
      features {
        title
        description
      }
    }
  }
}
```

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

## 👥 **Support & Community**

### **📞 Getting Help**

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. **📖 Check Documentation** - Baca dokumentasi lengkap di atas
2. **🔍 Search Issues** - Cari masalah serupa di [GitHub Issues](https://github.com/agapehhhhhhh/Landing_Page_SiUJI/issues)
3. **🐛 Report Bugs** - Buat [issue baru](https://github.com/agapehhhhhhh/Landing_Page_SiUJI/issues/new) dengan detail lengkap
4. **💡 Feature Requests** - Suggest fitur baru melalui GitHub Issues
5. **📧 Contact Team** - Hubungi tim development untuk support khusus

### **🤝 Contributing Guidelines**

Kami sangat welcome kontribusi dari komunitas! Silakan ikuti panduan berikut:

#### **Development Process**
1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes dengan conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request dengan deskripsi yang detail

#### **Code Style & Standards**
- Gunakan ESLint dan Prettier untuk formatting
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests untuk fitur baru
- Update documentation jika diperlukan

#### **Areas for Contribution**
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🧪 Test coverage
- 🎨 UI/UX enhancements
- 🚀 Performance optimizations

### **📚 Additional Resources**

- **[Vue.js 3 Guide](https://vuejs.org/guide/)** - Frontend framework documentation
- **[Payload CMS Docs](https://payloadcms.com/docs)** - CMS documentation
- **[Docker Guide](https://docs.docker.com/get-started/)** - Container platform documentation
- **[PostgreSQL Manual](https://www.postgresql.org/docs/)** - Database documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript documentation

### **🏆 Contributors**

Terima kasih kepada semua kontributor yang telah membantu mengembangkan SIUJI Landing Page Platform!

<!-- Add contributor list here when available -->

### **📄 Changelog**

Untuk melihat perubahan detail di setiap versi, silakan check [CHANGELOG.md](./CHANGELOG.md) atau [GitHub Releases](https://github.com/agapehhhhhhh/Landing_Page_SiUJI/releases).

---

## 🎯 **Roadmap**

### **🚀 Version 1.1 (Current)**
- [x] Basic landing page with CMS
- [x] User authentication system
- [x] Rich text content management
- [x] Media upload functionality
- [x] Database seeding system
- [x] Docker containerization
- [x] Responsive design

### **🔄 Version 1.2 (In Progress)**
- [ ] Enhanced FAQ system with categories
- [ ] Advanced testimonials management
- [ ] Partner logo management
- [ ] Contact form functionality
- [ ] Newsletter subscription
- [ ] Basic analytics integration

### **📈 Version 1.3 (Planned)**
- [ ] Unit testing coverage (>80%)
- [ ] E2E testing with Playwright
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Image optimization
- [ ] Caching implementation

### **🌍 Version 1.4 (Future)**
- [ ] Internationalization (i18n) support
- [ ] Multi-language content management
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Progressive Web App (PWA)
- [ ] Mobile app support

### **🔮 Version 2.0 (Vision)**
- [ ] Microservices architecture
- [ ] Real-time collaboration
- [ ] Advanced user roles and permissions
- [ ] API rate limiting
- [ ] Advanced security features
- [ ] Kubernetes deployment

---

**Happy Coding! 🎉**
