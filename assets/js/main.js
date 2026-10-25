/**
 * ==========================================================================
 * CANDI CANGKUANG HERITAGE WALK - CORE INTERACTIVE ENGINE
 * Modern Vanilla JavaScript (ES6+) conforming to rules.md & design.md
 * Modular Architecture supporting Multi-Page & Dedicated Menu Views
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DATA STORES: VIRTUAL TOUR SPOTS & MODAL DETAILS
  // ------------------------------------------------------------------------
  const tourSpotsData = [
    {
      id: 1,
      title: 'Kompleks Candi Cangkuang Utama',
      tag: 'Candi Hindu Abad ke-8',
      subtitle: 'Satu-satunya peninggalan candi Hindu di tanah Pasundan',
      videoUrl: 'https://www.youtube.com/embed/EhoBqkJ87tI?autoplay=1&mute=1&rel=0&modestbranding=1',
      description: 'Candi berdenah bujur sangkar 4,5 x 4,5 meter ini didirikan pada abad ke-8 Masehi pada masa Kerajaan Sunda kuno. Ditemukan kembali tahun 1966 oleh tim arkeolog pimpinan Drs. Uka Tjandrasasmita. Di dalam ruangan utama candi terdapat lapik berhias arca Siwa/Batara Guru yang melambangkan keagungan peradaban masa lampau.'
    },
    {
      id: 2,
      title: 'Kampung Adat Pulo & 6 Rumah Berjajar',
      tag: 'Kearifan Lokal Sunda',
      subtitle: 'Komunitas adat matrilineal dengan aturan leluhur yang abadi',
      videoUrl: 'https://www.youtube.com/embed/sPZ6gH1D5uM?autoplay=1&mute=1&rel=0&modestbranding=1',
      description: 'Sebuah perkampungan adat unik yang hanya terdiri dari 6 unit rumah berhadap-hadapan (3 di utara, 3 di selatan) serta sebuah masjid kecil. Aturan adat melarang penambahan bangunan dan kepemilikan diwariskan eksklusif ke anak perempuan tertua untuk menjaga keselarasan pulau.'
    },
    {
      id: 3,
      title: 'Situ Cangkuang & Rakit Tradisional',
      tag: 'Pesona Alam Danau 25 Hektar',
      subtitle: 'Perjalanan syahdu menyeberangi danau dengan perahu bambu',
      videoUrl: 'https://www.youtube.com/embed/EhoBqkJ87tI?start=45&autoplay=1&mute=1&rel=0',
      description: 'Situ Cangkuang merupakan danau alami nan asri seluas 25 hektar yang ditumbuhi tanaman air teratai dan pohon cangkuang langka. Wisatawan menyeberang pulau menggunakan getek rakit bambu tradisional bertenaga kayuh bambu yang ramah lingkungan dengan panorama Gunung Haruman.'
    },
    {
      id: 4,
      title: 'Museum Situs & Naskah Kuno Saeh',
      tag: 'Pusat Manuskrip Abad ke-17',
      subtitle: 'Koleksi naskah Al-Quran kulit kayu saeh & artefak bersejarah',
      videoUrl: 'https://www.youtube.com/embed/sPZ6gH1D5uM?start=60&autoplay=1&mute=1&rel=0',
      description: 'Museum di area komplek candi menyimpan khazanah naskah khutbah Idul Fitri kuno berbahasa Sunda-Arab yang ditulis di atas kulit pohon Saeh (Broussonetia papyrifera) peninggalan Embah Dalem Arif Muhammad abad ke-17, serta pecahan keramik kuno Dinasti Tang dan Song.'
    }
  ];

  const spotModalDetails = {
    candi: {
      title: 'Candi Cangkuang (Abad VIII Masehi)',
      category: 'Arsitektur Andesit & Peradaban Siwa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Candi_cangkuang.jpg',
      content: `
        <p>Candi Cangkuang adalah candi Hindu pertama sekaligus satu-satunya yang pernah ditemukan di tatar Jawa Barat (Pasundan). Berlokasi di sebuah pulau kecil di tengah Situ Cangkuang, Kecamatan Leles, Kabupaten Garut.</p>
        <br>
        <h4>Keunikan Arsitektur:</h4>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li>Material batuan andesit asli yang direkonstruksi dengan teliti pada 1974–1976.</li>
          <li>Memiliki ruangan garbhagriha dengan arca Dewa Siwa bertengger di atas lapik padmasana.</li>
          <li>Ketinggian bangunan mencapai sekitar 8,5 meter dengan stupa atap bertingkat bergaya klasik nusantara.</li>
        </ul>
        <br>
        <p><strong>Tips Pengunjung:</strong> Waktu terbaik untuk berfoto adalah pagi hari (08.00–10.00 WIB) saat cahaya matahari menyinari sisi muka candi yang menghadap ke timur.</p>
      `
    },
    kampung: {
      title: 'Kampung Adat Pulo',
      category: 'Filosofi Leluhur & Hukum Adat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Galeri_Budaya_Nusantara_-_Rumah_Adat_Sunda.jpg',
      content: `
        <p>Kampung Pulo adalah perkampungan tradisional yang berada di pulau yang sama dengan Candi Cangkuang. Penduduknya adalah keturunan langsung dari Embah Dalem Arif Muhammad.</p>
        <br>
        <h4>Empat Pantangan Adat Sakral:</h4>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li><strong>Jumlah Rumah Tetap:</strong> Hanya ada 6 rumah dan 1 masjid. Tidak boleh ditambah atau dikurangi.</li>
          <li><strong>Garis Keturunan Ibu (Matrilineal):</strong> Rumah diwariskan kepada anak perempuan sulung. Anak laki-laki yang menikah wajib keluar dari pulau.</li>
          <li><strong>Pantangan Hewan Ternak:</strong> Dilarang memelihara hewan berkaki empat besar seperti kerbau, sapi, atau kambing guna menjaga kebersihan dan ketenteraman pulau.</li>
          <li><strong>Pantangan Memukul Gong:</strong> Dilarang membunyikan gong perunggu karena menghormati tradisi ziarah leluhur.</li>
        </ul>
      `
    },
    situ: {
      title: 'Situ Cangkuang & Rakit Bambu Tradisional',
      category: 'Ekowisata Danau & Panorama Priangan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Situ_Cangkuang%2C_Leles%2C_Garut%2C_Indonesia.jpg',
      content: `
        <p>Danau Situ Cangkuang seluas 25 hektar mengelilingi pulau cagar budaya. Di masa lampau, danau ini dipenuhi pohon Cangkuang liar yang menjadi asal-usul nama wilayah ini.</p>
        <br>
        <h4>Daya Tarik Utama:</h4>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li>Sensasi menyeberang danau menggunakan rakit bambu alami (getek) yang dikemudikan oleh penduduk lokal.</li>
          <li>Hembusan angin sejuk dataran tinggi Garut dengan pemandangan pegunungan hijau dan hamparan teratai air.</li>
          <li>Perjalanan rakit memakan waktu sekitar 10-15 menit menuju dermaga Kampung Pulo.</li>
        </ul>
      `
    },
    museum: {
      title: 'Museum Situs Cangkuang',
      category: 'Pusat Arsip Budaya & Naskah Saeh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Cangkuang_3.jpg',
      content: `
        <p>Museum ini berdiri di samping kompleks candi untuk melestarikan benda-benda cagar budaya bersejarah temuan abad ke-8 hingga abad ke-17.</p>
        <br>
        <h4>Koleksi Langka:</h4>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li>Naskah khutbah Idul Fitri dan Al-Qur'an kuno bertuliskan tinta alami di atas daun pohon Saeh.</li>
          <li>Pecahan relief andesit candi kuno dan perkakas upacara keagamaan.</li>
          <li>Keramik peninggalan Tiongkok kuno dari jalur perdagangan maritim Nusantara.</li>
        </ul>
      `
    },
    makam: {
      title: 'Makam Embah Dalem Arif Muhammad',
      category: 'Ziarah Religi & Jejak Toleransi Damai',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Cangkuang_4.jpg',
      content: `
        <p>Makam tokoh penyebar agama Islam terkemuka di Garut, Embah Dalem Arif Muhammad, terletak berdampingan hanya beberapa meter dari Candi Cangkuang Hindu kuno.</p>
        <br>
        <p>Lokasi ini menjadi simbol luar biasa tentang toleransi, kerukunan beragama, dan akulturasi budaya yang harmonis antara peradaban Hindu dan Islam di tanah Sunda sejak ratusan tahun lalu.</p>
      `
    }
  };

  // ------------------------------------------------------------------------
  // 2. STICKY NAVBAR & MOBILE MENU
  // ------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active Link Highlighter based on current page filename
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const rawHref = link.getAttribute('href') || '';
    const cleanHref = rawHref.replace(/^\.\//, '');
    if (cleanHref === currentPath || (currentPath === '' && (cleanHref === 'index.html' || cleanHref === ''))) {
      link.classList.add('active');
    } else if (cleanHref.indexOf('.html') !== -1 && cleanHref !== currentPath) {
      link.classList.remove('active');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. SUNDANESE NATURE & SULING AUDIO PLAYER (DIRECT MP3)
  // ------------------------------------------------------------------------
  const btnAmbience = document.getElementById('btnAmbience');
  const bgAudio = document.getElementById('bgMusic');
  const hasDedicatedMusicPlayer = !!document.querySelector('script[src*="music-player.js"]');

  if (btnAmbience && bgAudio && !hasDedicatedMusicPlayer) {
    // Set comfortable volume
    bgAudio.volume = 0.6;

    // Toggle playback on click
    btnAmbience.addEventListener('click', () => {
      if (bgAudio.paused) {
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            btnAmbience.classList.add('playing');
            btnAmbience.setAttribute('title', 'Matikan Musik Latar (Suling Sunda & Alam)');
            showToast('Alunan suling Sunda & suara alam Situ Cangkuang diputar 🎵');
          }).catch(err => {
            console.warn('Pemutaran dicegah browser:', err);
            showToast('Klik sekali lagi untuk memutar musik.');
          });
        }
      } else {
        bgAudio.pause();
        btnAmbience.classList.remove('playing');
        btnAmbience.setAttribute('title', 'Putar Suasana Alami Situ Cangkuang');
        showToast('Musik latar dijeda');
      }
    });

    // Listen to native audio events to keep button state synchronized
    bgAudio.addEventListener('play', () => {
      btnAmbience.classList.add('playing');
      const icon = btnAmbience.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-volume-up';
      }
    });

    bgAudio.addEventListener('pause', () => {
      btnAmbience.classList.remove('playing');
      const icon = btnAmbience.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-volume-mute';
      }
    });

    bgAudio.addEventListener('ended', () => {
      btnAmbience.classList.remove('playing');
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => {});
    });
  }

  // ------------------------------------------------------------------------
  // 4. INTERAKTIF TRIVIA ACCORDION
  // ------------------------------------------------------------------------
  const triviaHeaders = document.querySelectorAll('.trivia-header');
  triviaHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.trivia-item').forEach(el => el.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 5. VIRTUAL TOUR: DYNAMIC SPOT VIDEO SWITCHING
  // ------------------------------------------------------------------------
  const spotSelectButtons = document.querySelectorAll('.spot-select-btn');
  const tourIframe = document.getElementById('tourIframe');
  const videoSpotTitle = document.getElementById('videoSpotTitle');
  const videoSpotTag = document.getElementById('videoSpotTag');
  const videoSpotDesc = document.getElementById('videoSpotDesc');

  const switchVirtualTourSpot = (spotId) => {
    const spot = tourSpotsData.find(s => s.id === parseInt(spotId, 10));
    if (!spot) return;

    spotSelectButtons.forEach(btn => {
      if (parseInt(btn.getAttribute('data-spot-id'), 10) === spot.id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (tourIframe) {
      tourIframe.style.opacity = '0.3';
      setTimeout(() => {
        tourIframe.src = spot.videoUrl;
        tourIframe.style.opacity = '1';
      }, 250);
    }

    if (videoSpotTitle) videoSpotTitle.textContent = spot.title;
    if (videoSpotTag) videoSpotTag.textContent = spot.tag;
    if (videoSpotDesc) videoSpotDesc.textContent = spot.description;
  };

  spotSelectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const spotId = btn.getAttribute('data-spot-id');
      switchVirtualTourSpot(spotId);
    });
  });

  // Virtual Tour Tabs Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(tabTarget);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. SPOT DETAILS MODAL POPUP
  // ------------------------------------------------------------------------
  const infoModal = document.getElementById('infoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalHeaderImg = document.getElementById('modalHeaderImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const spotDetailButtons = document.querySelectorAll('.spot-btn-detail');

  const openSpotModal = (spotKey) => {
    const data = spotModalDetails[spotKey];
    if (!data || !infoModal) return;

    if (modalHeaderImg) modalHeaderImg.src = data.image;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalContent) modalContent.innerHTML = data.content;

    infoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeSpotModal = () => {
    if (!infoModal) return;
    infoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  spotDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const spotKey = btn.getAttribute('data-spot');
      openSpotModal(spotKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSpotModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeSpotModal();
    });
  }

  // ------------------------------------------------------------------------
  // 8. GALERI FOTO FILTER & LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  let visibleGalleryItems = Array.from(galleryItems);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  const updateLightbox = (index) => {
    if (!visibleGalleryItems[index]) return;
    const item = visibleGalleryItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-photo-title')?.textContent || 'Cagar Budaya Candi Cangkuang';

    if (lightboxImg && img) lightboxImg.src = img.src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${visibleGalleryItems.length}`;
    currentGalleryIndex = index;
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = visibleGalleryItems.indexOf(item);
      if (index !== -1) {
        updateLightbox(index);
        lightboxModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
      updateLightbox(currentGalleryIndex);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
      updateLightbox(currentGalleryIndex);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeSpotModal();
    } else if (lightboxModal?.classList.contains('active')) {
      if (e.key === 'ArrowLeft') lightboxPrev?.click();
      if (e.key === 'ArrowRight') lightboxNext?.click();
    }
  });

  // ------------------------------------------------------------------------
  // 9. TIKET & RESERVASI RAKIT BAMBU (REAL-TIME CALCULATOR)
  // ------------------------------------------------------------------------
  const ticketPrices = {
    dewasa: 10000,
    anak: 5000,
    mancanegara: 20000,
    rakit: 10000
  };

  const qtyInputs = {
    dewasa: document.getElementById('qtyDewasa'),
    anak: document.getElementById('qtyAnak'),
    mancanegara: document.getElementById('qtyMancanegara'),
    rakit: document.getElementById('qtyRakit')
  };

  const summaryElements = {
    dewasaSubtotal: document.getElementById('subDewasa'),
    anakSubtotal: document.getElementById('subAnak'),
    mancanegaraSubtotal: document.getElementById('subMancanegara'),
    rakitSubtotal: document.getElementById('subRakit'),
    totalAmount: document.getElementById('totalAmount')
  };

  const formatRupiah = (number) => {
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const updateTicketCalculation = () => {
    if (!qtyInputs.dewasa) return;
    const qDewasa = parseInt(qtyInputs.dewasa?.value || 0, 10);
    const qAnak = parseInt(qtyInputs.anak?.value || 0, 10);
    const qMancanegara = parseInt(qtyInputs.mancanegara?.value || 0, 10);
    const qRakit = parseInt(qtyInputs.rakit?.value || 0, 10);

    const totalDewasa = qDewasa * ticketPrices.dewasa;
    const totalAnak = qAnak * ticketPrices.anak;
    const totalMancanegara = qMancanegara * ticketPrices.mancanegara;
    const totalRakit = qRakit * ticketPrices.rakit;
    const grandTotal = totalDewasa + totalAnak + totalMancanegara + totalRakit;

    if (summaryElements.dewasaSubtotal) summaryElements.dewasaSubtotal.textContent = `${qDewasa}x (${formatRupiah(totalDewasa)})`;
    if (summaryElements.anakSubtotal) summaryElements.anakSubtotal.textContent = `${qAnak}x (${formatRupiah(totalAnak)})`;
    if (summaryElements.mancanegaraSubtotal) summaryElements.mancanegaraSubtotal.textContent = `${qMancanegara}x (${formatRupiah(totalMancanegara)})`;
    if (summaryElements.rakitSubtotal) summaryElements.rakitSubtotal.textContent = `${qRakit}x (${formatRupiah(totalRakit)})`;
    if (summaryElements.totalAmount) summaryElements.totalAmount.textContent = formatRupiah(grandTotal);
  };

  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const action = btn.getAttribute('data-action');
      const input = document.getElementById(targetId);
      if (!input) return;

      let val = parseInt(input.value || 0, 10);
      if (action === 'plus') {
        val = Math.min(99, val + 1);
      } else if (action === 'minus') {
        val = Math.max(0, val - 1);
      }
      input.value = val;
      updateTicketCalculation();
    });
  });

  // Allow direct typing into qty inputs — validate and recalculate in real-time
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('input', () => {
      // Strip non-numeric characters
      input.value = input.value.replace(/[^0-9]/g, '');
      let val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0) val = 0;
      if (val > 99) val = 99;
      input.value = val;
      updateTicketCalculation();
    });

    // On blur, ensure a valid value is always present (default 0 if empty)
    input.addEventListener('blur', () => {
      if (input.value === '' || isNaN(parseInt(input.value, 10))) {
        input.value = 0;
        updateTicketCalculation();
      }
    });
  });

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value || 'Pengunjung';
      const date = document.getElementById('bookDate')?.value || 'Hari yang dipilih';
      const total = summaryElements.totalAmount?.textContent || 'Rp 0';

      showToast(`Pemesanan Berhasil! Tiket a.n. ${name} untuk tanggal ${date} (${total}) telah dicatat.`);
      bookingForm.reset();
      if (qtyInputs.dewasa) qtyInputs.dewasa.value = 1;
      if (qtyInputs.anak) qtyInputs.anak.value = 0;
      if (qtyInputs.mancanegara) qtyInputs.mancanegara.value = 0;
      if (qtyInputs.rakit) qtyInputs.rakit.value = 1;
      updateTicketCalculation();
    });
  }

  // ------------------------------------------------------------------------
  // 10. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  let toastTimer = null;
  const showToast = (message) => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fas fa-info-circle" style="color:var(--accent);"></i> <span>${message}</span>`;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // ------------------------------------------------------------------------
  // 11. BACK TO TOP BUTTON
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  updateTicketCalculation();
});
