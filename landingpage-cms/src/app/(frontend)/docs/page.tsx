import React from 'react'
import './docs.css'

export default function DocumentationPage() {
  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>📚 Feezy School CMS Documentation</h1>
        <p className="docs-subtitle">
          Comprehensive guide untuk mengelola konten landing page Feezy School
        </p>
      </div>

      <div className="docs-content">
        {/* Overview Section */}
        <section className="docs-section">
          <h2>🎯 Overview</h2>
          <p>
            Feezy School CMS dibangun menggunakan Payload CMS dengan arsitektur modular 
            yang memungkinkan pengelolaan konten landing page secara fleksibel dan terstruktur.
          </p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🔧 Modular Architecture</h3>
              <p>Setiap section memiliki collection terpisah untuk kemudahan maintenance</p>
            </div>
            <div className="feature-card">
              <h3>📱 API-First</h3>
              <p>RESTful API endpoints untuk integrasi dengan frontend Vue.js</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Type Safety</h3>
              <p>Auto-generated TypeScript interfaces untuk development yang aman</p>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="docs-section">
          <h2>📋 Collections Structure</h2>
          
          <div className="collection-list">
            <div className="collection-item">
              <h3>🌐 Global Settings (landing-page)</h3>
              <p><strong>Purpose:</strong> Pengaturan global website, SEO, contact info, footer</p>
              <p><strong>API:</strong> <code>GET /api/landing-page</code></p>
              <p><strong>Use Case:</strong> Site title, meta description, social media links, contact information</p>
            </div>

            <div className="collection-item">
              <h3>🎭 Hero Section (hero-section)</h3>
              <p><strong>Purpose:</strong> Konten hero/banner utama landing page</p>
              <p><strong>API:</strong> <code>GET /api/hero-section</code></p>
              <p><strong>Fields:</strong> Slogan, CTA buttons, background image, mockup app</p>
            </div>

            <div className="collection-item">
              <h3>⭐ Features (features)</h3>
              <p><strong>Purpose:</strong> Daftar fitur-fitur utama Feezy School</p>
              <p><strong>API:</strong> <code>GET /api/features</code></p>
              <p><strong>Fields:</strong> Title, description, icon, order, isActive</p>
            </div>

            <div className="collection-item">
              <h3>🤔 Why Choose (why-choose)</h3>
              <p><strong>Purpose:</strong> Keunggulan untuk parents dan schools</p>
              <p><strong>API:</strong> <code>GET /api/why-choose</code></p>
              <p><strong>Fields:</strong> Benefits untuk parents, benefits untuk schools</p>
            </div>

            <div className="collection-item">
              <h3>📝 How It Works (how-it-works)</h3>
              <p><strong>Purpose:</strong> Step-by-step cara menggunakan Feezy School</p>
              <p><strong>API:</strong> <code>GET /api/how-it-works</code></p>
              <p><strong>Fields:</strong> Step, description, icon, order</p>
            </div>

            <div className="collection-item">
              <h3>💬 Testimonials (testimonials)</h3>
              <p><strong>Purpose:</strong> Review dan testimonial dari users</p>
              <p><strong>API:</strong> <code>GET /api/testimonials</code></p>
              <p><strong>Fields:</strong> Name, role, testimonial, rating, avatar</p>
            </div>

            <div className="collection-item">
              <h3>❓ FAQ (faq)</h3>
              <p><strong>Purpose:</strong> Frequently Asked Questions</p>
              <p><strong>API:</strong> <code>GET /api/faq</code></p>
              <p><strong>Fields:</strong> Question, answer, order</p>
            </div>
          </div>
        </section>

        {/* API Usage Section */}
        <section className="docs-section">
          <h2>🔌 API Usage</h2>
          
          <div className="api-section">
            <h3>Basic API Calls</h3>
            <div className="code-block">
              <pre><code>{`// Get all features (active only)
GET /api/features?where[isActive][equals]=true&sort=order

// Get single hero section
GET /api/hero-section?limit=1

// Get testimonials with limit
GET /api/testimonials?where[isActive][equals]=true&limit=5`}</code></pre>
            </div>

            <h3>Frontend Integration (Vue.js)</h3>
            <div className="code-block">
              <pre><code>{`// services/payloadService.js
async fetchLandingPageData() {
  const [hero, features, testimonials] = await Promise.all([
    axios.get('/api/hero-section?limit=1'),
    axios.get('/api/features?where[isActive][equals]=true&sort=order'),
    axios.get('/api/testimonials?where[isActive][equals]=true&limit=10')
  ])
  
  return {
    hero: hero.data.docs[0],
    features: features.data.docs,
    testimonials: testimonials.data.docs
  }
}`}</code></pre>
            </div>
          </div>
        </section>

        {/* Admin Guide Section */}
        <section className="docs-section">
          <h2>👨‍💼 Admin Panel Guide</h2>
          
          <div className="admin-guide">
            <h3>📍 Navigation</h3>
            <ul>
              <li><strong>Global Settings:</strong> Untuk pengaturan umum website</li>
              <li><strong>Landing Page Sections:</strong> Semua section konten tergroup</li>
              <li><strong>Media:</strong> Manajemen file upload (images, icons)</li>
              <li><strong>Users:</strong> Manajemen user admin</li>
            </ul>

            <h3>✏️ Content Management Best Practices</h3>
            <ul>
              <li><strong>Order Field:</strong> Gunakan kelipatan 10 (10, 20, 30) untuk mudah reorder</li>
              <li><strong>isActive Field:</strong> Uncheck untuk hide content tanpa delete</li>
              <li><strong>Images:</strong> Upload ke Media collection dulu, baru pilih di field</li>
              <li><strong>Preview:</strong> Gunakan frontend untuk preview changes</li>
            </ul>

            <h3>🔄 Workflow</h3>
            <ol>
              <li>Edit content di admin panel</li>
              <li>Save changes</li>
              <li>Frontend otomatis fetch data terbaru</li>
              <li>No deployment needed untuk content changes</li>
            </ol>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="docs-section">
          <h2>🛠️ Troubleshooting</h2>
          
          <div className="troubleshooting">
            <h3>Common Issues</h3>
            
            <div className="issue-item">
              <h4>❌ Frontend tidak tampil data baru</h4>
              <p><strong>Solution:</strong> Refresh browser atau check browser console untuk errors</p>
            </div>

            <div className="issue-item">
              <h4>❌ Upload gambar gagal</h4>
              <p><strong>Solution:</strong> Check file size (max 5MB) dan format (JPG, PNG, SVG)</p>
            </div>

            <div className="issue-item">
              <h4>❌ API endpoint tidak response</h4>
              <p><strong>Solution:</strong> Pastikan server CMS running di http://localhost:3000</p>
            </div>

            <div className="issue-item">
              <h4>❌ Content tidak urut sesuai order</h4>
              <p><strong>Solution:</strong> Set order field dengan nilai numeric yang benar</p>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="docs-section">
          <h2>⚡ Quick Reference</h2>
          
          <div className="quick-ref">
            <div className="ref-column">
              <h3>🔗 Important URLs</h3>
              <ul>
                <li><strong>Admin Panel:</strong> http://localhost:3000/admin</li>
                <li><strong>API Base:</strong> http://localhost:3000/api</li>
                <li><strong>Frontend:</strong> http://localhost:5173</li>
              </ul>
            </div>

            <div className="ref-column">
              <h3>📊 Collection Slugs</h3>
              <ul>
                <li>landing-page</li>
                <li>hero-section</li>
                <li>features</li>
                <li>why-choose</li>
                <li>how-it-works</li>
                <li>testimonials</li>
                <li>faq</li>
                <li>media</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="docs-footer">
        <p>📝 Documentation v1.0 - Updated January 2025</p>
        <p>🏫 Built for Feezy School Landing Page Project</p>
      </div>
    </div>
  )
}
