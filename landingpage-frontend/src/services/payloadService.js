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
      processedHero = {
        ...hero,
        // Fix hero image URL - add base URL if it's relative
        heroImage: hero.heroImage
          ? {
              ...hero.heroImage,
              url: hero.heroImage.url.startsWith("http")
                ? hero.heroImage.url
                : `${API_BASE_URL.replace("/api", "")}${hero.heroImage.url}`,
            }
          : { url: "/assets/ilustrasi-hero.png" },
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
        monthlyPrice: plan.monthlyPrice?.toString() || "0",
        yearlyPrice: plan.yearlyPrice?.toString() || "0",
        savings: plan.savings || null,
        buttonText: plan.buttonText || "Get Started",
        features: plan.features || [],
        isPopular: plan.isPopular || false,
        order: plan.order !== undefined ? plan.order : index,
        isActive: plan.isActive !== false,
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
          name: "Starter",
          type: "starter",
          description:
            "Perfect untuk institusi pendidikan kecil yang baru memulai digitalisasi ujian",
          monthlyPrice: "0",
          yearlyPrice: "0",
          buttonText: "Mulai Gratis",
          features: [
            "Maksimal 50 siswa per ujian",
            "3 template soal dasar",
            "Laporan hasil sederhana",
            "Support email standar",
            "Penyimpanan 1GB",
            "Akses dashboard basic",
            "Export hasil format PDF",
          ],
          isPopular: false,
          order: 0,
          isActive: true,
          icon: null,
        },
        {
          id: 2,
          name: "Professional",
          type: "professional",
          description:
            "Solusi lengkap untuk sekolah menengah dan institusi pendidikan standar",
          monthlyPrice: "29",
          yearlyPrice: "290",
          savings: "Hemat $58 per tahun",
          buttonText: "Pilih Professional",
          features: [
            "Maksimal 500 siswa per ujian",
            "Semua template soal tersedia",
            "Analitik mendalam & insight",
            "Anti-cheating dasar",
            "Support prioritas 24/7",
            "Penyimpanan 25GB",
            "Integrasi LMS populer",
            "Bank soal dengan kategori",
            "Auto-grading untuk essay",
            "Mobile app access",
          ],
          isPopular: true,
          order: 1,
          isActive: true,
          icon: null,
        },
        {
          id: 3,
          name: "Business",
          type: "business",
          description:
            "Untuk universitas dan institusi besar dengan kebutuhan ujian skala besar",
          monthlyPrice: "79",
          yearlyPrice: "790",
          savings: "Hemat $158 per tahun",
          buttonText: "Pilih Business",
          features: [
            "Unlimited siswa per ujian",
            "Advanced anti-cheating AI",
            "Custom branding lengkap",
            "API access penuh",
            "Dedicated account manager",
            "Penyimpanan 100GB",
            "Custom integrations",
            "White-label solution",
            "Advanced reporting",
            "Multi-campus support",
            "Proctoring features",
            "SSO integration",
          ],
          isPopular: false,
          order: 2,
          isActive: true,
          icon: null,
        },
        {
          id: 4,
          name: "Enterprise",
          type: "enterprise",
          description:
            "Solusi korporat untuk organisasi besar dengan kebutuhan khusus dan keamanan tinggi",
          monthlyPrice: "199",
          yearlyPrice: "1990",
          savings: "Hemat $398 per tahun",
          buttonText: "Hubungi Sales",
          features: [
            "Unlimited everything",
            "Enterprise-grade security",
            "24/7 dedicated support",
            "On-premise deployment",
            "Custom development",
            "Unlimited storage",
            "SLA guarantee 99.9%",
            "Multi-region hosting",
            "Compliance certifications",
            "Advanced audit logs",
            "Custom workflows",
            "Priority feature requests",
          ],
          isPopular: false,
          order: 3,
          isActive: true,
          icon: null,
        },
        {
          id: 5,
          name: "Education Plus",
          type: "education-plus",
          description:
            "Paket khusus untuk institusi pendidikan dengan fitur pembelajaran adaptif",
          monthlyPrice: "49",
          yearlyPrice: "490",
          savings: "Hemat $98 per tahun",
          buttonText: "Pilih Education Plus",
          features: [
            "Maksimal 1000 siswa per ujian",
            "AI-powered analytics",
            "Adaptive learning insights",
            "Parent portal access",
            "Mobile app premium",
            "Penyimpanan 50GB",
            "Training & onboarding",
            "Custom reporting dashboard",
            "Student progress tracking",
            "Performance predictions",
            "Learning path recommendations",
          ],
          isPopular: false,
          order: 4,
          isActive: true,
          icon: null,
        },
        {
          id: 6,
          name: "Academic Premium",
          type: "academic-premium",
          description:
            "Solusi premium untuk institusi akademik dengan fitur penelitian dan kolaborasi",
          monthlyPrice: "129",
          yearlyPrice: "1290",
          savings: "Hemat $258 per tahun",
          buttonText: "Pilih Academic Premium",
          features: [
            "Unlimited siswa & staff",
            "Research collaboration tools",
            "Advanced analytics suite",
            "Multi-language support",
            "Global compliance ready",
            "Unlimited storage",
            "Academic calendar integration",
            "Plagiarism detection",
            "Video conferencing integration",
            "Advanced security features",
            "Custom assessment types",
            "Institutional reporting",
          ],
          isPopular: false,
          order: 5,
          isActive: true,
          icon: null,
        },
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
