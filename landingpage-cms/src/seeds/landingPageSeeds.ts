export const heroSectionSeed = {
  section: 'hero',
  title: 'Revolutionize Your Education with SiUJI',
  subtitle: 'Digital Examination Platform for Modern Learning',
  description: 'Transform traditional testing into engaging digital experiences. SiUJI empowers educators to create, manage, and monitor online examinations with real-time insights and comprehensive analytics.',
  ctaText: 'Get Started Now',
  ctaLink: '/register',
  isActive: true,
  order: 1,
  dynamicContent: {
    features: [
      'Real-time monitoring',
      'Secure examination environment',
      'Comprehensive analytics',
      'Multi-platform support'
    ]
  }
}

export const aboutUsSeed = {
  section: 'about',
  title: 'What is SIUJI?',
  subtitle: 'Your Complete Digital Education Solution',
  description: 'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.',
  isActive: true,
  order: 2,
  dynamicContent: {
    targetUsers: [
      {
        title: 'For Teachers',
        description: 'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.',
        icon: 'teacher-icon'
      },
      {
        title: 'For Schools',
        description: 'Comprehensive school management system with integrated examination platform for modern education.',
        icon: 'school-icon'
      },
      {
        title: 'For Students',
        description: 'Engaging and user-friendly interface for taking exams and accessing learning materials.',
        icon: 'student-icon'
      }
    ]
  }
}

export const whyChooseSeed = {
  section: 'why-choose',
  title: 'Why Choose Us?',
  subtitle: 'Experience the Future of Digital Education',
  isActive: true,
  order: 3,
  dynamicContent: {
    points: [
      {
        title: 'Real-Time Monitoring',
        description: 'Embrace the power of real-time monitoring and take control of your learning journey with us.',
        icon: 'monitor-icon'
      },
      {
        title: 'Lifetime Access',
        description: 'Your education is not bound by time; it\'s a lifelong pursuit, and we\'re here to support your journey every step of the way.',
        icon: 'access-icon'
      },
      {
        title: 'Big Community',
        description: 'Connect, collaborate, and share with a diverse group of peers, making your learning journey enriching and interactive.',
        icon: 'community-icon'
      }
    ]
  }
}

export const featuresSeed = [
  {
    section: 'features',
    title: 'Smart Examination System',
    description: 'Advanced AI-powered examination system with anti-cheating mechanisms and real-time proctoring capabilities.',
    isActive: true,
    order: 4,
    dynamicContent: {
      position: 'left',
      features: ['AI Proctoring', 'Auto-grading', 'Question Randomization']
    }
  },
  {
    section: 'features',
    title: 'Comprehensive Analytics',
    description: 'Get detailed insights into student performance with comprehensive analytics and reporting tools.',
    isActive: true,
    order: 5,
    dynamicContent: {
      position: 'right',
      features: ['Performance Tracking', 'Custom Reports', 'Data Visualization']
    }
  },
  {
    section: 'features',
    title: 'Multi-Platform Support',
    description: 'Access SiUJI from any device - web browser, Android, or iOS. Your education follows you everywhere.',
    isActive: true,
    order: 6,
    dynamicContent: {
      position: 'left',
      features: ['Web Access', 'Mobile Apps', 'Offline Mode']
    }
  }
]

export const testimonialsSeed = [
  {
    section: 'testimonials',
    title: 'What They Say',
    subtitle: 'Trusted by Educators Worldwide',
    description: 'SiUJI is one powerful online software suite that combines all the tools needed to run a successful school or office.',
    isActive: true,
    order: 7,
    dynamicContent: {
      testimonials: [
        {
          name: 'Dr. Sarah Johnson',
          position: 'Mathematics Teacher',
          school: 'Jakarta International School',
          content: 'SiUJI has transformed how we conduct examinations. The real-time monitoring feature gives me confidence in maintaining academic integrity.',
          rating: 5,
          avatar: 'testimonial-1.jpg'
        },
        {
          name: 'Ahmad Rizki',
          position: 'IT Coordinator',
          school: 'SMA Negeri 1 Bandung',
          content: 'The platform is incredibly user-friendly and the analytics help us understand student performance better than ever before.',
          rating: 5,
          avatar: 'testimonial-2.jpg'
        },
        {
          name: 'Maria Gonzalez',
          position: 'Principal',
          school: 'International School Surabaya',
          content: 'Implementation was seamless and the support team is outstanding. Our examination process is now completely digitized.',
          rating: 5,
          avatar: 'testimonial-3.jpg'
        }
      ]
    }
  }
]

