# 🎨 SIUJI Frontend - Vue.js Application

Frontend application untuk SIUJI Landing Page menggunakan Vue.js 3 dan Vite.

## 🛠️ **Tech Stack**

- **Vue.js 3** - Progressive JavaScript framework
- **Vite 7** - Next generation frontend tooling  
- **Axios** - HTTP client untuk API communication
- **TypeScript** - Type-safe development (optional)

## 📁 **Project Structure**

```
src/
├── components/           # Reusable Vue components
│   ├── sections/        # Landing page sections
│   │   ├── HeroSection.vue
│   │   ├── FeaturesSection.vue
│   │   ├── TestimonialsSection.vue
│   │   ├── FAQSection.vue
│   │   └── FooterSection.vue
│   └── icons/           # Icon components
├── services/            # API service layer
│   └── payloadService.js
├── assets/             # Static assets
├── App.vue             # Main application component
└── main.js             # Application entry point
```

## 🚀 **Development**

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Variables**
```bash
# .env.local (untuk development lokal)
VITE_API_URL=http://localhost:3000/api
```

## 🔗 **API Integration**

Frontend menggunakan Axios untuk komunikasi dengan Payload CMS backend:

```javascript
// services/payloadService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const payloadService = {
  // Fetch semua data landing page
  async getLandingPageData() {
    const response = await axios.get(`${API_BASE_URL}/landing-page-aggregate`);
    return response.data;
  },
  
  // Fetch specific collections
  async getHeroSection() {
    const response = await axios.get(`${API_BASE_URL}/hero-section`);
    return response.data;
  }
};
```

## 🎨 **Components**

### **Section Components**
Setiap section di landing page adalah komponen Vue terpisah yang mengambil data dari API:

```vue
<!-- HeroSection.vue -->
<template>
  <section class="hero">
    <h1>{{ heroData.title }}</h1>
    <p>{{ heroData.subtitle }}</p>
    <a :href="heroData.ctaLink" class="cta-button">
      {{ heroData.ctaText }}
    </a>
  </section>
</template>

<script>
import { payloadService } from '@/services/payloadService';

export default {
  name: 'HeroSection',
  data() {
    return {
      heroData: {}
    };
  },
  async mounted() {
    this.heroData = await payloadService.getHeroSection();
  }
};
</script>
```

## 🐳 **Docker**

### **Development Mode**
```dockerfile
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### **Production Mode**
```dockerfile
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

## 📦 **Build & Deployment**

### **Production Build**
```bash
# Build static assets
npm run build

# Output akan ada di folder 'dist/'
# Siap untuk deploy ke static hosting
```

### **Docker Build**
```bash
# Development
docker build --target development -t siuji-frontend:dev .

# Production
docker build --target production -t siuji-frontend:prod .
```

## 🔧 **Configuration**

### **Vite Configuration** (`vite.config.js`)
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
});
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🎯 **Features**

- ✅ **Hot Module Replacement** - Instant development feedback
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Component-based Architecture** - Reusable components
- ✅ **API Integration** - Dynamic content dari CMS
- ✅ **Production Ready** - Optimized builds
- ✅ **Docker Support** - Containerized deployment

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Vite dev server tidak bisa diakses dari luar container**
```bash
# Pastikan --host 0.0.0.0 flag ada di dev script
npm run dev -- --host 0.0.0.0
```

#### **API calls gagal**
```bash
# Cek environment variable VITE_API_URL
echo $VITE_API_URL

# Pastikan backend service running di port 3000
curl http://localhost:3000/api
```

#### **Build gagal**
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

---

**Happy Coding! 🎉**

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
