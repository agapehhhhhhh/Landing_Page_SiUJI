// src/services/payloadService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchLandingPage = async () => {
  try {
    const [hero] = await Promise.all([
      axios
        .get(`${API_BASE_URL}/hero-section`)
        .then((res) => res.data.docs?.[0]),
    ]);
    
    // Process hero data from API
    let processedHero = null;
    if (hero) {
      processedHero = {
        ...hero,
        // Fix hero image URL - add base URL if it's relative
        heroImage: hero.heroImage ? {
          ...hero.heroImage,
          url: hero.heroImage.url.startsWith('http') 
            ? hero.heroImage.url 
            : `${API_BASE_URL.replace('/api', '')}${hero.heroImage.url}`
        } : { url: "/assets/ilustrasi-hero.png" }
      };
    }
    
    return {
      hero: processedHero ?? {
        title: "Headline Utama Dari Aplikasi SIUJIII",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ctaText: "Get Started Now",
        heroImage: { url: "/assets/ilustrasi-hero.png" },
      },
      portofolio: [
        { url: "/assets/logo1.png", alt: "Logo 1" },
        { url: "/assets/logo2.jpeg", alt: "Logo 2" },
      ],
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
    };
  }
};

export const fetchFAQData = async () => {
  try {
    // Sementara menggunakan data statis, nanti bisa diganti dengan API call
    // const response = await axios.get(`${API_BASE_URL}/faq`);
    // return response.data;

    return {
      categories: [
        { id: "all", name: "All Questions" },
        { id: "feature", name: "Feature" },
        { id: "general", name: "General" },
        { id: "business", name: "Business" },
        { id: "technical", name: "Technical" },
        { id: "technical", name: "Technical" },
        { id: "technical", name: "Technical" },
      ],
      faqs: [
        // Feature FAQs
        {
          id: 1,
          categoryId: "feature",
          question: "Apa saja fitur utama yang tersedia di SiUJI?",
          answer:
            "SiUJI menyediakan berbagai fitur unggulan seperti sistem manajemen ujian online, monitoring real-time, analisis hasil ujian otomatis, bank soal yang dapat disesuaikan, dan sistem keamanan berlapis untuk memastikan integritas ujian.",
          isOpen: false,
        },
        {
          id: 2,
          categoryId: "feature",
          question: "Apakah SiUJI mendukung berbagai jenis soal?",
          answer:
            "Ya, SiUJI mendukung multiple choice, essay, true/false, matching, dan berbagai format soal lainnya untuk memenuhi kebutuhan ujian yang beragam.",
          isOpen: false,
        },
        {
          id: 3,
          categoryId: "feature",
          question: "Bisakah membuat laporan hasil ujian secara otomatis?",
          answer:
            "SiUJI dapat menghasilkan laporan komprehensif secara otomatis dengan analisis statistik, grafik performa, dan insights yang membantu evaluasi pembelajaran.",
          isOpen: false,
        },
        {
          id: 4,
          categoryId: "feature",
          question: "Apakah ada fitur anti-cheating di SiUJI?",
          answer:
            "Ya, SiUJI dilengkapi dengan sistem anti-cheating canggih termasuk browser lockdown, face recognition, screen monitoring, dan deteksi perilaku mencurigakan secara real-time.",
          isOpen: false,
        },
        {
          id: 5,
          categoryId: "feature",
          question: "Bagaimana sistem penilaian otomatis bekerja?",
          answer:
            "Sistem penilaian otomatis SiUJI menggunakan algoritma cerdas untuk mengoreksi jawaban, memberikan feedback instant, dan menghitung skor dengan akurasi tinggi.",
          isOpen: false,
        },

        // General FAQs
        {
          id: 6,
          categoryId: "general",
          question: "Bagaimana cara memulai menggunakan SiUJI?",
          answer:
            "Untuk memulai menggunakan SiUJI, Anda dapat mendaftar akun melalui website resmi kami, kemudian melakukan verifikasi email, dan mengikuti tutorial setup yang telah disediakan.",
          isOpen: false,
        },
        {
          id: 7,
          categoryId: "general",
          question: "Apakah SiUJI dapat digunakan untuk ujian berskala besar?",
          answer:
            "Tentu saja! SiUJI dirancang untuk menangani ujian dengan ribuan peserta secara bersamaan dengan performa yang stabil dan reliabel.",
          isOpen: false,
        },
        {
          id: 8,
          categoryId: "general",
          question: "Bagaimana cara membuat soal ujian di SiUJI?",
          answer:
            "Anda dapat membuat soal melalui dashboard admin dengan mudah. Sistem kami menyediakan editor yang user-friendly untuk berbagai jenis soal.",
          isOpen: false,
        },
        {
          id: 9,
          categoryId: "general",
          question: "Apakah SiUJI mendukung ujian offline?",
          answer:
            "SiUJI memiliki fitur offline mode yang memungkinkan peserta tetap mengerjakan ujian meski koneksi internet terputus, dan data akan tersinkronisasi otomatis saat koneksi pulih.",
          isOpen: false,
        },
        {
          id: 10,
          categoryId: "general",
          question: "Bagaimana cara mengunduh hasil ujian?",
          answer:
            "Hasil ujian dapat diunduh dalam berbagai format seperti PDF, Excel, atau CSV melalui dashboard admin dengan sekali klik.",
          isOpen: false,
        },

        // Business FAQs
        {
          id: 11,
          categoryId: "business",
          question: "Apakah data ujian akan aman tersimpan?",
          answer:
            "SiUJI menggunakan enkripsi tingkat enterprise dan mematuhi standar keamanan internasional untuk memastikan data ujian dan peserta terlindungi dengan baik.",
          isOpen: false,
        },
        {
          id: 12,
          categoryId: "business",
          question: "Apakah tersedia support 24/7?",
          answer:
            "Ya, kami menyediakan layanan customer support 24/7 melalui berbagai channel komunikasi untuk memastikan kelancaran ujian Anda.",
          isOpen: false,
        },
        {
          id: 13,
          categoryId: "business",
          question: "Bagaimana SLA yang ditawarkan SiUJI?",
          answer:
            "Kami menjamin uptime 99.9% untuk pelanggan enterprise dengan monitoring 24/7 dan dukungan teknis yang responsif.",
          isOpen: false,
        },

        // Technical FAQs
        {
          id: 14,
          categoryId: "technical",
          question:
            "Apakah SiUJI dapat diintegrasikan dengan sistem LMS yang sudah ada?",
          answer:
            "Ya, SiUJI mendukung integrasi dengan berbagai platform LMS populer seperti Moodle, Canvas, dan Blackboard melalui API yang telah disediakan.",
          isOpen: false,
        },
        {
          id: 15,
          categoryId: "technical",
          question: "Apa saja persyaratan sistem untuk menggunakan SiUJI?",
          answer:
            "Persyaratan minimum meliputi RAM 4GB, browser modern (Chrome, Firefox, Safari, Edge), dan koneksi internet yang stabil.",
          isOpen: false,
        },
        {
          id: 16,
          categoryId: "technical",
          question: "Bagaimana mengatasi masalah koneksi saat ujian?",
          answer:
            "Periksa koneksi internet Anda, bersihkan cache browser, atau coba gunakan browser yang berbeda. Tim support kami siap membantu jika masalah berlanjut.",
          isOpen: false,
        },

        // Pricing FAQs
        {
          id: 17,
          categoryId: "pricing",
          question: "Berapa biaya berlangganan SiUJI?",
          answer:
            "SiUJI menawarkan berbagai paket berlangganan mulai dari paket basic hingga enterprise. Silakan hubungi tim sales kami untuk mendapatkan penawaran yang sesuai dengan kebutuhan institusi Anda.",
          isOpen: false,
        },
        {
          id: 18,
          categoryId: "pricing",
          question: "Apakah ada trial gratis untuk mencoba SiUJI?",
          answer:
            "Ya, kami menyediakan trial gratis selama 14 hari dengan akses penuh ke semua fitur premium untuk membantu Anda mengevaluasi platform kami.",
          isOpen: false,
        },
      ],
    };
  } catch (error) {
    console.error("[fetchFAQData] Error:", error);
    return {
      categories: [{ id: "general", name: "General" }],
      faqs: [
        {
          id: 1,
          categoryId: "general",
          question: "How can we help you?",
          answer: "Please contact our support team for assistance.",
          isOpen: false,
        },
      ],
    };
  }
};
