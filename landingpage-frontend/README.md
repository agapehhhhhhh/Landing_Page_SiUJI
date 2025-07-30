# 🎨 SiUJI Frontend - Landing Page

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.5-4FC08D.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)

## 🚦 Build Status
[![Frontend CI](https://github.com/agapehhhhhhh/lp-siuji-fe/actions/workflows/ci.yml/badge.svg)](https://github.com/agapehhhhhhh/lp-siuji-fe/actions/workflows/ci.yml)
[![Deploy Frontend](https://github.com/agapehhhhhhh/lp-siuji-fe/actions/workflows/deploy.yml/badge.svg)](https://github.com/agapehhhhhhh/lp-siuji-fe/actions/workflows/deploy.yml)

**SiUJI Frontend** adalah aplikasi landing page modern yang dibangun dengan Vue.js 3 dan TypeScript untuk platform ujian online SiUJI. Aplikasi ini mengonsumsi API dari backend headless CMS untuk menampilkan konten dinamis.

---

## 📋 **Daftar Isi**

- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ Struktur Project](#-struktur-project)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Setup](#-environment-setup)
- [🐳 Docker Setup](#-docker-setup)
- [🎨 Features](#-features)
- [🔧 Development](#-development)
- [🚀 Production Deployment](#-production-deployment)
- [📱 Responsive Design](#-responsive-design)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)

---

## 🛠️ **Tech Stack**

### **Core Framework**
- **Vue.js 3.5** - Progressive JavaScript framework dengan Composition API
- **TypeScript 5.x** - Type-safe JavaScript untuk better development experience
- **Vite 6.x** - Next generation frontend build tool

### **Styling & UI**
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **PostCSS** - CSS post-processing
- **Autoprefixer** - Automatic vendor prefixing

### **State Management & Routing**
- **Pinia 2.x** - Modern state management untuk Vue.js
- **Vue Router 4.x** - Official router untuk Vue.js

### **HTTP Client & Utilities**
- **Axios** - Promise-based HTTP client
- **Swiper** - Modern touch slider

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework

---

## 🏗️ **Struktur Project**

```
siuji-frontend/
├── 📁 public/                  # Static assets
│   ├── favicon.ico
│   ├── logo-siuji.png
│   └── assets/
│       └── images/
├── 📁 src/
│   ├── 📁 components/          # Reusable Vue components
│   │   ├── sections/           # Landing page sections
│   │   ├── ui/                 # Base UI components
│   │   └── layout/             # Layout components
│   ├── 📁 views/               # Page views/routes
│   ├── 📁 services/            # API services
│   ├── 📁 stores/              # Pinia stores
│   ├── 📁 types/               # TypeScript type definitions
│   ├── 📁 composables/         # Vue composables
│   ├── 📁 assets/              # CSS, images, fonts
│   ├── 📄 main.ts              # Application entry point
│   └── 📄 App.vue              # Root component
├── 🐳 Dockerfile              # Production container
├── 🐳 Dockerfile.dev          # Development container
├── 🐳 docker-compose.yml      # Docker orchestration
├── ⚙️ vite.config.ts          # Vite configuration
├── ⚙️ tailwind.config.js      # Tailwind CSS config
├── ⚙️ tsconfig.json           # TypeScript config
├── 📦 package.json            # Dependencies
└── 📖 README.md
```

---

## 🚀 **Quick Start**

### **Prasyarat**
- **Node.js 18+** atau **Docker**
- **npm 8+** atau **yarn** atau **pnpm**
- **Git** untuk version control

### **1. Clone Repository**
```bash
git clone https://github.com/agapehhhhhhh/lp-siuji-fe.git
cd lp-siuji-fe
```

### **2. Install Dependencies**
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

### **3. Setup Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env sesuai konfigurasi backend Anda
```

### **4. Run Development Server**
```bash
# Start development server
npm run dev

# Aplikasi akan berjalan di http://localhost:5173
```

---

## ⚙️ **Environment Setup**

### **Environment Variables**

Buat file `.env` di root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_CMS_URL=http://localhost:3001

# Application Configuration
VITE_APP_NAME=SiUJI
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Platform Ujian Online Modern

# Development Configuration
VITE_DEV_HOST=0.0.0.0
VITE_DEV_PORT=5173

# Build Configuration
VITE_OUTDIR=dist
VITE_BASE_PATH=/

# Feature Flags (Optional)
VITE_ENABLE_PWA=false
VITE_ENABLE_ANALYTICS=false
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### **Environment Templates**

#### **Development**
```bash
# Development with local backend
VITE_API_BASE_URL=http://localhost:3001/api
VITE_CMS_URL=http://localhost:3001
```

#### **Production**
```bash
# Production with deployed backend
VITE_API_BASE_URL=https://api.siuji.com/api
VITE_CMS_URL=https://cms.siuji.com
```

#### **Staging**
```bash
# Staging environment
VITE_API_BASE_URL=https://staging-api.siuji.com/api
VITE_CMS_URL=https://staging-cms.siuji.com
```

---

## 🐳 **Docker Setup**

### **Development dengan Docker**

```bash
# Build and run development container
docker-compose up --build

# Atau run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Production Build**

```bash
# Build production image
docker build -t siuji-frontend .

# Run production container
docker run -p 8080:8080 siuji-frontend
```

### **Docker Configuration**

#### **Dockerfile (Production)**
```dockerfile
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### **docker-compose.yml**
```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=${VITE_API_BASE_URL}
      - VITE_CMS_URL=${VITE_CMS_URL}
    volumes:
      - .:/app
      - /app/node_modules
```

---

## 🎨 **Features**

### **Landing Page Sections**
- ✅ **Hero Section** - Main banner dengan call-to-action
- ✅ **About Section** - Tentang platform SiUJI
- ✅ **Features Section** - Fitur-fitur unggulan platform
- ✅ **Why Choose Section** - Alasan memilih SiUJI
- ✅ **Testimonials** - Testimoni pengguna
- ✅ **FAQ Section** - Pertanyaan yang sering diajukan
- ✅ **Pricing Plans** - Paket harga berlangganan
- ✅ **Partners Section** - Mitra dan klien
- ✅ **Contact Section** - Informasi kontak
- ✅ **Footer** - Footer dengan navigasi dan informasi

### **Core Features**
- 🔄 **Dynamic Content** - Konten diambil dari headless CMS
- 📱 **Responsive Design** - Optimized untuk semua device
- ⚡ **Fast Loading** - Optimized dengan Vite dan lazy loading
- 🎨 **Modern UI/UX** - Clean dan modern design
- 🔍 **SEO Optimized** - Meta tags dan structured data
- ♿ **Accessibility** - WCAG compliance
- 🌙 **Dark Mode Ready** - Support untuk dark mode (opsional)

### **Technical Features**
- 📦 **Component-Based** - Reusable Vue components
- 🔧 **Type Safety** - Full TypeScript support
- 🗂️ **State Management** - Centralized state dengan Pinia
- 🔗 **API Integration** - Clean API service layer
- 🧪 **Testing Ready** - Unit testing dengan Vitest
- 🐳 **Docker Ready** - Containerized deployment

---

## 🔧 **Development**

### **Development Commands**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

### **API Service Layer**

```typescript
// src/services/api.ts
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const siujiApi = {
  // Get all landing page data
  async getLandingPageData() {
    const response = await apiClient.get('/landing-page-aggregate')
    return response.data
  },

  // Get hero section
  async getHeroSection() {
    const response = await apiClient.get('/hero-section')
    return response.data.docs[0]
  },

  // Get features
  async getFeatures() {
    const response = await apiClient.get('/features?where[isActive][equals]=true&sort=order')
    return response.data.docs
  },

  // Get testimonials
  async getTestimonials() {
    const response = await apiClient.get('/testimonials?where[isActive][equals]=true&sort=-createdAt')
    return response.data.docs
  },

  // Get FAQ
  async getFAQ() {
    const response = await apiClient.get('/faq?where[isActive][equals]=true&sort=order')
    return response.data.docs
  },

  // Get pricing plans
  async getPricingPlans() {
    const response = await apiClient.get('/pricing-plans?where[isActive][equals]=true&sort=order')
    return response.data.docs
  }
}
```

### **Vue Composables**

```typescript
// src/composables/useLandingPage.ts
import { ref, onMounted } from 'vue'
import { siujiApi } from '@/services/api'

export function useLandingPage() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<any>(null)

  const fetchLandingPageData = async () => {
    try {
      loading.value = true
      error.value = null
      data.value = await siujiApi.getLandingPageData()
    } catch (err) {
      error.value = 'Failed to fetch landing page data'
      console.error('Error fetching landing page data:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchLandingPageData()
  })

  return {
    loading,
    error,
    data,
    refetch: fetchLandingPageData
  }
}
```

### **Component Structure**

```vue
<!-- src/components/sections/HeroSection.vue -->
<template>
  <section class="hero-section">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="loading-skeleton">
        Loading...
      </div>
      <div v-else-if="heroData" class="hero-content">
        <h1 class="text-4xl md:text-6xl font-bold text-center">
          {{ heroData.title }}
        </h1>
        <p class="text-xl text-center mt-4">
          {{ heroData.subtitle }}
        </p>
        <div class="text-center mt-8">
          <a 
            :href="heroData.ctaUrl" 
            class="btn btn-primary"
          >
            {{ heroData.ctaText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHeroSection } from '@/composables/useHeroSection'

const { heroData, loading, error } = useHeroSection()
</script>
```

---

## 🚀 **Production Deployment**

### **Build for Production**

```bash
# Create production build
npm run build

# Test production build locally
npm run preview
```

### **Static Hosting**

#### **Vercel**
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### **Netlify**
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### **Docker Production**

```bash
# Build production image
docker build -t siuji-frontend:latest .

# Run with environment variables
docker run -d \
  -p 80:80 \
  -e VITE_API_BASE_URL=https://api.siuji.com/api \
  siuji-frontend:latest
```

---

## 📱 **Responsive Design**

### **Breakpoints (Tailwind CSS)**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop small
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Desktop large
    }
  }
}
```

### **Responsive Classes**

```vue
<template>
  <!-- Mobile first approach -->
  <div class="
    grid grid-cols-1      
    md:grid-cols-2        
    lg:grid-cols-3        
    xl:grid-cols-4        
    gap-4 p-4
  ">
    <!-- Content -->
  </div>
</template>
```

---

## 🧪 **Testing**

### **Unit Testing**

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### **Test Example**

```typescript
// src/components/__tests__/HeroSection.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/sections/HeroSection.vue'

// Mock API
vi.mock('@/services/api', () => ({
  siujiApi: {
    getHeroSection: vi.fn().mockResolvedValue({
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      ctaText: 'Test CTA',
      ctaUrl: '/test'
    })
  }
}))

describe('HeroSection', () => {
  it('renders hero content correctly', async () => {
    const wrapper = mount(HeroSection)
    
    // Wait for async data loading
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('h1').text()).toBe('Test Title')
    expect(wrapper.find('p').text()).toBe('Test Subtitle')
    expect(wrapper.find('a').text()).toBe('Test CTA')
  })
})
```

### **E2E Testing Setup**

```bash
# Install Playwright (optional)
npm install -D @playwright/test

# Run E2E tests
npm run test:e2e
```

---

## 🤝 **Contributing**

### **Development Guidelines**

1. **Code Style**
   - Follow ESLint dan Prettier configuration
   - Gunakan TypeScript untuk type safety
   - Gunakan Composition API untuk Vue components

2. **Component Guidelines**
   - Satu component per file
   - Gunakan PascalCase untuk component names
   - Props dan emits harus di-type dengan TypeScript

3. **Commit Messages**
   ```
   feat(component): add new testimonials section
   fix(api): handle error in hero section data fetch
   docs(readme): update deployment instructions
   style(ui): improve mobile responsive design
   ```

### **Pull Request Process**

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes dan test
4. Commit dengan conventional commits
5. Push ke fork: `git push origin feature/new-feature`
6. Create Pull Request dengan deskripsi yang jelas

### **Local Development Setup**

```bash
# Fork dan clone repository
git clone https://github.com/your-username/lp-siuji-fe.git
cd lp-siuji-fe

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
npm run dev

# Make changes, test, dan commit
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ **Support & Contact**

### **Documentation**
- 📖 **README**: Complete setup dan development guide
- 🔗 **API Docs**: [Backend API Documentation](https://github.com/agapehhhhhhh/lp-siuji-be)

### **Community**
- 🐛 **Issues**: [GitHub Issues](https://github.com/agapehhhhhhh/lp-siuji-fe/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/agapehhhhhhh/lp-siuji-fe/discussions)

### **Getting Help**

1. **Check existing documentation** dalam README
2. **Search existing issues** di GitHub
3. **Create new issue** dengan detail lengkap
4. **Join discussions** untuk pertanyaan umum

---

## 🚀 **Roadmap**

### **Current Features (v1.0)**
- ✅ Landing page sections (Hero, Features, Testimonials, etc.)
- ✅ Responsive design
- ✅ API integration dengan backend
- ✅ Docker deployment
- ✅ TypeScript support

### **Upcoming Features (v1.1)**
- [ ] 🌙 Dark mode support
- [ ] 🔍 Advanced SEO optimization
- [ ] 📊 Google Analytics integration
- [ ] 🚀 Performance optimizations
- [ ] ♿ Accessibility improvements

### **Future Features (v2.0)**
- [ ] 🌐 Multi-language support (i18n)
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🎨 Theme customization
- [ ] 📈 Advanced analytics dashboard
- [ ] 🔄 Real-time content updates

---

**Happy Coding! 🎉**

*Built with ❤️ for SiUJI Platform*

---

## 📊 **Performance Metrics**

- ⚡ **First Contentful Paint**: < 1.5s
- 🎯 **Largest Contentful Paint**: < 2.5s
- 📐 **Cumulative Layout Shift**: < 0.1
- 🔄 **First Input Delay**: < 100ms
- 🏆 **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)

*Terus berusaha memberikan pengalaman terbaik untuk pengguna!*
