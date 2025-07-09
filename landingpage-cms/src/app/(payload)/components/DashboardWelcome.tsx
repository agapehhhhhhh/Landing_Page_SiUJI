import React from 'react';

const DashboardWelcome: React.FC = () => {
  return (
    <div className="dashboard-welcome">
      <h2>🏫 Welcome to Feezy School CMS</h2>
      <p>
        Manage your landing page content with ease. Create, edit, and organize your sections 
        to build the perfect educational experience for your students.
      </p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          📝 Content Management
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          🎨 Brand Customization
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          📊 Analytics Ready
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
