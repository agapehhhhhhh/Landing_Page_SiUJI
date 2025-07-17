import payload from 'payload'

export const seedLandingPageCollections = async () => {
  try {
    console.log('Starting to seed landing page collections...')

    // 1. Seed basic Landing Page Content sections
    console.log('Seeding Landing Page Content sections...')
    
    const landingPageSections = [
      {
        section: 'hero',
        title: 'Revolusikan Pendidikan Anda dengan SiUJI',
        subtitle: 'Platform Ujian Digital untuk Pembelajaran Modern',
        description: 'Transformasikan ujian tradisional menjadi pengalaman digital yang menarik. SiUJI memberdayakan pendidik untuk membuat, mengelola, dan memantau ujian online dengan wawasan real-time dan analitik komprehensif.',
        ctaText: 'Mulai Sekarang',
        ctaLink: '/register',
        isActive: true,
        order: 1
      },
      {
        section: 'about',
        title: 'Apa itu SIUJI?',
        subtitle: 'Solusi Pendidikan Digital Lengkap Anda',
        description: 'SIUJI adalah platform yang memungkinkan pendidik membuat kelas online dimana mereka dapat menyimpan materi kursus secara online; mengelola tugas, kuis dan ujian; memantau tenggat waktu; menilai hasil dan memberikan umpan balik kepada siswa semuanya dalam satu tempat.',
        isActive: true,
        order: 2
      },
      {
        section: 'why-choose',
        title: 'Mengapa Memilih Kami?',
        subtitle: 'Rasakan Masa Depan Pendidikan Digital',
        isActive: true,
        order: 3
      },
      {
        section: 'platform',
        title: 'Kini SIUJI sudah tersedia di 3 platform',
        subtitle: 'Akses Dimana Saja, Kapan Saja',
        description: 'Akses SIUJI sesuai kebutuhan Anda: melalui web browser untuk akses cepat, atau unduh aplikasi di Android dan iOS.',
        isActive: true,
        order: 4
      },
      {
        section: 'social-proof',
        title: 'Dipercaya oleh 1.234 Perusahaan di Seluruh Dunia',
        subtitle: 'Bergabunglah dengan Institusi Terdepan',
        isActive: true,
        order: 7
      },
      {
        section: 'contact',
        title: 'Hubungi Kami!',
        subtitle: 'Siap Mentransformasi Pendidikan Anda?',
        description: 'Punya pertanyaan tentang SiUJI atau butuh solusi khusus? Tim kami siap membantu Anda mendigitalkan proses ujian.',
        isActive: true,
        order: 10
      }
    ]

    for (const section of landingPageSections) {
      await payload.create({
        collection: 'landing-page-content',
        data: section
      })
    }

    console.log('Landing page content sections seeded successfully!')
    console.log('To seed other collections, run the CMS and use the admin panel.')
    console.log('Collections available:')
    console.log('- Features: /admin/collections/features')
    console.log('- Testimonials: /admin/collections/testimonials') 
    console.log('- Pricing Plans: /admin/collections/pricing-plans')
    console.log('- FAQ: /admin/collections/faq')
    console.log('- Partners: /admin/collections/partners')
    console.log('- Platform Availability: /admin/collections/platform-availability')

  } catch (error) {
    console.error('Error seeding landing page collections:', error)
    throw error
  }
}
