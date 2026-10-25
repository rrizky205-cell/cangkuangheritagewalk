# Project Rules & Guidelines - Website Wisata Candi Cangkuang

Dokumen ini berisi aturan teknis, standar kode, dan alur kerja pengembangan website Candi Cangkuang agar terstruktur dengan baik.

## 1. Standar Teknologi & Struktur File
- **Teknologi Utama:** HTML5, CSS3 (Modern Flexbox & Grid), dan Vanilla JavaScript (ES6+).
- **Struktur Folder:**
  /
  ├── index.html       # Halaman utama (Landing Page)
  ├── assets/
  │   ├── css/
  │   │   └── style.css  # File styling utama
  │   ├── js/
  │   │   └── main.js    # Logika interaktif & Spot-Based Video Player
  │   └── images/      # Folder cadangan gambar lokal (jika diperlukan)
  └── README.md        # Dokumentasi proyek

## 2. Aturan Fitur Utama (Virtual Tour & Spot-Based Video)
- **Modularitas Video:** Fitur Virtual Tour wajib menggunakan sistem *Dynamic Video Switching* (berbasis klik tombol spot).
- **Sumber Video:** Menggunakan embed iframe YouTube yang responsif (`aspect-ratio: 16/9`).
- **Placeholder:** Selama video asli belum diunggah, gunakan video dummy/embed placeholder resmi yang stabil.

## 3. Standar Penulisan Kode (Clean Code)
- **HTML:** Gunakan semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`). Berikan komentar yang jelas pada setiap section utama.
- **CSS:** Gunakan CSS Variables (`:root`) untuk manajemen warna konsisten. Hindari penggunaan inline CSS yang berlebihan.
- **JavaScript:** Gunakan fungsi modular (arrow functions) untuk menangani event klik pada tombol spot virtual tour dan galeri lightbox.

## 4. Performa & SEO Dasar
- **Optimasi Gambar:** Setiap gambar eksternal/placeholder harus memiliki atribut `loading="lazy"` agar halaman termuat lebih cepat.
- **Responsivitas:** Wajib menggunakan *Mobile-First Approach* atau *Media Queries* yang solid agar tampilan tetap rapi di layar HP maupun Laptop.