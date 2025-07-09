/**
 * Feezy School CMS Theme Configuration
 * 
 * This file contains theme-specific settings and configurations
 * for the Payload CMS admin interface.
 */

export const themeConfig = {
  // Brand Information
  brand: {
    name: 'Feezy School CMS',
    logo: '🏫',
    tagline: 'Empowering Educational Excellence',
    favicon: '/favicon.ico',
  },

  // Color Scheme
  colors: {
    primary: '#ffd700',
    primaryDark: '#e6c200',
    primaryLight: '#fff8dc',
    secondary: '#2c3e50',
    accent: '#3498db',
    success: '#27ae60',
    warning: '#f39c12',
    danger: '#e74c3c',
    light: '#f8f9fa',
    dark: '#2c3e50',
  },

  // Typography
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      small: '0.8rem',
      base: '1rem',
      large: '1.2rem',
      xl: '1.5rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // Layout
  layout: {
    headerHeight: '60px',
    sidebarWidth: '260px',
    borderRadius: {
      small: '6px',
      base: '8px',
      large: '12px',
      full: '50%',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      base: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
  },

  // Shadows
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    base: '0 2px 8px rgba(0, 0, 0, 0.1)',
    large: '0 4px 16px rgba(0, 0, 0, 0.1)',
    primary: '0 4px 16px rgba(255, 215, 0, 0.3)',
  },

  // Animations
  animations: {
    duration: {
      fast: '0.15s',
      base: '0.3s',
      slow: '0.6s',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  // Dashboard Configuration
  dashboard: {
    welcomeMessage: {
      title: 'Welcome to Feezy School CMS',
      subtitle: 'Manage your landing page content with ease',
      showStats: true,
      showQuickActions: true,
      showRecentActivity: true,
      showSystemStatus: true,
    },
    collections: [
      {
        name: 'Hero Section',
        slug: 'hero-section',
        icon: '🏆',
        color: '#3498db',
        description: 'Main landing page hero content',
      },
      {
        name: 'Features',
        slug: 'features',
        icon: '✨',
        color: '#27ae60',
        description: 'Feature highlights and benefits',
      },
      {
        name: 'Why Choose Us',
        slug: 'why-choose',
        icon: '🎯',
        color: '#f39c12',
        description: 'Competitive advantages',
      },
      {
        name: 'How It Works',
        slug: 'how-it-works',
        icon: '⚙️',
        color: '#e74c3c',
        description: 'Process explanation steps',
      },
      {
        name: 'Testimonials',
        slug: 'testimonials',
        icon: '💬',
        color: '#9b59b6',
        description: 'Student and parent reviews',
      },
      {
        name: 'FAQ',
        slug: 'faq',
        icon: '❓',
        color: '#34495e',
        description: 'Frequently asked questions',
      },
      {
        name: 'Media',
        slug: 'media',
        icon: '📸',
        color: '#16a085',
        description: 'Images and media files',
      },
      {
        name: 'Users',
        slug: 'users',
        icon: '👥',
        color: '#e67e22',
        description: 'CMS user management',
      },
    ],
  },

  // Breakpoints
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },

  // Feature Flags
  features: {
    darkMode: true,
    animations: true,
    customDashboard: true,
    responsiveDesign: true,
    accessibilityFeatures: true,
    printStyles: true,
  },

  // Custom Components
  components: {
    customBrand: true,
    dashboardWelcome: true,
    collectionStats: true,
    quickActions: true,
    systemStatus: true,
  },

  // Meta Information
  meta: {
    title: 'Feezy School CMS',
    description: 'Content Management System for Feezy School Landing Page',
    keywords: ['feezy', 'school', 'cms', 'education', 'landing page'],
    author: 'Feezy School Team',
    version: '1.0.0',
  },
};

export default themeConfig;
