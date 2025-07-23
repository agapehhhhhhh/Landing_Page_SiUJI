// src/services/payloadService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Configure axios default settings
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const fetchLandingPage = async () => {
  console.log('[payloadService] Starting to fetch hero data...');
  
  try {
    console.log('[payloadService] Fetching hero data from:', `${API_BASE_URL}/hero-section`);
    
    // Try with fetch first as fallback for CORS issues
    const response = await fetch(`${API_BASE_URL}/hero-section`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    
    console.log('[payloadService] Fetch response status:', response.status);
    console.log('[payloadService] Fetch response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[payloadService] Full API response:', data);
    
    const hero = data.docs?.[0];
    console.log('[payloadService] Hero data extracted:', hero);
    
    if (!hero) {
      console.warn('[payloadService] No hero data found in database');
      return {
        hero: null,
      };
    }

    // Process hero image URL if it exists
    let heroImageUrl = '/assets/ilustrasi-hero.png'; // fallback
    if (hero.heroImage) {
      if (typeof hero.heroImage === 'object' && hero.heroImage.url) {
        heroImageUrl = hero.heroImage.url;
      } else if (typeof hero.heroImage === 'string') {
        heroImageUrl = hero.heroImage;
      }
    }

    // Return the actual data from database
    return {
      hero: {
        title: hero.title || '',
        subtitle: hero.subtitle || '',
        description: hero.description || '',
        ctaText: hero.ctaText || 'Get Started',
        ctaLink: hero.ctaLink || '#',
        heroImage: { url: heroImageUrl },
        features: hero.features || [],
        isActive: hero.isActive !== false // default to true if not specified
      },
    };
  } catch (e) {
    console.error("[fetchLandingPage] Error fetching from API:", e);
    console.error("Error details:", e.response?.data || e.message);
    
    // Return null to indicate no data available
    return {
      hero: null,
    };
  }
};
