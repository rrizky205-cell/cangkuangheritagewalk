/**
 * Cangkuang Heritage Walk - Custom Image Auto-Detector & Contextual Applier
 * --------------------------------------------------------------------------
 * Skrip ini secara otomatis mendeteksi dan menerapkan foto kustom yang dimasukkan
 * ke dalam folder-folder di laptop Anda:
 *  - "Menu Beranda (Background)"
 *  - "Menu Fasilitas (Mushola)"
 *  - "Menu Galeri (Arsitektur Candi)"
 *  - dll.
 * 
 * Fitur Utama:
 * 1. Mendukung API server (/api/custom-images) jika dijalankan via server.ps1 / localhost:
 *    Mendukung NAMA FILE APA SAJA (misal: DSC001.jpg, foto_asli.png, candid.jpeg)!
 * 2. Fallback otomatis jika offline / file:// protocol dengan deteksi multi-kandidat cepat.
 * 3. Smart contextual mapping otomatis mendeteksi hero & card meskipun tanpa atribut manual.
 */

(function () {
    'use strict';

    // Daftar nama file populer yang dicek jika API server tidak aktif
    const CANDIDATE_FILENAMES = [
        'foto.jpg', 'foto.png', 'foto.jpeg', 'foto.webp',
        'bg.jpg', 'bg.png', 'bg.jpeg', 'bg.webp',
        'custom.jpg', 'custom.png', 'custom.jpeg', 'custom.webp',
        'background.jpg', 'background.png', 'background.jpeg', 'background.webp',
        '1.jpg', '1.png', '1.jpeg', '1.webp',
        'mushola.jpg', 'candi.jpg', 'rakit.jpg', 'image.jpg', 'gambar.jpg'
    ];

    /**
     * Uji ketersediaan gambar via Image element
     */
    function testImageUrl(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(null);
            img.src = url;
        });
    }

    /**
     * Ambil data gambar dari API server lokal atau file static json di Vercel
     */
    async function fetchCustomImagesFromApi() {
        if (window.location.protocol === 'file:') return null;
        try {
            // Cek file JSON relatif (berfungsi sempurna di Vercel & static hosting)
            const resStatic = await fetch('./api/custom-images.json', { cache: 'no-cache' }).catch(() => null);
            if (resStatic && resStatic.ok) {
                return await resStatic.json();
            }
            // Fallback ke endpoint API localhost (server.ps1 / server.js / server.py)
            const res = await fetch('/api/custom-images', { cache: 'no-cache' }).catch(() => null);
            if (res && res.ok) {
                return await res.json();
            }
        } catch (e) {
            // Server API tidak tersedia (misal diakses via file://)
        }
        return null;
    }

    /**
     * Cari gambar yang valid di dalam folder tertentu
     */
    async function resolveFolderImage(folderName, apiMapping) {
        // Cek apakah server API sudah memberikan path file langsung
        if (apiMapping && apiMapping[folderName]) {
            const p = apiMapping[folderName];
            return p.startsWith('http') || p.startsWith('./') ? p : `./${p}`;
        }

        // Cek versi case-insensitive pada mapping API
        if (apiMapping) {
            const lowerFolder = folderName.toLowerCase();
            for (const key in apiMapping) {
                if (key.toLowerCase() === lowerFolder) {
                    const p = apiMapping[key];
                    return p.startsWith('http') || p.startsWith('./') ? p : `./${p}`;
                }
            }
            // Jika mapping API aktif dan berhasil di-fetch, maka folder yang tidak ada di mapping
            // dipastikan tidak memiliki foto kustom. Hentikan agar tidak membombardir 404 ke jaringan online.
            return null;
        }

        // Fallback: Probe candidate filenames secara paralel (hanya untuk mode file:// offline)
        const encodedFolder = encodeURIComponent(folderName).replace(/%2F/g, '/');
        const probePromises = CANDIDATE_FILENAMES.map(filename => {
            const path = `./${encodedFolder}/${filename}`;
            return testImageUrl(path);
        });

        const results = await Promise.all(probePromises);
        return results.find(url => url !== null) || null;
    }

    /**
     * Terapkan gambar ke elemen HTML (baik background CSS maupun tag <img>)
     */
    function applyImage(element, imageUrl) {
        if (!element || !imageUrl) return;
        const validUrl = imageUrl.startsWith('http') || imageUrl.startsWith('./') ? imageUrl : `./${imageUrl}`;

        if (element.tagName.toLowerCase() === 'img') {
            element.src = validUrl;
            element.setAttribute('data-loaded-custom', 'true');
        } else {
            const childImg = element.querySelector('img');
            if (childImg && !element.classList.contains('page-hero') && !element.classList.contains('hero-section')) {
                childImg.src = validUrl;
                childImg.setAttribute('data-loaded-custom', 'true');
            } else {
                // Terapkan sebagai background-image dengan mempertahankan gradien kontras gelap
                const existingBg = window.getComputedStyle(element).backgroundImage;
                if (existingBg && existingBg.includes('gradient')) {
                    const gradientMatch = existingBg.match(/(linear-gradient\([^)]+\)|radial-gradient\([^)]+\))/);
                    if (gradientMatch) {
                        element.style.backgroundImage = `${gradientMatch[0]}, url("${validUrl}")`;
                    } else {
                        element.style.backgroundImage = `linear-gradient(rgba(18, 22, 18, 0.72), rgba(18, 22, 18, 0.85)), url("${validUrl}")`;
                    }
                } else {
                    element.style.backgroundImage = `linear-gradient(rgba(18, 22, 18, 0.72), rgba(18, 22, 18, 0.85)), url("${validUrl}")`;
                }
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
            }
        }
    }

    /**
     * Deteksi dan terapkan gambar secara cerdas di seluruh halaman
     */
    async function scanAndApplyAll() {
        const apiMapping = await fetchCustomImagesFromApi();
        const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

        // 1. Terapkan ke semua elemen yang memiliki atribut 'data-custom-folder'
        const explicitElements = document.querySelectorAll('[data-custom-folder]');
        for (const el of explicitElements) {
            const folder = el.getAttribute('data-custom-folder');
            if (folder) {
                const imgUrl = await resolveFolderImage(folder, apiMapping);
                if (imgUrl) applyImage(el, imgUrl);
            }
        }

        // 2. Smart Contextual Detection untuk Hero Background setiap menu
        let heroFolder = null;
        if (currentPage.includes('index') || currentPage === '' || currentPage === '/') {
            heroFolder = 'Menu Beranda (Background)';
        } else if (currentPage.includes('spot-wisata')) {
            heroFolder = 'Menu Spot Wisata (Background)';
        } else if (currentPage.includes('fasilitas')) {
            heroFolder = 'Menu Fasilitas (Background)';
        } else if (currentPage.includes('sejarah')) {
            heroFolder = 'Menu Sejarah (Background)';
        } else if (currentPage.includes('galeri')) {
            heroFolder = 'Menu Galeri (Background)';
        } else if (currentPage.includes('virtual-tour')) {
            heroFolder = 'Menu Virtual Tour (Background)';
        } else if (currentPage.includes('tiket')) {
            heroFolder = 'Menu Tiket (Background)';
        } else if (currentPage.includes('eksklusif')) {
            heroFolder = 'Menu Beranda (Background)';
        }

        if (heroFolder) {
            const heroElem = document.querySelector('.hero-portal, .subpage-hero, .page-hero, .hero, .hero-section, #hero, header.hero');
            if (heroElem && !heroElem.hasAttribute('data-loaded-custom')) {
                const imgUrl = await resolveFolderImage(heroFolder, apiMapping);
                if (imgUrl) applyImage(heroElem, imgUrl);
            }
        }

        // 3. Smart Contextual Detection untuk Galeri & Spot Wisata jika tidak ada atribut
        if (currentPage.includes('galeri')) {
            const candiItems = document.querySelectorAll('[data-category*="candi"], .candi-item, .gallery-item:nth-child(1)');
            for (const el of candiItems) {
                const imgUrl = await resolveFolderImage('Menu Galeri (Arsitektur Candi)', apiMapping);
                if (imgUrl) applyImage(el, imgUrl);
            }
            const puloItems = document.querySelectorAll('[data-category*="pulo"], .pulo-item, .gallery-item:nth-child(2)');
            for (const el of puloItems) {
                const imgUrl = await resolveFolderImage('Menu Galeri (Kehidupan Kampung Pulo)', apiMapping);
                if (imgUrl) applyImage(el, imgUrl);
            }
            const alamItems = document.querySelectorAll('[data-category*="alam"], .alam-item, .gallery-item:nth-child(3)');
            for (const el of alamItems) {
                const imgUrl = await resolveFolderImage('Menu Galeri (Keindahan Alam)', apiMapping);
                if (imgUrl) applyImage(el, imgUrl);
            }
        }

        if (currentPage.includes('spot-wisata')) {
            const candiCard = document.querySelector('[data-spot*="candi"], .card-candi, .spot-card:nth-child(1)');
            if (candiCard) {
                const imgUrl = await resolveFolderImage('Menu Spot Wisata (Candi Cangkuang)', apiMapping);
                if (imgUrl) applyImage(candiCard, imgUrl);
            }
            const puloCard = document.querySelector('[data-spot*="pulo"], .card-pulo, .spot-card:nth-child(2)');
            if (puloCard) {
                const imgUrl = await resolveFolderImage('Menu Spot Wisata (Kampung Pulo)', apiMapping);
                if (imgUrl) applyImage(puloCard, imgUrl);
            }
            const situCard = document.querySelector('[data-spot*="situ"], .card-situ, .spot-card:nth-child(3)');
            if (situCard) {
                const imgUrl = await resolveFolderImage('Menu Spot Wisata (Situ Cangkuang)', apiMapping);
                if (imgUrl) applyImage(situCard, imgUrl);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanAndApplyAll);
    } else {
        scanAndApplyAll();
    }
})();
