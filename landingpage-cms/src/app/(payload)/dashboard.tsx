import React from 'react';
import DashboardWelcome from './components/DashboardWelcome';
import CollectionStats from './components/CollectionStats';

const Dashboard: React.FC = () => {
  // Sample data - in real implementation, this would come from Payload API
  const collectionData = [
    { name: 'Hero Section', slug: 'hero-section', count: 1, icon: '🏆', color: '#3498db' },
    { name: 'Features', slug: 'features', count: 6, icon: '✨', color: '#27ae60' },
    { name: 'Why Choose Us', slug: 'why-choose', count: 4, icon: '🎯', color: '#f39c12' },
    { name: 'How It Works', slug: 'how-it-works', count: 3, icon: '⚙️', color: '#e74c3c' },
    { name: 'Testimonials', slug: 'testimonials', count: 8, icon: '💬', color: '#9b59b6' },
    { name: 'FAQ', slug: 'faq', count: 12, icon: '❓', color: '#34495e' },
    { name: 'Media', slug: 'media', count: 24, icon: '📸', color: '#16a085' },
    { name: 'Users', slug: 'users', count: 5, icon: '👥', color: '#e67e22' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <DashboardWelcome />
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: 'var(--feezy-dark)', 
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          📊 Content Overview
        </h2>
        <CollectionStats collections={collectionData} />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          borderLeft: '4px solid var(--feezy-primary)'
        }}>
          <h3 style={{ 
            color: 'var(--feezy-dark)', 
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            🚀 Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/admin/collections/hero-section" style={{ 
              color: 'var(--feezy-accent)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}>
              ✏️ Edit Hero Section
            </a>
            <a href="/admin/collections/features" style={{ 
              color: 'var(--feezy-accent)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}>
              ⭐ Manage Features
            </a>
            <a href="/admin/collections/media" style={{ 
              color: 'var(--feezy-accent)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}>
              📁 Upload Media
            </a>
            <a href="/docs" style={{ 
              color: 'var(--feezy-accent)',
              textDecoration: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}>
              📚 View Documentation
            </a>
          </div>
        </div>

        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          borderLeft: '4px solid var(--feezy-success)'
        }}>
          <h3 style={{ 
            color: 'var(--feezy-dark)', 
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            📈 Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ 
              padding: '0.5rem',
              background: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <strong>Hero Section</strong> updated 2 hours ago
            </div>
            <div style={{ 
              padding: '0.5rem',
              background: 'rgba(52, 152, 219, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <strong>New Feature</strong> added 1 day ago
            </div>
            <div style={{ 
              padding: '0.5rem',
              background: 'rgba(243, 156, 18, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <strong>FAQ</strong> updated 3 days ago
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          borderLeft: '4px solid var(--feezy-warning)'
        }}>
          <h3 style={{ 
            color: 'var(--feezy-dark)', 
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            🛠️ System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem',
              background: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--feezy-success)' }}>●</span>
              <span>Database: Connected</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem',
              background: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--feezy-success)' }}>●</span>
              <span>API: Healthy</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem',
              background: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: 'var(--feezy-success)' }}>●</span>
              <span>Frontend: Synced</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'var(--feezy-light)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          color: 'var(--feezy-dark)', 
          marginBottom: '0.5rem',
          fontSize: '1.2rem',
          fontWeight: '600'
        }}>
          🌟 Pro Tips
        </h3>
        <p style={{ 
          color: '#666', 
          fontSize: '0.95rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          Keep your content fresh and engaging! Remember to regularly update your testimonials, 
          add new features, and optimize your hero section for better conversion rates.
          <br />
          <em>Need help? Check out our <a href="/docs" style={{ color: 'var(--feezy-accent)' }}>documentation</a> or contact support.</em>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
