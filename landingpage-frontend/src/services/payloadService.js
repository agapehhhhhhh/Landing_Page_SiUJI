// src/services/payloadService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Helper function to extract plain text from Payload's rich text format
const extractPlainText = (richTextContent) => {
  if (typeof richTextContent === "string") {
    return richTextContent;
  }

  if (richTextContent?.root?.children) {
    let text = "";

    const extractFromChildren = (children) => {
      children.forEach((child) => {
        if (child.type === "text" && child.text) {
          text += child.text;
        } else if (child.children) {
          extractFromChildren(child.children);
        }
      });
    };

    extractFromChildren(richTextContent.root.children);
    return text || "No answer provided";
  }

  return "No answer provided";
};

function toAbsUrl(maybe) {
  // maybe bisa berupa object upload { url, ... } atau string id
  if (!maybe || typeof maybe === "string") return null;
  const url = maybe.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${ORIGIN}${url}`;
}

export const fetchLandingPage = async () => {
  try {
    const [hero, portfolio] = await Promise.all([
      axios
        .get(`${API_BASE_URL}/hero-section`)
        .then((res) => res.data.docs?.[0]),
      axios
        .get(`${API_BASE_URL}/portfolio-section`)
        .then((res) => res.data.docs?.[0]),
    ]);

    // Process hero data from API
    let processedHero = null;
    if (hero) {
      // Ornaments: proses array agar url gambar valid
      let ornaments = Array.isArray(hero.ornaments)
        ? hero.ornaments.map((orn) => ({
            ...orn,
            image:
              orn.image && orn.image.url
                ? (orn.image.url.startsWith("http")
                    ? orn.image.url
                    : `${API_BASE_URL.replace("/api", "")}${orn.image.url}`)
                : null,
          }))
        : [];

      processedHero = {
        ...hero,
        heroImage: hero.heroImage
          ? {
              ...hero.heroImage,
              url: hero.heroImage.url.startsWith("http")
                ? hero.heroImage.url
                : `${API_BASE_URL.replace("/api", "")}${hero.heroImage.url}`,
            }
          : { url: "/assets/ilustrasi-hero.png" },
        ornaments,
      };
    }

    // Process portfolio data from API
    let processedPortfolio = [];
    let portfolioTitle = "Trusted by 1.234 Companies Worldwide";

    if (portfolio && portfolio.logos) {
      portfolioTitle =
        portfolio.title || "Trusted by 1.234 Companies Worldwide";
      processedPortfolio = portfolio.logos.map((logoItem) => ({
        url: logoItem.logo?.url.startsWith("http")
          ? logoItem.logo.url
          : `${API_BASE_URL.replace("/api", "")}${logoItem.logo?.url}`,
        name: logoItem.name,
        website: logoItem.url || null,
      }));
    }

    return {
      hero: processedHero ?? {
        title: "Headline Utama Dari Aplikasi SIUJIII",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ctaText: "Get Started Now",
        heroImage: { url: "/assets/ilustrasi-hero.png" },
        ornaments: [],
      },
      portofolio:
        processedPortfolio.length > 0
          ? processedPortfolio
          : [
              { url: "/assets/logo1.png", name: "Partner 1" },
              { url: "/assets/logo2.jpeg", name: "Partner 2" },
            ],
      portfolioTitle: portfolioTitle,
    };
  } catch (e) {
    console.error("[fetchLandingPage] Error:", e);
    return {
      hero: {
        title: "Fallback Title",
        subtitle: "Fallback Subtitle",
        heroImage: { url: "/assets/ilustrasi-hero.png" },
      },
      portofolio: [],
      portfolioTitle: "Trusted by Companies Worldwide",
    };
  }
};

// Function to fetch Portfolio/Partners data
export const fetchPortfolioData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/portfolio-section?limit=100`
    );
    const portfolioData = response.data;

    // Get the first active portfolio section
    const activePortfolio = portfolioData.docs.find(
      (item) => item.isActive !== false
    );

    if (!activePortfolio || !activePortfolio.logos) {
      return {
        title: "Trusted by Companies Worldwide",
        logos: [],
      };
    }

    // Process logos data
    const processedLogos = activePortfolio.logos.map((logoItem) => ({
      url: logoItem.logo?.url
        ? logoItem.logo.url.startsWith("http")
          ? logoItem.logo.url
          : `${API_BASE_URL.replace("/api", "")}${logoItem.logo.url}`
        : "/assets/default-logo.png",
      name: logoItem.name || "Partner Logo",
      website: logoItem.url || null,
      alt: logoItem.name || "Partner Logo",
    }));

    return {
      title: activePortfolio.title || "Trusted by Companies Worldwide",
      logos: processedLogos,
    };
  } catch (error) {
    console.error("[fetchPortfolioData] Error:", error);

    // Fallback data
    return {
      title: "Trusted by Companies Worldwide",
      logos: [
        { url: "/assets/logo1.png", name: "Partner 1", alt: "Partner 1" },
        { url: "/assets/logo2.jpeg", name: "Partner 2", alt: "Partner 2" },
      ],
    };
  }
};

