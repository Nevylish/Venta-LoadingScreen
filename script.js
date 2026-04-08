document.addEventListener('DOMContentLoaded', () => {
    if (
        ['loading.ventarp.fr', '127.0.0.1', 'localhost', 'nevylish.fr', 'netlify.app', 'github.io'].includes(
            window.location.hostname,
        )
    ) {
        const font = document.createElement('style');
        font.innerHTML = `
            @font-face {
                font-family: 'Brittany Signature';
                src: url('https://nevylish.fr/assets/fonts/BrittanySignature-LjyZ.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }
        `;
        document.head.appendChild(font);

        let value = 0;

        const intervalId = setInterval(() => {
            value += Math.random(0, 1) / 10;
            if (value > 1) {
                clearInterval(intervalId);
            }
            document.getElementById('loading-bar').value = value;
        }, 1000);

        const watermark = document.createElement('div');
        watermark.innerText = `Nevylish`;
        watermark.style.position = 'fixed';
        watermark.style.textAlign = 'center';
        watermark.style.bottom = '1.6vh';
        watermark.style.right = '1vw';
        watermark.style.color = 'rgba(255, 255, 255, 0.3)';
        watermark.style.fontFamily = 'Brittany Signature';
        watermark.style.fontSize = '18px';
        watermark.style.zIndex = '9999';
        watermark.style.transition = 'opacity 0.5s ease-in-out';
        document.body.appendChild(watermark);
        console.log(
            'Development preview, go to https://github.com/Nevylish/Venta-LoadingScreen.\nCreated by Nevylish for Venta Rôleplay.',
        );

        setTimeout(() => {
            watermark.style.opacity = '0';
        }, 1000);

        const names = [
            'Léa',
            'Lucas',
            'Théo',
            'Thomas',
            'Manon',
            'Hugo',
            'Emma',
            'Chloé',
            'Maxime',
            'Enzo',
            'Antoine',
            'Clément',
            'Ryan',
            'Quentin',
            'Clara',
            'Marie',
            'Léane',
            'Sarah',
            'Nicolas',
            'Inès',
            'Romain',
            'Léo',
            'Louis',
            'Inès',
            'Lucie',
            'Anaïs',
            'Baptiste',
            'Nathan',
            'Valentin',
            'Paul',
            'Mathis',
            'Mathilde',
            'Julie',
            'Laura',
            'Arthur',
            'Julien',
            'Lisa',
            'Axel',
            'Eva',
            'Benjamin',
            'Ambre',
            'Maeva',
            'Pierre',
            'Eden',
            'Tiago',
        ];

        const name = names[Math.floor(Math.random() * names.length)];
        document.querySelector('.title').innerText = `Bienvenue sur Venta Rôleplay, ${name}`;
    } else {
        if (window.nuiHandoverData && window.nuiHandoverData.name) {
            document.querySelector('.title').innerText = 'Bienvenue sur Venta Rôleplay, ' + window.nuiHandoverData.name;
        }

        window.addEventListener('message', (event) => {
            if (event.data.eventName !== 'loadProgress') return;
            document.getElementById('loading-bar').value = event.data.loadFraction;
        });
    }

    function shuffle(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const songs = shuffle([
        {
            id: 'music1',
            file: 'songs/song1.mp3',
            icon: 'songs/song1.jpg',
            title: 'Pump It Louder',
            artist: 'Tiësto & Black Eyed Peas',
        },
        {
            id: 'music2',
            file: 'songs/song2.mp3',
            icon: 'songs/song2.jpg',
            title: 'Dirty Cash',
            artist: 'PAWSA & The Adventures Of Stevie V',
        },
        {
            id: 'music3',
            file: 'songs/song3.mp3',
            icon: 'songs/song3.jpg',
            title: 'Chill Like That',
            artist: 'Sunday Scaries & PiCKUPLiNES',
        },
        {
            id: 'music4',
            file: 'songs/song4.mp3',
            icon: 'songs/song4.jpg',
            title: 'JUMP',
            artist: 'BLACKPINK',
        },
        {
            id: 'music5',
            file: 'songs/song5.mp3',
            icon: 'songs/song5.png',
            title: 'Soviet Connection',
            artist: 'Michael Hunter (GTA IV Theme)',
        },
    ]);

    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex].file);
    let currentVolume = 0.15;

    let audioCtx, analyser, sourceNode, lowpassFilter, gainNode;
    const background = document.getElementById('background');

    function setVolume(value) {
        currentVolume = value;
        if (gainNode && audioCtx) {
            gainNode.gain.setTargetAtTime(value, audioCtx.currentTime, 0.05);
        }
    }

    function setupAudioAnalyzer(audioElement) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (sourceNode) {
            try {
                sourceNode.disconnect();
            } catch (_) {}
        }
        if (lowpassFilter) {
            try {
                lowpassFilter.disconnect();
            } catch (_) {}
        }
        if (!gainNode) {
            gainNode = audioCtx.createGain();
            gainNode.gain.value = currentVolume;
        } else {
            try {
                gainNode.disconnect();
            } catch (_) {}
        }

        audioElement.volume = 1;

        sourceNode = audioCtx.createMediaElementSource(audioElement);

        lowpassFilter = audioCtx.createBiquadFilter();
        lowpassFilter.type = 'lowpass';
        lowpassFilter.frequency.value = 160;
        lowpassFilter.Q.value = 1;

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;

        sourceNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        sourceNode.connect(lowpassFilter);
        lowpassFilter.connect(analyser);
    }

    setupAudioAnalyzer(audio);

    function flashBackground() {
        background.style.filter = 'brightness(0.9)';
        background.style.transition = 'filter 0.15s ease-out';
        setTimeout(() => {
            background.style.filter = 'brightness(0.75)';
        }, 150);
    }

    function startBeatDetection() {
        if (!analyser) return;
        const bufferLength = analyser.fftSize;
        const timeData = new Float32Array(bufferLength);

        const historySize = 43;
        const factor = 1.35;
        const deltaMin = 0.01;
        const cooldown = 60;

        const energyHistory = new Float32Array(historySize).fill(0);
        let historyPos = 0;
        let lastFlash = 0;

        function detect() {
            requestAnimationFrame(detect);
            analyser.getFloatTimeDomainData(timeData);

            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = timeData[i];
                sum += v * v;
            }
            const energy = sum / bufferLength;

            energyHistory[historyPos] = energy;
            historyPos = (historyPos + 1) % historySize;

            let avgEnergy = 0;
            for (let i = 0; i < historySize; i++) avgEnergy += energyHistory[i];
            avgEnergy /= historySize;

            const now = performance.now();
            if (energy > avgEnergy * factor && energy - avgEnergy > deltaMin && now - lastFlash > cooldown) {
                flashBackground();
                lastFlash = now;
            }
        }
        detect();
    }

    startBeatDetection();

    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressFill = document.getElementById('progressFill');
    const progressBar = document.querySelector('.progress-bar');
    const totalTimeSpan = document.getElementById('totalTime');
    const currentTimeSpan = document.getElementById('currentTime');
    const songTitle = document.querySelector('.song-title');
    const artistName = document.querySelector('.artist');
    const songIcon = document.querySelector('.song-icon');

    function updateTrackInfo() {
        const currentTrack = songs[currentSongIndex];
        if (songTitle) songTitle.textContent = currentTrack.title;
        if (artistName) artistName.textContent = currentTrack.artist;
        if (songIcon) {
            if (currentTrack.icon) {
                songIcon.src = currentTrack.icon;
                songIcon.style.display = '';
            } else {
                songIcon.src = '';
                songIcon.style.display = 'none';
            }
        }
    }

    function updateProgress() {
        if (audio.duration && progressFill) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
    }

    function updateCurrentTime() {
        if (currentTimeSpan) {
            currentTimeSpan.textContent = formatTime(audio.currentTime);
        }
    }

    function updateTotalTime() {
        if (totalTimeSpan) {
            totalTimeSpan.textContent = formatTime(audio.duration);
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function play() {
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        if (audio.paused) {
            audio.play().catch((err) => {
                if (err.name !== 'AbortError') {
                    console.warn('Erreur de lecture:', err);
                }
            });
        }
        playPauseBtn.classList.add('playing');
    }

    function pause() {
        if (!audio.paused) {
            audio.pause();
        }
        playPauseBtn.classList.remove('playing');
    }

    function previousTrack() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        switchTrack();
    }

    function nextTrack() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        switchTrack();
    }

    function switchTrack() {
        audio.pause();
        audio = new Audio(songs[currentSongIndex].file);
        currentVolume = volumeSlider.value / 100;
        setupAudioAnalyzer(audio);
        setVolume(currentVolume);
        setAudioEvents();
        updateTrackInfo();
        play();
    }

    function setAudioEvents() {
        audio.onloadedmetadata = null;
        audio.ontimeupdate = null;
        audio.onended = null;
        audio.onplay = null;
        audio.onpause = null;

        audio.addEventListener('loadedmetadata', () => {
            updateTotalTime();
            updateCurrentTime();
        });
        audio.addEventListener('timeupdate', () => {
            updateProgress();
            updateCurrentTime();
        });
        audio.addEventListener('ended', () => nextTrack());
        audio.addEventListener('play', () => {
            playPauseBtn.classList.add('playing');
        });
        audio.addEventListener('pause', () => {
            playPauseBtn.classList.remove('playing');
        });
    }

    setAudioEvents();
    updateTrackInfo();
    updateTotalTime();
    updateCurrentTime();
    updateProgress();

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) play();
        else pause();
    });
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    volumeSlider.addEventListener('input', (e) => {
        setVolume(e.target.value / 100);
    });
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * audio.duration;
        audio.currentTime = seekTime;
    });

    function tryAutoplay() {
        audio.play().catch((err) => {
            if (err.name !== 'AbortError') {
                console.warn('Erreur de lecture:', err);
            }

            const unlock = () => {
                if (audio.paused) {
                    audio.play().catch((err) => {
                        if (err.name !== 'AbortError') {
                            console.warn('Erreur de lecture:', err);
                        }
                    });
                }
                document.removeEventListener('click', unlock);
                document.removeEventListener('keydown', unlock);
            };
            document.addEventListener('click', unlock);
            document.addEventListener('keydown', unlock);
        });
    }
    tryAutoplay();

    document.addEventListener('keydown', function (event) {
        if (
            event.code === 'Space' &&
            !event.repeat &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA'
        ) {
            event.preventDefault();
            if (audio.paused) {
                play();
            } else {
                pause();
            }
        }
    });
});
