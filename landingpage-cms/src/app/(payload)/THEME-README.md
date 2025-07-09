# Feezy School CMS Admin Theme

## Overview
This is a custom administrative theme for the Feezy School CMS built on Payload CMS. The theme provides a cohesive, professional, and user-friendly interface that matches the Feezy School brand identity.

## Features

### 🎨 **Visual Design**
- **Brand Colors**: Golden primary (#FFD700) with dark secondary (#2C3E50)
- **Modern Typography**: Inter font family for excellent readability
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Subtle hover effects and transitions
- **Dark Mode Support**: Automatic dark mode detection

### 🏗️ **Layout Components**
- **Custom Header**: Branded header with school emoji and gradient background
- **Enhanced Sidebar**: Improved navigation with hover effects
- **Dashboard Stats**: Visual overview of content collections
- **Quick Actions**: Easy access to common tasks
- **System Status**: Real-time system health indicators

### 📱 **Responsive Features**
- Mobile-first design approach
- Collapsible navigation for smaller screens
- Optimized touch targets
- Adaptive grid layouts

### ♿ **Accessibility**
- High contrast mode support
- Focus indicators for keyboard navigation
- ARIA-compliant components
- Screen reader optimizations

## File Structure

```
src/app/(payload)/
├── custom.scss              # Main theme file
├── utilities.scss           # Utility classes
├── favicon.html             # Meta tags and favicon
├── dashboard.tsx            # Custom dashboard component
└── components/
    ├── DashboardWelcome.tsx # Welcome section
    ├── CollectionStats.tsx  # Statistics display
    └── CustomBrand.tsx      # Brand component
```

## Theme Variables

The theme uses CSS custom properties for easy customization:

```scss
:root {
  --feezy-primary: #ffd700;        // Golden yellow
  --feezy-primary-dark: #e6c200;   // Darker golden
  --feezy-primary-light: #fff8dc;  // Light cream
  --feezy-secondary: #2c3e50;      // Dark blue-gray
  --feezy-accent: #3498db;         // Blue
  --feezy-success: #27ae60;        // Green
  --feezy-warning: #f39c12;        // Orange
  --feezy-danger: #e74c3c;         // Red
  --feezy-light: #f8f9fa;          // Light gray
  --feezy-dark: #2c3e50;           // Dark gray
}
```

## Utility Classes

The theme includes comprehensive utility classes for rapid development:

### Spacing
- `feezy-m-{0-4}` - Margin utilities
- `feezy-p-{0-4}` - Padding utilities
- `feezy-mb-{0-4}` - Margin bottom
- `feezy-mt-{0-4}` - Margin top

### Layout
- `feezy-flex` - Flexbox container
- `feezy-grid` - Grid container
- `feezy-grid--{2|3|4}` - Responsive grid columns

### Typography
- `feezy-text-{center|left|right}` - Text alignment
- `feezy-text-{primary|secondary|success|warning|danger}` - Text colors
- `feezy-text-{small|large|xl}` - Font sizes
- `feezy-text-{bold|normal}` - Font weights

### Components
- `feezy-btn` - Button base class
- `feezy-btn--{primary|secondary|success|danger}` - Button variants
- `feezy-badge` - Badge component
- `feezy-alert` - Alert component
- `feezy-progress` - Progress bar

### Effects
- `feezy-hover-lift` - Lift effect on hover
- `feezy-hover-glow` - Glow effect on hover
- `feezy-shadow-{sm|lg|primary}` - Shadow utilities

## Customization

### Changing Colors
To customize the theme colors, modify the CSS variables in `custom.scss`:

```scss
:root {
  --feezy-primary: #your-color;
  --feezy-secondary: #your-color;
  // ... other variables
}
```

### Adding New Components
1. Create a new component file in the `components/` directory
2. Follow the existing naming convention
3. Use the theme variables for consistency
4. Import and use in your layout files

### Custom Animations
Add custom animations using CSS keyframes:

```scss
@keyframes yourAnimation {
  0% { /* initial state */ }
  100% { /* final state */ }
}

.your-element {
  animation: yourAnimation 0.3s ease;
}
```

## Browser Support

The theme supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

- **CSS Grid**: Used for efficient layouts
- **CSS Custom Properties**: For dynamic theming
- **Minimal JavaScript**: Theme relies primarily on CSS
- **Optimized Animations**: Hardware-accelerated transforms
- **Efficient Selectors**: Specific selectors to avoid conflicts

## Troubleshooting

### Theme Not Loading
1. Check that `custom.scss` is properly imported in `payload.config.ts`
2. Verify all file paths are correct
3. Ensure SCSS compilation is working

### Styles Not Applying
1. Check CSS specificity - use `!important` if needed
2. Verify class names match exactly
3. Check for conflicting styles from other sources

### Mobile Issues
1. Ensure viewport meta tag is present
2. Test responsive utilities
3. Check for fixed width elements

## Contributing

When contributing to the theme:

1. Follow the existing code style
2. Test on multiple browsers and devices
3. Update documentation for new features
4. Maintain accessibility standards
5. Use semantic HTML where possible

## Resources

- [Payload CMS Theming Guide](https://payloadcms.com/docs/admin/theming)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## License

This theme is part of the Feezy School project and follows the same license terms.

---

**Created with ❤️ for Feezy School**