export const fetchFAQData = async () => {
  try {
    // Fetch FAQ data from API (removed sort=order since field might not exist)
    const response = await axios.get(`${API_BASE_URL}/faq?limit=100`);
    const faqData = response.data;

    // Extract unique categories from the fetched data
    const uniqueCategories = [
      ...new Set(faqData.docs.map((faq) => faq.category)),
    ];

    // Create categories array with "all" option
    const categories = [
      { id: "all", name: "All Questions" },
      ...uniqueCategories.map((category) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    ];

    // Process FAQ data to match the expected format
    const processedFAQs = faqData.docs
      .filter((faq) => faq.isActive !== false) // Only include active FAQs (default true if not set)
      .map((faq, index) => ({
        id: faq.id,
        categoryId: faq.category,
        question: faq.question,
        answer: extractPlainText(faq.answer),
        isOpen: false,
        order: faq.order !== undefined ? faq.order : index, // Use index as fallback order
        isFeatured: faq.isFeatured || false,
        tags: faq.tags?.map((tag) => tag.tag) || [],
        helpfulCount: faq.helpfulCount || 0, // Default to 0 if field doesn't exist
      }))
      .sort((a, b) => a.order - b.order); // Sort by order

    return {
      categories,
      faqs: processedFAQs,
    };
  } catch (error) {
    console.error("[fetchFAQData] Error:", error);

    // Fallback data in case API is not available
    return {
      categories: [
        { id: "all", name: "All Questions" },
        { id: "general", name: "General" },
        { id: "features", name: "Features" },
        { id: "technical", name: "Technical" },
        { id: "pricing", name: "Pricing" },
      ],
      faqs: [
        {
          id: 1,
          categoryId: "general",
          question: "Bagaimana cara memulai menggunakan SiUJI?",
          answer:
            "Untuk memulai menggunakan SiUJI, Anda dapat mendaftar akun melalui website resmi kami, kemudian melakukan verifikasi email, dan mengikuti tutorial setup yang telah disediakan.",
          isOpen: false,
          order: 0,
          isFeatured: false,
        },
        {
          id: 2,
          categoryId: "features",
          question: "Apa saja fitur utama yang tersedia di SiUJI?",
          answer:
            "SiUJI menyediakan berbagai fitur unggulan seperti sistem manajemen ujian online, monitoring real-time, analisis hasil ujian otomatis, bank soal yang dapat disesuaikan, dan sistem keamanan berlapis untuk memastikan integritas ujian.",
          isOpen: false,
          order: 1,
          isFeatured: true,
        },
      ],
    };
  }
};

// Function to fetch FAQ by specific category
export const fetchFAQByCategory = async (category = "all") => {
  try {
    // Remove sort=order since order field might not exist
    let url = `${API_BASE_URL}/faq?limit=100`;

    // Add category filter if not 'all'
    if (category !== "all") {
      url += `&where[category][equals]=${category}`;
    }

    const response = await axios.get(url);
    const faqData = response.data;

    const processedFAQs = faqData.docs
      .filter((faq) => faq.isActive !== false)
      .map((faq, index) => ({
        id: faq.id,
        categoryId: faq.category,
        question: faq.question,
        answer: extractPlainText(faq.answer),
        isOpen: false,
        order: faq.order !== undefined ? faq.order : index,
        isFeatured: faq.isFeatured || false,
        tags: faq.tags?.map((tag) => tag.tag) || [],
        helpfulCount: faq.helpfulCount || 0,
      }))
      .sort((a, b) => a.order - b.order);

    return processedFAQs;
  } catch (error) {
    console.error("[fetchFAQByCategory] Error:", error);
    return [];
  }
};

// Function to search FAQ by keyword
export const searchFAQ = async (keyword) => {
  try {
    // Remove sort=order since order field might not exist
    const url = `${API_BASE_URL}/faq?limit=100&where[or][0][question][contains]=${keyword}&where[or][1][tags.tag][contains]=${keyword}&where[isActive][equals]=true`;

    const response = await axios.get(url);
    const faqData = response.data;

    const processedFAQs = faqData.docs
      .map((faq, index) => ({
        id: faq.id,
        categoryId: faq.category,
        question: faq.question,
        answer: extractPlainText(faq.answer),
        isOpen: false,
        order: faq.order !== undefined ? faq.order : index,
        isFeatured: faq.isFeatured || false,
        tags: faq.tags?.map((tag) => tag.tag) || [],
        helpfulCount: faq.helpfulCount || 0,
      }))
      .sort((a, b) => a.order - b.order);

    return processedFAQs;
  } catch (error) {
    console.error("[searchFAQ] Error:", error);
    return [];
  }
};

// Function to fetch Pricing data
export const fetchPricingData = async () => {
  try {
    // Fetch pricing data from Payload API
    const response = await axios.get(
      `${API_BASE_URL}/pricing-plans?limit=100&where[isActive][equals]=true&sort=order`
    );
    const pricingData = response.data;

    // Process pricing plans data
    const processedPlans = pricingData.docs
      .map((plan, index) => ({
        id: plan.id,
        name: plan.name,
        type: plan.type || plan.name.toLowerCase(),
        description: plan.description,
        // Handle price based on period
        monthlyPrice: plan.period === 'month' ? plan.price?.toString() || "0" : "0",
        yearlyPrice: plan.period === 'year' ? plan.price?.toString() || "0" : (plan.price * 12)?.toString() || "0",
        price: plan.price?.toString() || "0",
        period: plan.period || 'month',
        currency: plan.currency || 'idr',
        savings: plan.savings || null,
        buttonText: plan.ctaText || "Get Started",
        ctaLink: plan.ctaLink || "#",
        features: plan.features?.map(f => f.feature) || [],
        isPopular: plan.isPopular || false,
        badge: plan.badge || "",
        order: plan.order !== undefined ? plan.order : index,
        isActive: plan.isActive !== false,
        limitations: plan.limitations?.map(l => l.limitation) || [],
        icon: plan.icon
          ? {
              url: plan.icon.url.startsWith("http")
                ? plan.icon.url
                : `${API_BASE_URL.replace("/api", "")}${plan.icon.url}`,
              alt: plan.icon.alt || plan.name,
            }
          : null,
      }))
      .sort((a, b) => a.order - b.order);

    return {
      plans: processedPlans,
    };
  } catch (error) {
    console.error("[fetchPricingData] Error:", error);

    // Fallback data in case API is not available
    return {
      plans: [
        {
          id: 1,
          name: "Basic",
          type: "basic",
          description: "Untuk coba-coba dan penggunaan personal",
          monthlyPrice: "0",
          yearlyPrice: "0",
          price: "0",
          period: "month",
          currency: "idr",
          savings: null,
          buttonText: "Mulai Gratis",
          ctaLink: "/register?plan=basic",
          features: [
            "Hingga 50 siswa",
            "2 Ujian per bulan",
            "Dukungan Email"
          ],
          isPopular: false,
          badge: "",
          order: 0,
          isActive: true,
          limitations: ["Maksimal 50 siswa per kelas", "Fitur analitik terbatas"],
          icon: null,
        },
        {
          id: 2,
          name: "Pro",
          type: "pro",
          description: "Solusi terbaik untuk sekolah dan institusi",
          monthlyPrice: "500000",
          yearlyPrice: "6000000",
          price: "500000",
          period: "month",
          currency: "idr",
          savings: "Hemat Rp 1.000.000 per tahun",
          buttonText: "Pilih Pro",
          ctaLink: "/register?plan=pro",
          features: [
            "Siswa tak terbatas",
            "Ujian tak terbatas",
            "AI Proctoring",
            "Dukungan Prioritas"
          ],
          isPopular: true,
          badge: "Paling Populer",
          order: 1,
          isActive: true,
          limitations: [],
          icon: null,
        },
        {
          id: 3,
          name: "Enterprise",
          type: "enterprise",
          description: "Solusi kustom untuk kebutuhan institusi besar",
          monthlyPrice: "0",
          yearlyPrice: "0",
          price: "0",
          period: "year",
          currency: "idr",
          savings: null,
          buttonText: "Hubungi Sales",
          ctaLink: "/contact",
          features: [
            "Semua fitur Pro",
            "Server Khusus",
            "Manager Akun Khusus"
          ],
          isPopular: false,
          badge: "Custom",
          order: 2,
          isActive: true,
          limitations: [],
          icon: null,
        }
      ],
    };
  }
};

// Function to fetch Testimonials data
export const fetchTestimonialsData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/testimonials?limit=100&where[isActive][equals]=true&sort=order`
    );
    const testimonialsData = response.data;

    const processedTestimonials = testimonialsData.docs
      .map((testimonial, index) => ({
        id: testimonial.id,
        name: testimonial.name,
        position: testimonial.position,
        school: testimonial.school || "",
        content: testimonial.content,
        title: testimonial.testimonialTitle || "",
        rating: testimonial.rating || 5,
        avatar: testimonial.avatar
          ? {
              url: testimonial.avatar.url.startsWith("http")
                ? testimonial.avatar.url
                : `${API_BASE_URL.replace("/api", "")}${
                    testimonial.avatar.url
                  }`,
              alt: testimonial.avatar.alt || testimonial.name,
            }
          : null,
        order: testimonial.order !== undefined ? testimonial.order : index,
        isFeatured: testimonial.isFeatured || false,
        // For compatibility with existing component
        job: testimonial.position,
      }))
      .sort((a, b) => a.order - b.order);

    return processedTestimonials;
  } catch (error) {
    console.error("[fetchTestimonialsData] Error:", error);

    // Fallback data in case API is not available
    return [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        position: "Guru Matematika",
        school: "Jakarta International School",
        content:
          "SiUJI telah mengubah cara kami melakukan ujian. Fitur pemantauan real-time memberi saya kepercayaan dalam menjaga integritas akademik.",
        title: "Transformasi Digital yang Luar Biasa",
        avatar: null,
        order: 1,
        isFeatured: true,
        job: "Guru Matematika",
      },
      {
        id: 2,
        name: "Ahmad Rizki",
        position: "Koordinator IT",
        school: "SMA Negeri 1 Bandung",
        content:
          "Platform ini sangat ramah pengguna dan analitik membantu kami memahami kinerja siswa lebih baik dari sebelumnya.",
        title: "Solusi Terbaik untuk Institusi Pendidikan",
        avatar: null,
        order: 2,
        isFeatured: false,
        job: "Koordinator IT",
      },
      {
        id: 3,
        name: "Prof. Maria Santos",
        position: "Dekan Fakultas",
        school: "Universitas Teknologi Indonesia",
        content:
          "Implementasi SiUJI di universitas kami sangat sukses. Mahasiswa dan dosen sama-sama puas dengan kemudahan penggunaannya.",
        title: "Efisiensi Ujian Tingkat Universitas",
        avatar: null,
        order: 3,
        isFeatured: true,
        job: "Dekan Fakultas",
      },
      {
        id: 4,
        name: "Budi Santoso",
        position: "Kepala Sekolah",
        school: "SMK Informatika Nusantara",
        content:
          "Dengan SiUJI, proses ujian menjadi lebih terorganisir dan hasil analisis membantu kami meningkatkan kualitas pembelajaran.",
        title: "Revolusi Sistem Ujian Sekolah",
        avatar: null,
        order: 4,
        isFeatured: false,
        job: "Kepala Sekolah",
      },
    ];
  }
};

// Function to fetch Features data
export const fetchFeaturesData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/features?limit=100&where[isActive][equals]=true&sort=order`
    );
    const featuresData = response.data;

    const processedFeatures = featuresData.docs
      .map((feature, index) => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        image: feature.image
          ? {
              url: feature.image.url.startsWith("http")
                ? feature.image.url
                : `${API_BASE_URL.replace("/api", "")}${feature.image.url}`,
              alt: feature.image.alt || feature.title,
            }
          : null,
        position: feature.position || "left", // 'left' or 'right'
        layout: feature.position || "left", // For component compatibility
        order: feature.order !== undefined ? feature.order : index,
        isActive: feature.isActive !== false,
      }))
      .sort((a, b) => a.order - b.order);

    return processedFeatures;
  } catch (error) {
    console.error("[fetchFeaturesData] Error:", error);

    // Fallback data in case API is not available
    return [
      {
        id: 1,
        title: "Sistem Ujian Cerdas",
        description:
          "Platform ujian online yang dilengkapi dengan teknologi anti-kecurangan dan monitoring real-time untuk memastikan integritas ujian yang maksimal.",
        image: {
          url: "/assets/ilustrasi-hero.png",
          alt: "Sistem Ujian Cerdas",
        },
        position: "left",
        layout: "left",
        order: 0,
        isActive: true,
      },
      {
        id: 2,
        title: "Analitik Komprehensif",
        description:
          "Dashboard analitik yang memberikan insight mendalam tentang performa siswa, statistik ujian, dan laporan yang dapat disesuaikan untuk kebutuhan institusi.",
        image: {
          url: "/assets/ilustrasi-hero.png",
          alt: "Analitik Komprehensif",
        },
        position: "right",
        layout: "right",
        order: 1,
        isActive: true,
      },
      {
        id: 3,
        title: "Keamanan Berlapis",
        description:
          "Sistem keamanan multi-layer dengan enkripsi end-to-end, biometric verification, dan secure browser untuk melindungi data dan menjaga kredibilitas ujian.",
        image: {
          url: "/assets/ilustrasi-hero.png",
          alt: "Keamanan Berlapis",
        },
        position: "left",
        layout: "left",
        order: 2,
        isActive: true,
      },
      {
        id: 4,
        title: "Interface Ramah Pengguna",
        description:
          "Desain yang intuitif dan user-friendly memungkinkan siswa dan pengajar untuk menggunakan platform dengan mudah tanpa memerlukan training yang kompleks.",
        image: {
          url: "/assets/ilustrasi-hero.png",
          alt: "Interface Ramah Pengguna",
        },
        position: "right",
        layout: "right",
        order: 3,
        isActive: true,
      },
    ];
  }
};

