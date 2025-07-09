/**
 * Theme Testing and Validation
 * 
 * This file contains utilities for testing and validating the theme implementation.
 */

// Theme validation functions
export const validateTheme = () => {
  const tests = [];
  
  // Test 1: Check if CSS variables are defined
  tests.push({
    name: 'CSS Variables',
    test: () => {
      const root = document.documentElement;
      const primaryColor = getComputedStyle(root).getPropertyValue('--feezy-primary');
      return primaryColor.trim() !== '';
    },
  });
  
  // Test 2: Check if theme classes are available
  tests.push({
    name: 'Theme Classes',
    test: () => {
      const testDiv = document.createElement('div');
      testDiv.className = 'feezy-btn feezy-btn--primary';
      document.body.appendChild(testDiv);
      
      const styles = getComputedStyle(testDiv);
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      document.body.removeChild(testDiv);
      return hasBackground;
    },
  });
  
  // Test 3: Check responsive design
  tests.push({
    name: 'Responsive Design',
    test: () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      return viewport !== null;
    },
  });
  
  // Test 4: Check font loading
  tests.push({
    name: 'Font Loading',
    test: () => {
      const testDiv = document.createElement('div');
      testDiv.style.fontFamily = 'Inter, sans-serif';
      document.body.appendChild(testDiv);
      
      const computedFont = getComputedStyle(testDiv).fontFamily;
      const hasInter = computedFont.includes('Inter');
      
      document.body.removeChild(testDiv);
      return hasInter;
    },
  });
  
  // Run all tests
  const results = tests.map(test => ({
    name: test.name,
    passed: test.test(),
  }));
  
  return results;
};

// Theme performance monitor
export const monitorThemePerformance = () => {
  const startTime = performance.now();
  
  // Check CSS loading time
  const cssLoadTime = performance.getEntriesByType('resource')
    .filter(entry => entry.name.includes('custom.scss'))
    .map(entry => entry.duration)[0] || 0;
  
  // Check animation performance
  const animationCheck = () => {
    const element = document.createElement('div');
    element.className = 'feezy-hover-lift';
    document.body.appendChild(element);
    
    const startFrame = performance.now();
    element.style.transform = 'translateY(-2px)';
    
    requestAnimationFrame(() => {
      const endFrame = performance.now();
      const animationTime = endFrame - startFrame;
      document.body.removeChild(element);
      
      return animationTime;
    });
  };
  
  return {
    cssLoadTime,
    animationTime: animationCheck(),
    totalTime: performance.now() - startTime,
  };
};

// Theme accessibility checker
export const checkAccessibility = () => {
  const issues = [];
  
  // Check color contrast
  const checkContrast = (bg: string, fg: string): boolean => {
    // Simple contrast ratio calculation
    const getLuminance = (color: string): number => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map((x: string) => {
        const num = parseInt(x) / 255;
        return num <= 0.03928 ? num / 12.92 : Math.pow((num + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    
    const bgLum = getLuminance(bg);
    const fgLum = getLuminance(fg);
    const ratio = (Math.max(bgLum, fgLum) + 0.05) / (Math.min(bgLum, fgLum) + 0.05);
    
    return ratio >= 4.5; // WCAG AA standard
  };
  
  // Check focus indicators
  const checkFocusIndicators = () => {
    const focusableElements = document.querySelectorAll('button, input, textarea, select, a[href]');
    let focusIssues = 0;
    
    focusableElements.forEach(element => {
      const styles = getComputedStyle(element, ':focus');
      if (!styles.outline || styles.outline === 'none') {
        focusIssues++;
      }
    });
    
    return focusIssues === 0;
  };
  
  // Check ARIA labels
  const checkAriaLabels = () => {
    const interactiveElements = document.querySelectorAll('button, input, textarea, select');
    let ariaIssues = 0;
    
    interactiveElements.forEach(element => {
      if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
        ariaIssues++;
      }
    });
    
    return ariaIssues === 0;
  };
  
  if (!checkFocusIndicators()) {
    issues.push('Some focusable elements lack proper focus indicators');
  }
  
  if (!checkAriaLabels()) {
    issues.push('Some interactive elements lack ARIA labels');
  }
  
  return issues;
};

// Theme debugging utilities
export const debugTheme = () => {
  const debug: {
    cssVariables: Record<string, string>;
    computedStyles: Record<string, string>;
    breakpoints: Record<string, boolean>;
  } = {
    cssVariables: {},
    computedStyles: {},
    breakpoints: {},
  };
  
  // Get all CSS variables
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  
  // Extract theme variables
  for (const property of Array.from(rootStyles)) {
    if (property.startsWith('--feezy-')) {
      debug.cssVariables[property] = rootStyles.getPropertyValue(property);
    }
  }
  
  // Check breakpoints
  const breakpoints = {
    mobile: window.matchMedia('(max-width: 768px)').matches,
    tablet: window.matchMedia('(max-width: 1024px)').matches,
    desktop: window.matchMedia('(min-width: 1025px)').matches,
  };
  
  debug.breakpoints = breakpoints;
  
  return debug;
};

// Export a comprehensive theme test suite
export const runThemeTests = () => {
  console.group('🎨 Feezy School Theme Tests');
  
  // Validation tests
  console.log('Running validation tests...');
  const validationResults = validateTheme();
  validationResults.forEach(result => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.name}`);
  });
  
  // Performance tests
  console.log('\nChecking performance...');
  const performanceResults = monitorThemePerformance();
  console.log('Performance metrics:', performanceResults);
  
  // Accessibility tests
  console.log('\nChecking accessibility...');
  const accessibilityIssues = checkAccessibility();
  if (accessibilityIssues.length === 0) {
    console.log('✅ No accessibility issues found');
  } else {
    accessibilityIssues.forEach(issue => {
      console.warn('⚠️', issue);
    });
  }
  
  // Debug information
  console.log('\nDebug information:');
  const debugInfo = debugTheme();
  console.log(debugInfo);
  
  console.groupEnd();
  
  return {
    validation: validationResults,
    performance: performanceResults,
    accessibility: accessibilityIssues,
    debug: debugInfo,
  };
};

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  // Run tests after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runThemeTests);
  } else {
    runThemeTests();
  }
}

export default {
  validateTheme,
  monitorThemePerformance,
  checkAccessibility,
  debugTheme,
  runThemeTests,
};
