/**
 * ==========================================================================
 * CANDI CANGKUANG HERITAGE WALK - CORE INTERACTIVE ENGINE (main.js)
 * Modern Vanilla JavaScript (ES6+) - World-Class Awwwards Standard
 * --------------------------------------------------------------------------
 * Fitur Utama:
 * 1. Seamless SPA / PJAX Navigation: Musik latar TIDAK PERNAH TERPUTUS saat berganti menu.
 * 2. Indikator Scroll "Perjalanan Rakit Bambu": Menampilkan progres menyeberang Situ Cangkuang.
 * 3. Simulasi Denah Interaktif "6+1 Kampung Pulo": 3 rumah kiri, 3 rumah kanan, 1 Tajug pusaka.
 * 4. 3D Tilt & Flip Secret Cards: Kartu 3D interaktif misteri arca Siwa & naskah saeh.
 * 5. Cinematic Virtual Tour Player: Studio bioskop gelap dengan spot dock & active pulse ring.
 * 6. Responsive Mobile Navigation & Accessibility.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DATA STORES: KAMPUNG PULO 6+1 SIMULATOR
  // ------------------------------------------------------------------------
  const kampungPuloData = {
    1: {
      row: 'kaler',
      tag: 'Garis Matrilineal Sulung • Baris Utara',
      title: 'Bumi Kaler 1 (Imah Putri Sulung)',
      desc: 'Kediaman putri tertua generasi pewaris garis ibu (matrilineal). Sesuai hukum adat leluhur sejak abad ke-17, kepemilikan rumah panggung ini tidak boleh diperjualbelikan dan hanya diwariskan eksklusif ke anak perempuan sulung.',
      pewaris: 'Putri Tertua Generasi Berjalan',
      arsitektur: 'Panggung Kayu Alami, Atap Suhunan Ijuk/Tepus',
      pantangan: 'Dilarang menambah kamar permanen & mengubah arah pintu hadap selatan.'
    },
    2: {
      row: 'kaler',
      tag: 'Penjaga Naskah Kuno • Baris Utara',
      title: 'Bumi Kaler 2 (Imah Pusaka Adat)',
      desc: 'Rumah adat pelindung manuskrip bersejarah dan benda peninggalan Embah Dalem Arif Muhammad. Di sinilah tradisi perawatan naskah khutbah kulit pohon Saeh dirawat dengan formula getah alami.',
      pewaris: 'Keturunan Putri Kedua',
      arsitektur: 'Konstruksi Pasak Kayu Tanpa Paku Logam',
      pantangan: 'Dilarang menyalakan api dupa di ruang penyimpanan lontar pusaka.'
    },
    3: {
      row: 'kaler',
      tag: 'Pusat Rembug Warga • Baris Utara',
      title: 'Bumi Kaler 3 (Imah Musyawarah Wetan)',
      desc: 'Tempat bertemunya sesepuh adat Kampung Pulo untuk musyawarah mufakat, penentuan jadwal ziarah, dan persiapan upacara adat menyambut bulan Mulud (Maulid Nabi).',
      pewaris: 'Keturunan Putri Ketiga',
      arsitektur: 'Bale Panggung Luas dengan Ventilasi Bambu Anyam',
      pantangan: 'Tamu pria di luar keturunan dilarang bermalam di dalam rumah.'
    },
    4: {
      row: 'kidul',
      tag: 'Pelindung Kesucian • Baris Selatan',
      title: 'Bumi Kidul 1 (Imah Kidul Kulon)',
      desc: 'Rumah penjaga ketenteraman dan tata tertib pulau. Pemangku rumah ini memastikan seluruh pengunjung dan peziarah mematuhi etika luhur di lingkungan cagar budaya.',
      pewaris: 'Keturunan Putri Keempat',
      arsitektur: 'Dinding Gedek Bambu Bermotif Kepang Pasundan',
      pantangan: 'Pantangan keras memelihara hewan ternak besar berkaki empat (kambing, sapi, kerbau).'
    },
    5: {
      row: 'kidul',
      tag: 'Lumbung Pangan Adat • Baris Selatan',
      title: 'Bumi Kidul 2 (Imah Kidul Tengah)',
      desc: 'Pusat tradisi pertanian dan lumbung padi organik warga pulau. Melambangkan kemakmuran dan rasa syukur atas kesuburan tanah di sekeliling Situ Cangkuang.',
      pewaris: 'Keturunan Putri Kelima',
      arsitektur: 'Pondasi Umpak Batu Alam Tahan Gempa',
      pantangan: 'Dilarang menumbuk padi menggunakan lesung batu pada malam hari.'
    },
    6: {
      row: 'kidul',
      tag: 'Silaturahmi Sesepuh • Baris Selatan',
      title: 'Bumi Kidul 3 (Imah Kidul Wetan)',
      desc: 'Kediaman penyambutan tamu ziarah dan tokoh budaya luar kota. Menjadi simbol keterbukaan dan keramahtamahan orang Sunda (Someah Hade ka Semoh).',
      pewaris: 'Keturunan Putri Keenam',
      arsitektur: 'Pintu Utama Menghadap ke Utara Menatap Candi',
      pantangan: 'Dilarang keras membunyikan gong perunggu di sekitar pelataran.'
    },
    7: {
      row: 'tajug',
      tag: 'Pusat Ibadah & Simbol Putra Tunggal • Ujung Barat',
      title: 'Tajug Karomah Embah Dalem Arif Muhammad',
      desc: 'Satu-satunya rumah ibadah (masjid/mushola pusaka) di Kampung Pulo. Didirikan pada abad ke-17 oleh Embah Dalem Arif Muhammad. Jumlah 1 tajug ini melambangkan putra laki-laki tunggal beliau yang gugur, sekaligus melambangkan Tauhid keesaan Sang Pencipta.',
      pewaris: 'Wakaf Abadi Seluruh Keturunan Adat',
      arsitektur: 'Atap Tumpang 2 Tingkat Kayu Jati Tua',
      pantangan: 'Hanya digunakan untuk ibadah shalat dan pengajian naskah kuno; dilarang untuk kegiatan komersial.'
    }
  };

  // ------------------------------------------------------------------------
  // 2. DATA STORES: VIRTUAL TOUR SPOTS & MODAL DETAILS
  // ------------------------------------------------------------------------
  const spotModalDetails = {
    candi: {
      title: 'Candi Cangkuang (Abad VIII Masehi)',
      category: 'Arsitektur Andesit & Peradaban Siwa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Candi_cangkuang.jpg',
      content: `
        <p>Candi Cangkuang adalah candi Hindu pertama sekaligus satu-satunya yang pernah ditemukan di tatar Jawa Barat (Pasundan). Berlokasi di sebuah pulau kecil di tengah Situ Cangkuang, Kecamatan Leles, Kabupaten Garut.</p>
        <br>
        <h4>Keunikan Arsitektur:</h4>
        <ul style="padding-left: 20px; margin: 10px 0; line-height: 1.7;">
          <li>Material batuan andesit asli yang direkonstruksi dengan teliti pada 1974–1976.</li>
          <li>Denah bujur sangkar berukuran 4,5 x 4,5 meter dengan tinggi puncak 8,5 meter.</li>
          <li>Di dalam garbhagriha terdapat arca Siwa Batara Guru bersanding di atas lapik bunga teratai.</li>
        </ul>
      `
    },
    kampung: {
      title: 'Kampung Adat Pulo & 6 Rumah Berjajar',
      category: 'Kearifan Lokal Sunda & Matrilineal',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Galeri_Budaya_Nusantara_-_Rumah_Adat_Sunda.jpg',
      content: `
        <p>Sebuah perkampungan adat unik yang hanya terdiri dari 6 unit rumah berhadap-hadapan (3 di utara, 3 di selatan) serta sebuah masjid kecil (tajug). Aturan adat melarang penambahan bangunan dan kepemilikan diwariskan eksklusif ke anak perempuan tertua untuk menjaga keselarasan pulau.</p>
        <br>
        <h4>Falsafah Hukum Adat:</h4>
        <ul style="padding-left: 20px; margin: 10px 0; line-height: 1.7;">
          <li><strong>Hukum Waris Matrilineal:</strong> Hanya anak perempuan sulung yang berhak mewarisi rumah adat.</li>
          <li><strong>Larangan Ternak Besar:</strong> Dilarang memelihara kerbau, sapi, kambing demi kesucian tanah pulau.</li>
          <li><strong>Pantangan Memukul Gong:</strong> Menghormati tradisi ziarah leluhur.</li>
        </ul>
      `
    },
    situ: {
      title: 'Situ Cangkuang & Rakit Bambu Getek',
      category: 'Ekowisata Danau & Panorama Priangan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Situ_Cangkuang%2C_Leles%2C_Garut%2C_Indonesia.jpg',
      content: `
        <p>Danau Situ Cangkuang seluas 25 hektar mengelilingi pulau cagar budaya. Di masa lampau, danau ini dipenuhi pohon Cangkuang liar yang menjadi asal-usul nama wilayah ini.</p>
        <br>
        <h4>Daya Tarik Utama:</h4>
        <ul style="padding-left: 20px; margin: 10px 0; line-height: 1.7;">
          <li>Sensasi menyeberang danau menggunakan rakit bambu alami (getek) yang dikemudikan oleh penduduk lokal.</li>
          <li>Hembusan angin sejuk dataran tinggi Garut dengan pemandangan pegunungan hijau Gunung Haruman.</li>
          <li>Perjalanan rakit memakan waktu sekitar 10-15 menit menuju dermaga Kampung Pulo.</li>
        </ul>
      `
    },
    museum: {
      title: 'Museum Situs Cangkuang & Naskah Kuno Saeh',
      category: 'Pusat Arsip Budaya & Manuskrip Kulit Kayu',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Cangkuang_3.jpg',
      content: `
        <p>Museum ini berdiri di samping kompleks candi untuk melestarikan benda-benda cagar budaya bersejarah temuan abad ke-8 hingga abad ke-17.</p>
        <br>
        <h4>Koleksi Langka:</h4>
        <ul style="padding-left: 20px; margin: 10px 0; line-height: 1.7;">
          <li>Naskah khutbah Idul Fitri dan Al-Qur'an kuno bertuliskan tinta alami di atas daun pohon Saeh (Broussonetia papyrifera).</li>
          <li>Pecahan relief andesit candi kuno dan perkakas upacara keagamaan.</li>
          <li>Keramik peninggalan Dinasti Tiongkok kuno dari jalur perdagangan maritim Nusantara.</li>
        </ul>
      `
    },
    makam: {
      title: 'Makam Embah Dalem Arif Muhammad',
      category: 'Ziarah Religi & Simbol Toleransi Damai',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Cangkuang_4.jpg',
      content: `
        <p>Makam tokoh penyebar agama Islam terkemuka di Garut, Embah Dalem Arif Muhammad, terletak berdampingan hanya beberapa meter dari Candi Cangkuang Hindu kuno.</p>
        <br>
        <p>Lokasi ini menjadi simbol luar biasa tentang toleransi, kerukunan beragama, dan akulturasi budaya yang harmonis antara peradaban Hindu dan Islam di tanah Sunda sejak ratusan tahun lalu.</p>
      `
    }
  };

  const tourSpotsData = {
    1: {
      title: 'Kompleks Candi Cangkuang Utama',
      subtitle: 'Arsitektur Andesit Abad ke-8 & Arca Siwa Batara Guru',
      tag: 'Candi Hindu Abad ke-8',
      videoUrl: 'https://www.youtube.com/embed/EhoBqkJ87tI?autoplay=1&mute=1&rel=0&modestbranding=1',
      desc: 'Candi andesit berbentuk bujur sangkar 4,5 x 4,5 meter peninggalan Kerajaan Sunda abad ke-8. Ditemukan kembali pada 1966 oleh tim arkeolog pimpinan Drs. Uka Tjandrasasmita dan dipugar secara cermat pada 1974-1976.'
    },
    2: {
      title: 'Kampung Adat Pulo & 6 Rumah Berjajar',
      subtitle: 'Komunitas Adat Tertutup Berfalsafah Matrilineal',
      tag: 'Kearifan Lokal Sunda',
      videoUrl: 'https://www.youtube.com/embed/sPZ6gH1D5uM?autoplay=1&mute=1&rel=0&modestbranding=1',
      desc: 'Perkampungan adat unik yang hanya terdiri dari 6 unit rumah (3 di utara, 3 di selatan) dan 1 masjid/tajug pusaka. Struktur jumlah bangunan tidak boleh bertambah atau berkurang demi menjaga keseimbangan ekosistem pulau.'
    },
    3: {
      title: 'Situ Cangkuang & Rakit Bambu Getek',
      subtitle: 'Sensasi Berlayar Syahdu di Atas Danau 25 Hektar',
      tag: 'Ekowisata Danau Alami',
      videoUrl: 'https://www.youtube.com/embed/EhoBqkJ87tI?start=45&autoplay=1&mute=1&rel=0',
      desc: 'Danau alami seluas 25 hektar yang tenang dan asri. Wisatawan menyeberang menuju pulau cagar budaya menggunakan rakit bambu tradisional bertenaga kayuh bambu yang ramah lingkungan dengan pemandangan Gunung Haruman.'
    },
    4: {
      title: 'Museum Situs & Naskah Kuno Saeh',
      subtitle: 'Khazanah Manuskrip Kulit Kayu Abad ke-17',
      tag: 'Pusat Arsip Sejarah',
      videoUrl: 'https://www.youtube.com/embed/sPZ6gH1D5uM?start=60&autoplay=1&mute=1&rel=0',
      desc: 'Museum arkeologi di samping candi yang menyimpan naskah khutbah Idul Fitri kuno berbahasa Sunda-Arab berhuruf Pegon di atas kulit kayu Saeh (Broussonetia papyrifera) serta artefak keramik kuno Dinasti Tiongkok.'
    }
  };

  // ------------------------------------------------------------------------
  // 3. INDIKATOR SCROLL: PERJALANAN RAKIT BAMBU
  // ------------------------------------------------------------------------
  function initRaftScrollTracker() {
    let tracker = document.getElementById('raftScrollTracker');
    if (!tracker) {
      tracker = document.createElement('div');
      tracker.id = 'raftScrollTracker';
      tracker.className = 'raft-scroll-tracker';
      tracker.innerHTML = `
        <div class="raft-stream-bar" id="raftStreamBar">
          <div class="raft-sailor-icon" id="raftSailorIcon" title="Perjalanan Rakit Bambu Menyeberang Situ Cangkuang">
            🛶
          </div>
        </div>
      `;
      document.body.appendChild(tracker);
    }

    const streamBar = document.getElementById('raftStreamBar');
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      if (streamBar) {
        streamBar.style.width = progress + '%';
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  // ------------------------------------------------------------------------
  // 4. SIMULASI DENAH INTERAKTIF: 6+1 KAMPUNG PULO
  // ------------------------------------------------------------------------
  function initKampungPuloSimulator() {
    const nodes = document.querySelectorAll('.pulo-node');
    const filterBtns = document.querySelectorAll('.pulo-filter-btn');
    const tagElem = document.getElementById('inspectorTag');
    const titleElem = document.getElementById('inspectorTitle');
    const descElem = document.getElementById('inspectorDesc');
    const pewarisElem = document.getElementById('inspectorPewaris');
    const arsitekturElem = document.getElementById('inspectorArsitektur');
    const pantanganElem = document.getElementById('inspectorPantangan');

    if (nodes.length === 0) return;

    function selectBuilding(id) {
      const data = kampungPuloData[id];
      if (!data) return;

      nodes.forEach(n => {
        n.classList.toggle('selected', n.dataset.puloId === String(id));
      });

      if (tagElem) tagElem.textContent = data.tag;
      if (titleElem) titleElem.textContent = data.title;
      if (descElem) descElem.textContent = data.desc;
      if (pewarisElem) pewarisElem.textContent = data.pewaris;
      if (arsitekturElem) arsitekturElem.textContent = data.arsitektur;
      if (pantanganElem) pantanganElem.textContent = data.pantangan;
    }

    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        e.preventDefault();
        const id = node.dataset.puloId;
        selectBuilding(id);
      });

      node.addEventListener('mouseenter', () => {
        const id = node.dataset.puloId;
        selectBuilding(id);
      });
    });

    // Filter Chips: Semua, Utara, Selatan, Tajug
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        nodes.forEach(node => {
          const row = node.dataset.row;
          if (filter === 'all' || row === filter) {
            node.style.opacity = '1';
            node.style.pointerEvents = 'auto';
          } else {
            node.style.opacity = '0.35';
          }
        });

        // Pilih gedung pertama yang cocok
        const firstMatch = Array.from(nodes).find(n => filter === 'all' || n.dataset.row === filter);
        if (firstMatch) selectBuilding(firstMatch.dataset.puloId);
      });
    });

    // Default select bangunan #1 (Bumi Kaler 1)
    selectBuilding(1);
  }

  // ------------------------------------------------------------------------
  // 5. 3D TILT & FLIP CARDS (MENU EKSKLUSIF)
  // ------------------------------------------------------------------------
  function init3DSecretCards() {
    const cardWraps = document.querySelectorAll('.card-3d-wrap');
    if (cardWraps.length === 0) return;

    cardWraps.forEach(wrap => {
      const inner = wrap.querySelector('.card-3d-inner');
      const flipBtns = wrap.querySelectorAll('.card-flip-btn, .btn-flip-back');

      // Click to Flip (Desktop & Mobile)
      flipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          wrap.classList.toggle('flipped');
        });
      });

      wrap.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          wrap.classList.toggle('flipped');
        }
      });

      // 3D Perspective Tilt on Mouse Move (Desktop Only)
      wrap.addEventListener('mousemove', (e) => {
        if (wrap.classList.contains('flipped')) return;
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        if (inner) {
          inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      });

      wrap.addEventListener('mouseleave', () => {
        if (inner && !wrap.classList.contains('flipped')) {
          inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. CINEMATIC VIRTUAL TOUR PLAYER
  // ------------------------------------------------------------------------
  function initCinematicTourPlayer() {
    const dockBtns = document.querySelectorAll('.tour-dock-btn');
    const iframe = document.getElementById('cinematicVideoFrame');
    const spotTitle = document.getElementById('cinematicSpotTitle');
    const spotSub = document.getElementById('cinematicSpotSub');
    const spotDesc = document.getElementById('cinematicSpotDesc');

    if (dockBtns.length === 0 || !iframe) return;

    dockBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dockBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const spotId = btn.dataset.spotId;
        const data = tourSpotsData[spotId];
        if (!data) return;

        iframe.style.opacity = '0.3';
        setTimeout(() => {
          iframe.src = data.videoUrl;
          if (spotTitle) spotTitle.textContent = data.title;
          if (spotSub) spotSub.textContent = data.subtitle;
          if (spotDesc) spotDesc.textContent = data.desc;
          iframe.style.opacity = '1';
        }, 250);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. TICKET CALCULATOR & INSTANT BOOKING
  // ------------------------------------------------------------------------
  function initTicketCalculator() {
    // 1. Dukungan formulir tiket.html (qtyDewasa, qtyAnak, qtyMancanegara, qtyRakit)
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
      const qManca = parseInt(qtyInputs.mancanegara?.value || 0, 10);
      const qRakit = parseInt(qtyInputs.rakit?.value || 0, 10);

      const subDewasa = Math.max(0, qDewasa) * 10000;
      const subAnak = Math.max(0, qAnak) * 5000;
      const subManca = Math.max(0, qManca) * 20000;
      const subRakit = Math.max(0, qRakit) * 10000;

      const grandTotal = subDewasa + subAnak + subManca + subRakit;

      if (summaryElements.dewasaSubtotal) summaryElements.dewasaSubtotal.textContent = `${qDewasa}x (${formatRupiah(subDewasa)})`;
      if (summaryElements.anakSubtotal) summaryElements.anakSubtotal.textContent = `${qAnak}x (${formatRupiah(subAnak)})`;
      if (summaryElements.mancanegaraSubtotal) summaryElements.mancanegaraSubtotal.textContent = `${qManca}x (${formatRupiah(subManca)})`;
      if (summaryElements.rakitSubtotal) summaryElements.rakitSubtotal.textContent = `${qRakit}x (${formatRupiah(subRakit)})`;
      if (summaryElements.totalAmount) summaryElements.totalAmount.textContent = formatRupiah(grandTotal);
    };

    // Tombol + dan - dengan dukungan ketik langsung
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.onclick = () => {
        const targetId = btn.getAttribute('data-target');
        const action = btn.getAttribute('data-action');
        const input = document.getElementById(targetId);
        if (!input) return;

        let val = parseInt(input.value || 0, 10);
        if (isNaN(val)) val = 0;
        if (action === 'plus') {
          val = Math.min(val + 1, 999);
        } else if (action === 'minus') {
          val = Math.max(val - 1, 0);
        }
        input.value = val;
        updateTicketCalculation();
      };
    });

    // Event listener input ketik langsung angka
    Object.values(qtyInputs).forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          let val = parseInt(input.value, 10);
          if (isNaN(val) || val < 0) val = 0;
          updateTicketCalculation();
        });
      }
    });

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      const bookDateInput = document.getElementById('bookDate');
      if (bookDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookDateInput.min = today;
        if (!bookDateInput.value) bookDateInput.value = today;
      }

      bookingForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('bookName')?.value || 'Pengunjung';
        const phone = document.getElementById('bookPhone')?.value || '-';
        const date = document.getElementById('bookDate')?.value || 'Hari yang dipilih';
        const total = summaryElements.totalAmount?.textContent || 'Rp 0';

        const qDewasa = parseInt(qtyInputs.dewasa?.value || 0, 10);
        const qAnak = parseInt(qtyInputs.anak?.value || 0, 10);
        const qManca = parseInt(qtyInputs.mancanegara?.value || 0, 10);
        const qRakit = parseInt(qtyInputs.rakit?.value || 0, 10);

        const waMsg = encodeURIComponent(
          `*RESERVASI TIKET RESMI CANDI CANGKUANG*\n\n` +
          `• Nama Pemesan: ${name}\n` +
          `• No WhatsApp: ${phone}\n` +
          `• Tanggal Kunjungan: ${date}\n` +
          `• Rincian Wisatawan:\n` +
          `  - Dewasa (Domestik): ${qDewasa} orang\n` +
          `  - Anak-anak: ${qAnak} orang\n` +
          `  - Mancanegara: ${qManca} orang\n` +
          `  - Rakit Bambu PP: ${qRakit} orang\n\n` +
          `• *TOTAL ESTIMASI: ${total}*\n\n` +
          `Mohon konfirmasi ketersediaan tiket & rakit bambu. Hatur nuhun!`
        );

        window.open(`https://wa.me/6281234567890?text=${waMsg}`, '_blank');
      };
    }

    updateTicketCalculation();
  }

  // ------------------------------------------------------------------------
  // 7b. SPOT DETAIL MODAL (SCROLLABLE & RESPONSIVE)
  // ------------------------------------------------------------------------
  function initSpotModal() {
    const modal = document.getElementById('infoModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalImg = document.getElementById('modalHeaderImg');
    const detailBtns = document.querySelectorAll('.spot-btn-detail');

    if (!modal) return;

    detailBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const spotKey = btn.dataset.spot;
        const data = spotModalDetails[spotKey];
        if (!data) return;

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalContent) modalContent.innerHTML = data.content;
        if (modalImg) {
          modalImg.src = data.image;
          modalImg.style.display = 'block';
        }
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      };
    });

    const closeModal = () => {
      modal.classList.remove('active');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // ------------------------------------------------------------------------
  // 7c. GALLERY FILTER TABS & LIGHTBOX
  // ------------------------------------------------------------------------
  function initGalleryLightbox() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (galleryItems.length === 0) return;

    let currentGalleryIndex = 0;
    let visibleGalleryItems = Array.from(galleryItems);

    filterButtons.forEach(btn => {
      btn.onclick = () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        visibleGalleryItems = [];

        galleryItems.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            visibleGalleryItems.push(item);
          } else {
            item.style.display = 'none';
          }
        });
      };
    });

    const updateLightbox = (idx) => {
      if (visibleGalleryItems.length === 0) return;
      currentGalleryIndex = (idx + visibleGalleryItems.length) % visibleGalleryItems.length;
      const targetItem = visibleGalleryItems[currentGalleryIndex];
      const img = targetItem.querySelector('img');
      const title = targetItem.querySelector('.gallery-item-caption, h4, span')?.textContent || 'Galeri Candi Cangkuang';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${visibleGalleryItems.length}`;
    };

    galleryItems.forEach(item => {
      item.onclick = () => {
        const idx = visibleGalleryItems.indexOf(item);
        if (idx !== -1) {
          updateLightbox(idx);
          if (lightboxModal) {
            lightboxModal.classList.add('active');
            lightboxModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }
      };
    });

    const closeLightbox = () => {
      if (lightboxModal) {
        lightboxModal.classList.remove('active');
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    if (lightboxClose) lightboxClose.onclick = closeLightbox;
    if (lightboxPrev) {
      lightboxPrev.onclick = () => updateLightbox(currentGalleryIndex - 1);
    }
    if (lightboxNext) {
      lightboxNext.onclick = () => updateLightbox(currentGalleryIndex + 1);
    }
    if (lightboxModal) {
      lightboxModal.onclick = (e) => {
        if (e.target === lightboxModal) closeLightbox();
      };
    }

    document.addEventListener('keydown', (e) => {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev?.click();
        if (e.key === 'ArrowRight') lightboxNext?.click();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. STICKY NAVBAR, ACTIVE LINKS & MOBILE DRAWER
  // ------------------------------------------------------------------------
  function initNavigation() {
    const siteHeader = document.getElementById('siteHeader');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header Scroll effect
    const onScroll = () => {
      if (window.scrollY > 40) {
        siteHeader?.classList.add('scrolled');
      } else {
        siteHeader?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const rawHref = link.getAttribute('href') || '';
      const cleanHref = rawHref.replace(/^\.\//, '');
      if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile Hamburger Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.onclick = (e) => {
        e.preventDefault();
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      };

      // Close mobile drawer when clicking any link
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
  }

  // ------------------------------------------------------------------------
  // 9. SEAMLESS SPA / PJAX NAVIGATION (MUSIK TIDAK PERNAH TERPUTUS)
  // ------------------------------------------------------------------------
  function initSeamlessSpaNavigation() {
    document.addEventListener('click', async (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Hanya tangani tautan internal .html (bukan hash, bukan http eksternal, bukan mailto/tel)
      const isInternal = href.endsWith('.html') || href === 'index.html' || href === './';
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');

      if (!isInternal || isExternal) return;

      e.preventDefault();
      const targetUrl = link.href;

      try {
        // Tampilkan indikator loading halus di rakit progress
        const streamBar = document.getElementById('raftStreamBar');
        if (streamBar) streamBar.style.opacity = '0.5';

        const res = await fetch(targetUrl);
        if (!res.ok) {
          window.location.href = targetUrl;
          return;
        }

        const htmlText = await res.text();
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(htmlText, 'text/html');

        const newMain = newDoc.querySelector('#mainContent') || newDoc.querySelector('main') || newDoc.querySelector('.hero-section');
        const currentMain = document.querySelector('#mainContent') || document.querySelector('main') || document.querySelector('.hero-section');

        if (newMain && currentMain) {
          // Animasi keluar
          currentMain.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          currentMain.style.opacity = '0';
          currentMain.style.transform = 'translateY(10px)';

          setTimeout(() => {
            // Ganti konten
            currentMain.innerHTML = newMain.innerHTML;
            currentMain.className = newMain.className;

            // Ganti judul dokumen
            document.title = newDoc.title;

            // Update URL browser
            window.history.pushState({ path: targetUrl }, '', targetUrl);

            // Scroll ke atas halaman
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Animasi masuk
            currentMain.style.opacity = '1';
            currentMain.style.transform = 'translateY(0)';

            // Perbarui status link aktif di navbar
            initNavigation();

            // Re-inisialisasi seluruh modul interaktif halaman baru
            initKampungPuloSimulator();
            init3DSecretCards();
            initCinematicTourPlayer();
            initTicketCalculator();
            initSpotModal();
            initGalleryLightbox();

            // Pastikan pemutar musik latar tetap sinkron
            if (window.CangkuangMusicPlayer) {
              window.CangkuangMusicPlayer.updateButtons();
            }

            if (streamBar) streamBar.style.opacity = '1';
          }, 260);
        } else {
          window.location.href = targetUrl;
        }
      } catch (err) {
        console.warn('[SPA Navigation] Navigasi otomatis fallback:', err);
        window.location.href = targetUrl;
      }
    });

    // Dukungan tombol Back / Forward browser
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }

  // ------------------------------------------------------------------------
  // 10. SCROLL-REVEAL OBSERVER
  // ------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.portal-card, .spot-card, .facility-card, .timeline-item, .hero-stat-card, .card-3d-wrap'
    );

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(elem => {
      elem.style.opacity = '0';
      elem.style.transform = 'translateY(24px)';
      elem.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(elem);
    });
  }

  // ------------------------------------------------------------------------
  // BOOTSTRAP ALL SYSTEMS
  // ------------------------------------------------------------------------
  initRaftScrollTracker();
  initNavigation();
  initKampungPuloSimulator();
  init3DSecretCards();
  initCinematicTourPlayer();
  initTicketCalculator();
  initSpotModal();
  initGalleryLightbox();
  initSeamlessSpaNavigation();
  initScrollReveal();
});