// Function to fetch About Section data
export const fetchAboutSectionData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/about-section?limit=1&where[isActive][equals]=true`
    );
    const aboutData = response.data;

    const activeAbout = aboutData.docs.find((item) => item.isActive !== false);

    if (!activeAbout) {
      // Return fallback data if no active about section found
      return {
        title: "What is SIUJI?",
        subtitle: "Platform Ujian Digital untuk Pembelajaran Modern",
        description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.",
        slides: [
          {
            title: "For Teacher",
            description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.",
            images: ["/assets/ilustrasi-hero.png"]
          },
          {
            title: "For Student", 
            description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.",
            images: ["/assets/ilustrasi-hero.png"]
          }
        ],
        carouselConfig: {
          autoSlide: true,
          slideInterval: 3000,
          pauseOnHover: true
        }
      };
    }

    // Process slides data
    const processedSlides = activeAbout.slides?.map((slide, index) => ({
      id: slide.id || index,
      title: slide.title,
      description: slide.description,
      images: slide.images?.map(imageItem => 
        imageItem.image?.url?.startsWith('http')
          ? imageItem.image.url
          : `${API_BASE_URL.replace('/api', '')}${imageItem.image?.url}`
      ) || ["/assets/ilustrasi-hero.png"],
      order: slide.order !== undefined ? slide.order : index
    })).sort((a, b) => a.order - b.order) || [];

    return {
      title: activeAbout.title || "What is SIUJI?",
      subtitle: activeAbout.subtitle || "",
      description: extractPlainText(activeAbout.description) || "",
      slides: processedSlides,
      carouselConfig: activeAbout.carouselConfig || {
        autoSlide: true,
        slideInterval: 3000,
        pauseOnHover: true
      }
    };
  } catch (error) {
    console.error("[fetchAboutSectionData] Error:", error);
    
    // Fallback data in case API is not available
    return {
      title: "What is SIUJI?",
      subtitle: "Platform Ujian Digital untuk Pembelajaran Modern", 
      description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.",
      slides: [
        {
          id: 1,
          title: "For Teacher",
          description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.",
          images: ["/assets/ilustrasi-hero.png"],
          order: 0
        },
        {
          id: 2,
          title: "For Student",
          description: "SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.", 
          images: ["/assets/ilustrasi-hero.png"],
          order: 1
        }
      ],
      carouselConfig: {
        autoSlide: true,
        slideInterval: 3000,
      }
    };
  }
};

// Function to fetch Why Choose Section data
export const fetchWhyChooseSectionData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/why-choose-section?limit=1&where[isActive][equals]=true`
    );
    const whyChooseData = response.data;

    const activeWhyChoose = whyChooseData.docs.find((item) => item.isActive !== false);

    if (!activeWhyChoose) {
      // Return fallback data if no active why choose section found
      return {
        title: "Why Choose SIUJI?",
        subtitle: "Platform ujian digital terdepan untuk institusi pendidikan modern",
        points: [
          {
            title: "Keamanan Berlapis",
            description: "Sistem keamanan canggih dengan teknologi anti-kecurangan dan monitoring real-time untuk menjaga integritas ujian.",
            icon: null,
            sideImage: null
          },
          {
            title: "Mudah Digunakan",
            description: "Interface yang intuitif dan user-friendly memungkinkan guru dan siswa menggunakan platform tanpa kesulitan.",
            icon: null,
            sideImage: null
          },
          {
            title: "Analitik Mendalam",
            description: "Dashboard analitik komprehensif untuk memantau performa siswa dan efektivitas pembelajaran secara real-time.",
            icon: null,
            sideImage: null
          }
        ]
      };
    }

    // Process points data
    const processedPoints = activeWhyChoose.points?.map((point, index) => ({
      title: point.title,
      description: point.description,
      icon: point.icon
        ? {
            url: point.icon.url.startsWith('http')
              ? point.icon.url
              : `${API_BASE_URL.replace('/api', '')}${point.icon.url}`,
            alt: point.icon.alt || point.title
          }
        : null,
      sideImage: point.sideImage
        ? {
            url: point.sideImage.url.startsWith('http')
              ? point.sideImage.url
              : `${API_BASE_URL.replace('/api', '')}${point.sideImage.url}`,
            alt: point.sideImage.alt || point.title
          }
        : null,
      order: index
    })) || [];

    return {
      title: activeWhyChoose.title || "Why Choose SIUJI?",
      subtitle: activeWhyChoose.subtitle || "",
      points: processedPoints
    };
  } catch (error) {
    console.error("[fetchWhyChooseSectionData] Error:", error);
    
    // Fallback data in case API is not available
    return {
      title: "Why Choose SIUJI?",
      subtitle: "Platform ujian digital terdepan untuk institusi pendidikan modern",
      points: [
        {
          title: "Keamanan Berlapis",
          description: "Sistem keamanan canggih dengan teknologi anti-kecurangan dan monitoring real-time untuk menjaga integritas ujian.",
          icon: null,
          sideImage: null,
          order: 0
        },
        {
          title: "Mudah Digunakan", 
          description: "Interface yang intuitif dan user-friendly memungkinkan guru dan siswa menggunakan platform tanpa kesulitan.",
          icon: null,
          sideImage: null,
          order: 1
        },
        {
          title: "Analitik Mendalam",
          description: "Dashboard analitik komprehensif untuk memantau performa siswa dan efektivitas pembelajaran secara real-time.",
          icon: null,
          sideImage: null,
          order: 2
        }
      ]
    };
  }
};