export const pricingSeed = {
  section: 'pricing',
  title: 'Choose Plan That\'s Right For You',
  subtitle: 'Flexible Pricing for Every Institution',
  description: 'Choose plan that works best for you, feel free to contact us',
  isActive: true,
  order: 8,
  dynamicContent: {
    plans: [
      {
        name: 'Free',
        price: 0,
        period: 'month',
        description: 'Perfect for trying out SiUJI',
        features: [
          '2 Teachers',
          '50 Students',
          'Basic Analytics',
          'Email Support',
          'Web Access Only'
        ],
        ctaText: 'Get Started Free',
        ctaLink: '/register/free',
        isPopular: false
      },
      {
        name: 'Pro',
        price: 29,
        period: 'month',
        description: 'For growing schools and institutions',
        features: [
          'Unlimited Teachers',
          'Up to 500 Students',
          'Advanced Analytics',
          'Priority Support',
          'All Platforms',
          'Custom Branding'
        ],
        ctaText: 'Start Pro Trial',
        ctaLink: '/register/pro',
        isPopular: true
      },
      {
        name: 'Enterprise',
        price: 99,
        period: 'month',
        description: 'For large institutions',
        features: [
          'Everything in Pro',
          'Unlimited Students',
          'Custom Integration',
          'Dedicated Support',
          'Advanced Security',
          'Custom Features'
        ],
        ctaText: 'Contact Sales',
        ctaLink: '/contact/enterprise',
        isPopular: false
      }
    ]
  }
}

export const faqSeed = {
  section: 'faq',
  title: 'Frequently Asked Questions',
  subtitle: 'Everything You Need to Know About SiUJI',
  isActive: true,
  order: 9,
  dynamicContent: {
    categories: [
      { label: 'All Questions', value: 'all' },
      { label: 'Features', value: 'features' },
      { label: 'General', value: 'general' },
      { label: 'Technical', value: 'technical' }
    ],
    faqs: [
      {
        question: 'What is SiUJI and how does it work?',
        answer: 'SiUJI is a comprehensive digital examination platform that allows educators to create, manage, and monitor online tests with real-time proctoring and analytics.',
        category: 'general'
      },
      {
        question: 'Is SiUJI secure for conducting examinations?',
        answer: 'Yes, SiUJI employs advanced security measures including AI-powered proctoring, browser lockdown, and real-time monitoring to ensure examination integrity.',
        category: 'technical'
      },
      {
        question: 'Can I use SiUJI on mobile devices?',
        answer: 'Absolutely! SiUJI is available on web browsers, Android, and iOS platforms for maximum accessibility.',
        category: 'features'
      },
      {
        question: 'Do you provide training for new users?',
        answer: 'Yes, we offer comprehensive training sessions and documentation to help you get started with SiUJI quickly and effectively.',
        category: 'general'
      },
      {
        question: 'What kind of analytics does SiUJI provide?',
        answer: 'SiUJI offers detailed performance analytics, progress tracking, custom reports, and data visualization to help educators make informed decisions.',
        category: 'features'
      }
    ]
  }
}

export const contactSeed = {
  section: 'contact',
  title: 'Get In Touch With Us!',
  subtitle: 'Ready to Transform Your Education?',
  description: 'Have questions about SiUJI or need a custom solution? Our team is here to help you digitize your examination process.',
  isActive: true,
  order: 10,
  dynamicContent: {
    contactInfo: {
      address: 'Jl. Raya Bandung-Sumedang KM 21, Jatinangor, Sumedang, Jawa Barat 45363',
      phone: '+62 22 7796 8800',
      email: 'info@siuji.id',
      workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
    },
    mapConfig: {
      center: { lat: -6.9175, lng: 107.6191 },
      zoom: 15,
      marker: 'SiUJI Office'
    }
  }
}

// Export all seeds as a single array
export const landingPageSeeds = [
  heroSectionSeed,
  aboutUsSeed,
  whyChooseSeed,
  ...featuresSeed,
  ...testimonialsSeed,
  pricingSeed,
  faqSeed,
  contactSeed
]
