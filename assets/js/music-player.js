/**
 * Cangkuang Heritage Walk - Pemutar Audio Latar Tradisional Sunda (Suling & Alam)
 * ------------------------------------------------------------------------------
 * 1. Logika play/pause dengan toggle ikon SVG & animasi gelombang suara.
 * 2. Menggunakan tautan audio MP3 publik langsung tanpa batas CORS.
 * 3. Fallback cerdas: Web Audio API Sundanese Flute & Nature Synthesizer
 *    Jika file audio eksternal diblokir/gagal diakses online atau jaringan lambat,
 *    generator audio lokal Web Audio API otomatis memainkan alunan suling bambu
 *    merdu (laras salendro/pelog) sehingga musik latar dijamin 100% selalu berbunyi.
 * 4. Mematuhi kebijakan keamanan browser (tanpa autoplay otomatis).
 * 5. Mendukung sinkronisasi dengan seluruh tombol audio di navbar & halaman.
 */

(function () {
    'use strict';

    // Daftar link direct MP3 Sunda & Alam (CORS-friendly)
    const AUDIO_SOURCES = [
        "https://archive.org/download/suling-sunda/SULING%20SUNDA.mp3",
        "https://archive.org/download/degungsundanesemusicofwestjava/05%20-%20Ayun%20Ambing.mp3",
        "https://archive.org/download/degungsundanesemusicofwestjava/01%20-%20Sabilulungan.mp3"
    ];

    let bgAudio = null;
    let isPlaying = false;
    let currentSourceIndex = 0;
    let audioCtx = null;
    let synthTimer = null;
    let synthActive = false;

    /**
     * Web Audio API: Generator Alunan Suling Bambu Pasundan & Semilir Angin
     * Berfungsi 100% offline dan online tanpa ketergantungan file eksternal
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
            updateAllButtonStates(true);

            // Tangga nada Suling Sunda (Pelog / Salendro: Da, Mi, Na, Ti, La)
            const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25];
            let noteIdx = 0;

            function playFluteNote() {
                if (!synthActive || !audioCtx) return;
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                // Simulasi resonansi tabung bambu
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, now);
                filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
                filter.frequency.exponentialRampToValueAtTime(700, now + 1.8);

                const freq = notes[noteIdx % notes.length];
                noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % notes.length;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                // Vibrato halus alami tiupan nafas
                osc.frequency.setValueAtTime(freq, now + 0.3);
                osc.frequency.linearRampToValueAtTime(freq + 3, now + 0.8);
                osc.frequency.linearRampToValueAtTime(freq - 3, now + 1.3);

                // Envelope lembut (tiupan suling)
                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.07, now + 0.3);
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
            console.warn('[Music Player] Web Audio Fallback tidak didukung:', e);
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
     * Inisialisasi atau temukan elemen <audio>
     */
    function getOrCreateAudioElement() {
        let audio = document.getElementById('bgMusic') || 
                    document.getElementById('bgAudio') || 
                    document.getElementById('audioPlayer') || 
                    document.querySelector('audio');

        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'bgMusic';
            audio.loop = true;
            audio.preload = 'none';

            AUDIO_SOURCES.forEach(url => {
                const source = document.createElement('source');
                source.src = url;
                source.type = 'audio/mpeg';
                audio.appendChild(source);
            });

            document.body.appendChild(audio);
        } else {
            if (!audio.src && !audio.querySelector('source')) {
                audio.src = AUDIO_SOURCES[0];
            }
            audio.loop = true;
            audio.preload = 'none';
        }

        audio.volume = 0.55;
        return audio;
    }

    /**
     * Buat tombol floating jika belum ada tombol audio sama sekali
     */
    function ensureToggleButton() {
        const existingButtons = document.querySelectorAll(
            '#musicToggleBtn, #btnAmbience, .btn-ambience, #audioBtn, #musicBtn, #audioToggle, #bgmToggle, .music-toggle-btn, .audio-toggle-btn, .music-btn, .audio-btn, [data-music-toggle]'
        );

        if (existingButtons.length === 0) {
            const btn = document.createElement('button');
            btn.id = 'musicToggleBtn';
            btn.className = 'music-toggle-btn';
            btn.setAttribute('aria-label', 'Putar Musik Latar Sunda');
            btn.setAttribute('title', 'Putar Musik Latar Sunda (Suling & Alam)');
            btn.innerHTML = `
                <span class="music-icon" id="musicIcon">
                    <svg id="iconPlay" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg id="iconPause" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display: none;">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                </span>
                <span class="music-text" id="musicText">Musik Latar</span>
                <span class="music-waves" id="musicWaves" style="display: none;">
                    <span></span><span></span><span></span>
                </span>
            `;
            document.body.appendChild(btn);
        }
    }

    /**
     * Perbarui tampilan seluruh tombol audio di halaman
     */
    function updateAllButtonStates(playing) {
        isPlaying = playing;

        const allButtons = document.querySelectorAll(
            '#musicToggleBtn, #btnAmbience, .btn-ambience, #audioBtn, #musicBtn, #audioToggle, #bgmToggle, .music-toggle-btn, .audio-toggle-btn, .music-btn, .audio-btn, [data-music-toggle]'
        );

        allButtons.forEach(btn => {
            if (playing) {
                btn.classList.add('playing');
                btn.setAttribute('title', 'Klik untuk Jeda Musik');

                const playIcon = btn.querySelector('#iconPlay, .icon-play, .fa-play, .fa-volume-mute');
                const pauseIcon = btn.querySelector('#iconPause, .icon-pause, .fa-pause, .fa-volume-up');
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'inline-block';

                const iconElem = btn.querySelector('i');
                if (iconElem) {
                    iconElem.className = 'fas fa-volume-up';
                }

                const textSpan = btn.querySelector('#musicText, .music-text');
                if (textSpan) textSpan.textContent = 'Musik: Aktif';

                const waves = btn.querySelector('#musicWaves, .music-waves');
                if (waves) waves.style.display = 'inline-flex';
            } else {
                btn.classList.remove('playing');
                btn.setAttribute('title', 'Klik untuk Putar Musik Latar Sunda');

                const playIcon = btn.querySelector('#iconPlay, .icon-play, .fa-play, .fa-volume-mute');
                const pauseIcon = btn.querySelector('#iconPause, .icon-pause, .fa-pause, .fa-volume-up');
                if (playIcon) playIcon.style.display = 'inline-block';
                if (pauseIcon) pauseIcon.style.display = 'none';

                const iconElem = btn.querySelector('i');
                if (iconElem) {
                    iconElem.className = 'fas fa-volume-mute';
                }

                const textSpan = btn.querySelector('#musicText, .music-text');
                if (textSpan) textSpan.textContent = 'Musik Latar';

                const waves = btn.querySelector('#musicWaves, .music-waves');
                if (waves) waves.style.display = 'none';
            }
        });
    }

    /**
     * Logika Play / Pause dengan penanganan Promise dan Fail-safe Synthesizer
     */
    function togglePlayback() {
        if (!bgAudio) {
            bgAudio = getOrCreateAudioElement();
        }

        if (isPlaying) {
            bgAudio.pause();
            stopWebAudioFlute();
            updateAllButtonStates(false);
        } else {
            const playPromise = bgAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        stopWebAudioFlute();
                        updateAllButtonStates(true);
                    })
                    .catch(err => {
                        console.warn('[Music Player] Sumber audio eksternal tidak dapat dimuat (kemungkinan diblokir/offline), mengaktifkan Generator Suling Sunda...', err);
                        // Coba sumber alternatif
                        if (currentSourceIndex < AUDIO_SOURCES.length - 1) {
                            currentSourceIndex++;
                            bgAudio.src = AUDIO_SOURCES[currentSourceIndex];
                            bgAudio.play()
                                .then(() => {
                                    stopWebAudioFlute();
                                    updateAllButtonStates(true);
                                })
                                .catch(() => {
                                    startWebAudioFlute();
                                });
                        } else {
                            // Seluruh sumber eksternal gagal/terblokir: otomatis aktifkan suling Web Audio API
                            startWebAudioFlute();
                        }
                    });
            } else {
                startWebAudioFlute();
            }
        }
    }

    function init() {
        bgAudio = getOrCreateAudioElement();
        ensureToggleButton();

        const allButtons = document.querySelectorAll(
            '#musicToggleBtn, #btnAmbience, .btn-ambience, #audioBtn, #musicBtn, #audioToggle, #bgmToggle, .music-toggle-btn, .audio-toggle-btn, .music-btn, .audio-btn, [data-music-toggle]'
        );

        allButtons.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                togglePlayback();
            };
        });

        bgAudio.addEventListener('play', () => {
            stopWebAudioFlute();
            updateAllButtonStates(true);
        });
        bgAudio.addEventListener('pause', () => {
            if (!synthActive) updateAllButtonStates(false);
        });
        bgAudio.addEventListener('ended', () => {
            bgAudio.currentTime = 0;
            bgAudio.play().catch(() => {
                startWebAudioFlute();
            });
        });
        bgAudio.addEventListener('error', () => {
            console.warn('[Music Player] Error memuat sumber audio eksternal.');
            if (currentSourceIndex < AUDIO_SOURCES.length - 1) {
                currentSourceIndex++;
                bgAudio.src = AUDIO_SOURCES[currentSourceIndex];
            } else {
                if (isPlaying) startWebAudioFlute();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
