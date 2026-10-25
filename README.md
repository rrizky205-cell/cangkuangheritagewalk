# 🏛️ Candi Cangkuang Heritage Walk - Garut, Jawa Barat
> **Portal Resmi Pariwisata & Situs Cagar Budaya Candi Cangkuang**
> Arsitektur Multi-Halaman Bersih (Clean Multi-Page Architecture) & Dedicated Views.

---

## 🌟 Pembaruan Struktur & Pengalaman Pengguna (UX)
Sesuai arahan terbaru, website ini telah dirancang dengan arsitektur **Multi-Halaman Terpisah (Modular Multi-Page)**:
* **Beranda (`index.html`)** disempurnakan menjadi *Executive Summary & Portal Directory*. Beranda hanya memuat ringkasan eksekutif, sorotan utama, dan kartu penunjuk arah yang elegan. Beranda tidak lagi memuat seluruh isi yang panjang secara bertumpuk.
* **Setiap Menu Memiliki Halaman Khusus Mandiri:** Ketika pengguna mengklik menu di navbar (Eksklusif, Spot Wisata, Sejarah, Virtual Tour, Galeri, atau Tiket), pengguna langsung diarahkan ke halaman khusus menu tersebut tanpa harus menggulir beranda.

---

## 📂 Struktur Berkas Proyek
```text
E:\AG\Cangkuang Heritage Walk\
│
├── index.html              # Beranda (Portal Ringkasan Eksekutif & Direktori Menu)
├── eksklusif.html          # Halaman Eksklusif & Hidden Insights (Arca Batara Guru, Naskah Saeh, Falsafah 6 Rumah, Trivia)
├── spot-wisata.html        # Halaman Spot Wisata Lengkap (Candi, Kampung Pulo, Situ, Museum, Makam & Fasilitas)
├── sejarah.html            # Halaman Sejarah & Linimasa (Kronologi Abad ke-8 s/d Sekarang, Tokoh Penemu)
├── virtual-tour.html       # Halaman Peta & Virtual Tour (Spot Video Switcher, Simulator 360°, Google Maps)
├── galeri.html             # Halaman Galeri Foto & Multimedia (Filter Kategori & Lightbox Canggih)
├── tiket.html              # Halaman Tiket & Reservasi (Tabel Tarif, Kalkulator Real-Time, Booking Form)
│
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet responsif terpadu dengan token warna design.md
│   ├── js/
│   │   └── main.js         # Engine modular (Video Switcher, 360° Panorama Canvas, Lightbox, Web Audio API)
│   └── images/             # Folder aset gambar cadangan lokal
│
├── start-server.bat        # 🚀 1-KLIK LOCALHOST LAUNCHER (Cukup klik ganda di Windows!)
├── server.ps1              # Native PowerShell HTTP Server (Tanpa perlu install software tambahan)
├── server.py               # Alternatif server berbasis Python 3
├── server.js               # Alternatif server berbasis Node.js
├── design.md               # Panduan Desain & Palet Warna
├── rules.md                # Panduan Teknis & Modularitas
└── README.md               # Dokumentasi Proyek
```

---

## 🚀 Cara Menjalankan Localhost (Sangat Mudah!)

### Cara 1: Menggunakan 1-Klik Launcher (Paling Direkomendasikan di Windows)
1. Buka folder `E:\AG\Cangkuang Heritage Walk\` di Windows Explorer.
2. **Klik ganda (*double-click*) file `start-server.bat`**.
3. Server lokal akan langsung berjalan pada `http://localhost:8080/` dan browser default Anda (Chrome, Edge, dll.) akan **terbuka secara otomatis**!
4. *Server ini menggunakan native PowerShell HttpListener bawaan Windows, jadi 100% bekerja langsung tanpa perlu menginstal Python atau Node.js!*

### Cara 2: Membuka File Langsung
* Anda juga dapat langsung membuka berkas [`index.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/index.html) langsung di browser.

### Cara 3: Melalui Terminal / PowerShell
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

---

## 🎨 Ringkasan Menu & Halaman
1. **Beranda ([`index.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/index.html)):**
   Ringkasan visual megah, audio ambience Sunda, highlight rakit getek bambu, dan kartu portal menuju setiap halaman khusus.
2. **Eksklusif ([`eksklusif.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/eksklusif.html)):**
   Arca Dewa Siwa bertangan empat, naskah khutbah Idul Fitri kulit kayu Saeh, 4 pantangan sakral Kampung Pulo, dan trivia card interaktif.
3. **Spot Wisata ([`spot-wisata.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/spot-wisata.html)):**
   5 spot wisata mendalam, tips foto, jam buka, dan fasilitas penunjang lengkap.
4. **Sejarah & Budaya ([`sejarah.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/sejarah.html)):**
   Linimasa kronologis interaktif (Abad 8, Abad 17, 1893, 1966, 1974-1976, Era Modern) serta profil tokoh penemu.
5. **Peta & Virtual Tour ([`virtual-tour.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/virtual-tour.html)):**
   Simulator 360° interaktif (drag to pan), spot video switcher (16:9), dan peta rute transportasi.
6. **Galeri ([`galeri.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/galeri.html)):**
   Galeri foto berfitur lightbox (navigasi keyboard `Esc`, panah kiri/kanan), filter kategori, dan video dokumenter.
7. **Tiket & Reservasi ([`tiket.html`](file:///E:/AG/Cangkuang%20Heritage%20Walk/tiket.html)):**
   Kalkulator estimasi biaya rombongan real-time dalam format Rupiah dan formulir booking online.
