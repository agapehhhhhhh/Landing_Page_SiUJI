import React from 'react';

const CustomBrand: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      fontWeight: '800',
      fontSize: '1.4rem',
      color: 'var(--feezy-dark)'
    }}>
      <span style={{ fontSize: '1.6rem' }}>🏫</span>
      <span>Feezy School CMS</span>
    </div>
  );
};

export default CustomBrand;
