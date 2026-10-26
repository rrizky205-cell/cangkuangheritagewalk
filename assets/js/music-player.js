/**
 * ==========================================================================
 * CANDI CANGKUANG HERITAGE WALK - WORLD-CLASS MUSIC & AMBIENCE SYSTEM
 * Alunan Suling Pasundan Merdu & Gemercik Air Situ Cangkuang Alami
 * --------------------------------------------------------------------------
 * Fitur Utama:
 * 1. Persistent Audio Playback via sessionStorage (musik tetap memutar saat ganti halaman / hard refresh).
 * 2. Floating Glassmorphic Audio Widget dengan 4-Bar Animated Soundwave Equalizer.
 * 3. Dual-Engine Audio:
 *    - Direct Online MP3 (Archive.org high-quality Sundanese Degung & Suling)
 *    - Web Audio API Synthesizer Fallback (Salendro/Pelog Flute Generator 100% offline-ready).
 * 4. Integrasi seamless dengan SPA / PJAX transition di main.js.
 * 5. Public API: window.CangkuangMusicPlayer (play, pause, toggle, isPlaying).
 * ==========================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY_PLAYING = 'cangkuang_audio_playing';
  const STORAGE_KEY_TIME = 'cangkuang_audio_time';
  const STORAGE_KEY_TRACK = 'cangkuang_audio_track';
  const STORAGE_KEY_VOL = 'cangkuang_audio_volume';

  const AUDIO_SOURCES = [
    {
      title: "Alunan Suling Bambu Pasundan & Gemercik Situ",
      url: "https://archive.org/download/suling-sunda/SULING%20SUNDA.mp3"
    },
    {
      title: "Degung Tradisional Jawa Barat - Ayun Ambing",
      url: "https://archive.org/download/degungsundanesemusicofwestjava/05%20-%20Ayun%20Ambing.mp3"
    },
    {
      title: "Gamelan Degung Pasundan - Sabilulungan",
      url: "https://archive.org/download/degungsundanesemusicofwestjava/01%20-%20Sabilulungan.mp3"
    }
  ];

  let bgAudio = null;
  let isPlaying = false;
  let currentSourceIndex = 0;
  let audioCtx = null;
  let synthTimer = null;
  let synthActive = false;
  let saveTimeInterval = null;

  /**
   * Web Audio API: Fallback Alunan Suling Bambu Pasundan (Laras Salendro/Pelog)
   * Aktif otomatis jika koneksi internet terputus atau tautan eksternal terhambat.
   */
  function startWebAudioFlute() {
    if (synthActive) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      synthActive = true;
      isPlaying = true;
      sessionStorage.setItem(STORAGE_KEY_PLAYING, 'true');
      updateAllButtonStates(true);

      const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25];
      let noteIdx = 0;

      function playFluteNote() {
        if (!synthActive || !audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
        filter.frequency.exponentialRampToValueAtTime(700, now + 1.8);

        const freq = notes[noteIdx % notes.length];
        noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % notes.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.setValueAtTime(freq, now + 0.3);
        osc.frequency.linearRampToValueAtTime(freq + 3, now + 0.8);
        osc.frequency.linearRampToValueAtTime(freq - 3, now + 1.3);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 2.1);

        const nextDelay = 1800 + Math.random() * 1200;
        synthTimer = setTimeout(playFluteNote, nextDelay);
      }

      playFluteNote();
    } catch (e) {
      console.warn('[Music Player] Web Audio Fallback error:', e);
    }
  }

  function stopWebAudioFlute() {
    synthActive = false;
    if (synthTimer) {
      clearTimeout(synthTimer);
      synthTimer = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend().catch(() => {});
    }
  }

  /**
   * Dapatkan atau inisialisasi elemen <audio>
   */
  function getOrCreateAudioElement() {
    let audio = document.getElementById('bgMusic');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'bgMusic';
      audio.loop = true;
      audio.preload = 'auto';

      AUDIO_SOURCES.forEach(sourceItem => {
        const sourceElem = document.createElement('source');
        sourceElem.src = sourceItem.url;
        sourceElem.type = 'audio/mpeg';
        audio.appendChild(sourceElem);
      });

      document.body.appendChild(audio);
    }

    const savedVol = sessionStorage.getItem(STORAGE_KEY_VOL);
    audio.volume = savedVol ? parseFloat(savedVol) : 0.6;
    return audio;
  }

  /**
   * Buat Floating Equalizer Widget di pojok layar
   */
  function ensureFloatingWidget() {
    let widget = document.getElementById('floatingAudioWidget');
    if (!widget) {
      widget = document.createElement('div');
      widget.id = 'floatingAudioWidget';
      widget.className = 'floating-audio-widget';
      widget.setAttribute('role', 'region');
      widget.setAttribute('aria-label', 'Pemutar Musik Latar Tradisional Sunda');
      widget.innerHTML = `
        <button class="audio-pill-btn" id="audioPillBtn" aria-label="Nyalakan Musik Latar Sunda" title="Putar Musik Latar (Suling Pasundan & Gemercik Situ)">
          <div class="audio-equalizer" id="audioEqualizer">
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
          </div>
          <div class="audio-info">
            <span class="audio-label" id="audioLabel">Alunan Suling Sunda</span>
            <span class="audio-sub" id="audioSub">Sentuh untuk Putar</span>
          </div>
          <div class="audio-play-icon" id="audioPlayIcon">
            <i class="fas fa-play"></i>
          </div>
        </button>
      `;
      document.body.appendChild(widget);

      const pillBtn = document.getElementById('audioPillBtn');
      if (pillBtn) {
        pillBtn.addEventListener('click', (e) => {
          e.preventDefault();
          togglePlayback();
        });
      }
    }
  }

  /**
   * Perbarui tampilan seluruh tombol audio di halaman
   */
  function updateAllButtonStates(playing) {
    isPlaying = playing;

    // 1. Floating Widget
    const widget = document.getElementById('floatingAudioWidget');
    const pillBtn = document.getElementById('audioPillBtn');
    const equalizer = document.getElementById('audioEqualizer');
    const audioLabel = document.getElementById('audioLabel');
    const audioSub = document.getElementById('audioSub');
    const playIcon = document.getElementById('audioPlayIcon');

    if (pillBtn) {
      if (playing) {
        pillBtn.classList.add('playing');
        if (equalizer) equalizer.classList.add('active');
        if (audioLabel) audioLabel.textContent = 'Alunan Suling Sunda';
        if (audioSub) audioSub.textContent = '● Sedang Memutar';
        if (playIcon) playIcon.innerHTML = '<i class="fas fa-pause"></i>';
        pillBtn.setAttribute('title', 'Jeda Musik Latar');
      } else {
        pillBtn.classList.remove('playing');
        if (equalizer) equalizer.classList.remove('active');
        if (audioSub) audioSub.textContent = 'Klik untuk Putar';
        if (playIcon) playIcon.innerHTML = '<i class="fas fa-play"></i>';
        pillBtn.setAttribute('title', 'Putar Musik Latar Sunda');
      }
    }

    // 2. Tombol navbar & halaman lainnya
    const otherButtons = document.querySelectorAll(
      '#btnAmbience, .btn-ambience, #musicToggleBtn, [data-music-toggle]'
    );

    otherButtons.forEach(btn => {
      if (playing) {
        btn.classList.add('playing');
        btn.setAttribute('title', 'Jeda Musik Latar');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-volume-up';
      } else {
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Putar Musik Latar Sunda');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-volume-mute';
      }
    });
  }

  /**
   * Logika Toggle Play / Pause
   */
  function togglePlayback() {
    if (!bgAudio) {
      bgAudio = getOrCreateAudioElement();
    }

    if (isPlaying) {
      bgAudio.pause();
      stopWebAudioFlute();
      sessionStorage.setItem(STORAGE_KEY_PLAYING, 'false');
      updateAllButtonStates(false);
    } else {
      const savedTime = sessionStorage.getItem(STORAGE_KEY_TIME);
      if (savedTime && !isNaN(parseFloat(savedTime)) && parseFloat(savedTime) > 0) {
        bgAudio.currentTime = parseFloat(savedTime);
      }

      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            stopWebAudioFlute();
            sessionStorage.setItem(STORAGE_KEY_PLAYING, 'true');
            updateAllButtonStates(true);
          })
          .catch(err => {
            console.warn('[Music Player] MP3 eksternal dijeda oleh peramban / offline. Mengaktifkan Suling Synthesizer...', err);
            startWebAudioFlute();
          });
      } else {
        startWebAudioFlute();
      }
    }
  }

  /**
   * Coba pulihkan playback otomatis dari sesi sebelumnya (misal setelah refresh atau navigasi)
   */
  function tryRestoreSession() {
    const wasPlaying = sessionStorage.getItem(STORAGE_KEY_PLAYING) === 'true';
    if (wasPlaying && bgAudio) {
      const savedTime = sessionStorage.getItem(STORAGE_KEY_TIME);
      if (savedTime && parseFloat(savedTime) > 0) {
        bgAudio.currentTime = parseFloat(savedTime);
      }
      bgAudio.play()
        .then(() => {
          updateAllButtonStates(true);
        })
        .catch(() => {
          // Jika browser menuntut user gesture baru, biarkan tombol menunjukkan ajakan klik
          updateAllButtonStates(false);
          const sub = document.getElementById('audioSub');
          if (sub) sub.textContent = 'Lanjutkan Musik ▶';
        });
    }
  }

  /**
   * Inisialisasi Player
   */
  function init() {
    bgAudio = getOrCreateAudioElement();
    ensureFloatingWidget();

    // Event listeners tombol navbar
    const navButtons = document.querySelectorAll(
      '#btnAmbience, .btn-ambience, #musicToggleBtn, [data-music-toggle]'
    );
    navButtons.forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        togglePlayback();
      };
    });

    // Simpan posisi playback setiap detik saat memutar
    bgAudio.addEventListener('timeupdate', () => {
      if (!bgAudio.paused && bgAudio.currentTime > 0) {
        sessionStorage.setItem(STORAGE_KEY_TIME, bgAudio.currentTime.toFixed(1));
      }
    });

    bgAudio.addEventListener('play', () => {
      stopWebAudioFlute();
      sessionStorage.setItem(STORAGE_KEY_PLAYING, 'true');
      updateAllButtonStates(true);
    });

    bgAudio.addEventListener('pause', () => {
      if (!synthActive) {
        sessionStorage.setItem(STORAGE_KEY_PLAYING, 'false');
        updateAllButtonStates(false);
      }
    });

    bgAudio.addEventListener('ended', () => {
      bgAudio.currentTime = 0;
      sessionStorage.setItem(STORAGE_KEY_TIME, '0');
      bgAudio.play().catch(() => startWebAudioFlute());
    });

    bgAudio.addEventListener('error', () => {
      console.warn('[Music Player] Error berkas audio online, mengalihkan ke generator...');
      if (isPlaying) {
        startWebAudioFlute();
      }
    });

    tryRestoreSession();
  }

  // Ekspor API Publik untuk dipanggil oleh main.js / SPA router
  window.CangkuangMusicPlayer = {
    init: init,
    play: function () {
      if (!isPlaying) togglePlayback();
    },
    pause: function () {
      if (isPlaying) togglePlayback();
    },
    toggle: togglePlayback,
    isPlaying: function () {
      return isPlaying;
    },
    updateButtons: function () {
      updateAllButtonStates(isPlaying);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