// Function to fetch Testimonials data
export const fetchTestimonials = async () => {
  try {
    // Fetch testimonials data from Payload API with sorting
    const response = await axios.get(`${API_BASE_URL}/testimonials?sort=order&where[isActive][equals]=true`);
    
    if (response.data?.docs) {
      return response.data.docs.map(testimonial => ({
        id: testimonial.id,
        title: testimonial.testimonialTitle || "Online Billing, Invoicing, & Contracts",
        content: testimonial.content,
        name: testimonial.name,
        job: testimonial.position,
        school: testimonial.school,
        avatar: testimonial.avatar ? {
          url: testimonial.avatar.url?.startsWith('http') 
            ? testimonial.avatar.url 
            : `http://localhost:3000${testimonial.avatar.url}`,
          alt: testimonial.avatar.alt || testimonial.name
        } : null,
        isFeatured: testimonial.isFeatured || false,
        order: testimonial.order || 0
      }));
    }
    
    return [];
  } catch (error) {
    console.error("[fetchTestimonials] Error:", error);
    
    // Return fallback data if API fails
    return [
      {
        id: 1,
        title: "Online Billing, Invoicing, & Contracts",
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        name: "Agus",
        job: "Pekerjaan",
        school: "SMK Negeri 1",
        avatar: null,
        isFeatured: false,
        order: 1
      },
      {
        id: 2,
        title: "Online Billing, Invoicing, & Contracts", 
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        name: "Asep",
        job: "Pekerjaan",
        school: "SMK Negeri 2",
        avatar: null,
        isFeatured: false,
        order: 2
      },
      {
        id: 3,
        title: "Online Billing, Invoicing, & Contracts",
        content: "PERSIB JUARA",
        name: "Ujang",
        job: "Pekerjaan", 
        school: "SMK Negeri 3",
        avatar: null,
        isFeatured: true,
        order: 3
      },
      {
        id: 4,
        title: "Online Billing, Invoicing, & Contracts",
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        name: "Kedu",
        job: "Pekerjaan",
        school: "SMK Negeri 4", 
        avatar: null,
        isFeatured: false,
        order: 4
      }
    ];
  }
};
