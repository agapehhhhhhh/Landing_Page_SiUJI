import React from 'react';

interface CollectionStatsProps {
  collections: Array<{
    name: string;
    slug: string;
    count: number;
    icon: string;
    color: string;
  }>;
}

const CollectionStats: React.FC<CollectionStatsProps> = ({ collections }) => {
  return (
    <div className="dashboard-stats">
      {collections.map((collection) => (
        <div key={collection.slug} className="stat-card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{collection.icon}</span>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--feezy-dark)'
              }}>
                {collection.name}
              </h3>
            </div>
            <span style={{ 
              background: collection.color,
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {collection.count}
            </span>
          </div>
          <div style={{ 
            height: '4px',
            background: '#e1e8ed',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%',
              background: collection.color,
              width: `${Math.min((collection.count / 10) * 100, 100)}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionStats;
