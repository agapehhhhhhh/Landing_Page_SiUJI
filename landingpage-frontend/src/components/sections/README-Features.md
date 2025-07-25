# Features Components Documentation

## Overview
Terdapat 2 component untuk menampilkan features section:

1. **FeaturesSection.vue** - Component khusus dengan layout gambar di kanan
2. **FeatureItem.vue** - Component reusable yang bisa digunakan untuk layout gambar di kanan atau kiri

**Perubahan Design:**
- Setiap component menampilkan 1 fitur tunggal (tidak ada multiple features)
- Tidak ada icon/emoji
- Background hijau sebagai bingkai gambar
- Layout text dan gambar yang clean

## FeaturesSection.vue

Component untuk menampilkan satu fitur dengan layout gambar di kanan.

### Props:
- `title` (String) - Judul section
- `subtitle` (String) - Subtitle section  
- `featureTitle` (String) - Judul fitur
- `description` (String) - Deskripsi fitur
- `imageSrc` (String) - Path gambar
- `layout` (String) - 'right' atau 'left' untuk posisi gambar
- `showHeader` (Boolean) - Tampilkan header section atau tidak (default: true)

### Usage:
```vue
<!-- Dengan Header (untuk section pertama) -->
<FeaturesSection 
  title="Our Feature"
  subtitle="This very extraordinary feature, can make learning activities more efficient"
  feature-title="Lorem Ipsum dolor sit amet"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  image-src="/assets/ilustrasi-hero.png"
  layout="right"
  :show-header="true"
/>

<!-- Tanpa Header (untuk section selanjutnya) -->
<FeaturesSection 
  feature-title="Fast Performance"
  description="Lightning-fast loading times and optimized performance..."
  image-src="/assets/ilustrasi-hero.png"
  layout="left"
  :show-header="false"
/>
```

## FeatureItem.vue

Component reusable yang sama dengan FeaturesSection, bisa digunakan untuk layout gambar kanan/kiri.

### Props:
- `title` (String) - Judul section
- `subtitle` (String) - Subtitle section  
- `featureTitle` (String) - Judul fitur
- `description` (String) - Deskripsi fitur
- `imageSrc` (String) - Path gambar
- `layout` (String) - 'right' atau 'left' untuk posisi gambar
- `showHeader` (Boolean) - Tampilkan header section atau tidak (default: true)

### Usage:

#### Layout Gambar Kanan (dengan header):
```vue
<FeatureItem 
  title="Our Feature"
  subtitle="This very extraordinary feature, can make learning activities more efficient"
  feature-title="Lorem Ipsum dolor sit amet"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  image-src="/assets/ilustrasi-hero.png"
  layout="right"
  :show-header="true"
/>
```

#### Layout Gambar Kiri (tanpa header):
```vue
<FeatureItem 
  feature-title="Fast Performance"
  description="Lightning-fast loading times and optimized performance..."
  image-src="/assets/ilustrasi-hero.png"
  layout="left"
  :show-header="false"
/>
```

## Design Features:
- **Single Feature Display**: Setiap component menampilkan 1 fitur saja
- **No Icons**: Tidak menggunakan emoji atau icon
- **Green Frame**: Background hijau gradient sebagai bingkai gambar (350x350px)
- **Dynamic Wave Background**: Background wave yang mengikuti posisi gambar (kiri/kanan)
- **Conditional Header**: Header besar hanya untuk section pertama, selanjutnya hanya gambar + deskripsi
- **Clean Layout**: Layout text dan gambar yang sederhana dan elegant
- **Larger Images**: Foto diperbesar dengan padding yang dikurangi (20px)
- **Responsive**: Fully responsive untuk semua device
- **Reusable**: Component bisa digunakan berulang dengan props berbeda

## Styling:
- Background: White dengan wave pattern overlay (opacity 0.1)
- Wave Direction: Mengikuti layout gambar (left wave untuk left layout, right wave untuk right layout)
- Image Frame: Green gradient background (350x350px) dengan padding 20px
- Image: object-fit cover untuk mengisi penuh frame
- Typography: Large title (2rem) dengan description yang readable
- Spacing: Optimal spacing untuk readability
- Shadow: Subtle green shadow pada frame gambar
- Header Control: `showHeader` prop untuk mengontrol tampilan header section
