// =============================================================================================
//
//                  ██████╗  ██████╗  ███╗   ██╗ ███████╗ ██╗  ██████╗
//                 ██╔════╝ ██╔═══██╗ ████╗  ██║ ██╔════╝ ██║ ██╔════╝
//                 ██║      ██║   ██║ ██╔██╗ ██║ █████╗   ██║ ██║  ███╗
//                 ██║      ██║   ██║ ██║╚██╗██║ ██╔══╝   ██║ ██║   ██║
//                 ╚██████╗ ╚██████╔╝ ██║ ╚████║ ██║      ██║ ╚██████╔╝
//                  ╚═════╝  ╚═════╝  ╚═╝  ╚═══╝ ╚═╝      ╚═╝  ╚═════╝
//
// =============================================================================================

// Liste des sons qui seront joués aléatoirement
// Pensez à bien orthographier les noms des fichiers et les extensions (.mp3 / .jpg / .png...)
const songs = shuffle([
    {
        id: 'song1',
        file: 'songs/song1.mp3',
        icon: 'songs/song1.jpg',
        title: 'Pump It Louder',
        artist: 'Tiësto & Black Eyed Peas',
    },
    {
        id: 'song2',
        file: 'songs/song2.mp3',
        icon: 'songs/song2.jpg',
        title: 'Dirty Cash',
        artist: 'PAWSA & The Adventures Of Stevie V',
    },
    {
        id: 'song3',
        file: 'songs/song3.mp3',
        icon: 'songs/song3.jpg',
        title: 'Chill Like That',
        artist: 'Sunday Scaries & PiCKUPLiNES',
    },
    {
        id: 'song4',
        file: 'songs/song4.mp3',
        icon: 'songs/song4.jpg',
        title: 'JUMP',
        artist: 'BLACKPINK',
    },
]);

// Liste des commandes qui seront affichées
const commands = [
    {
        key: 'F1',
        text: 'Ouvrir la boutique',
    },
    {
        key: 'F3',
        text: 'Changer la portée de la voix',
    },
    {
        key: 'F5',
        text: 'Ouvrir le menu personnel',
    },
    {
        key: 'G',
        text: 'Sortir votre téléphone',
    },
    {
        key: 'U',
        text: 'Utiliser les clés de votre véhicule',
    },
];

// Configuration supplémentaire

// true = activé
// false = désactivé
const config = {
    // Personnalisation du message de bienvenue
    welcome: {
        text: 'Bienvenue sur Venta Rôleplay',

        // Afficher le nom du joueur
        displayPlayerName: true,

        // Inclure l'espace dans le sépérator
        // Utilise si displayPlayerName est activé
        separator: ', ',
    },

    // Volume par défaut (de 0 à 100)
    defaultVolume: 15,

    // Afficher l'image avant le chargement (background/image.png)
    displaySplash: false,

    // Activer le dégradé sombre sur les contours
    enableBackgroundOverlay: true,

    // Activer la détection de basses et faire réagir le fond
    enableReactiveBackground: true,
};

// =============================================================================================
//
//                            ███████╗ ████████╗  ██████╗  ██████╗
//                            ██╔════╝ ╚══██╔══╝ ██╔═══██╗ ██╔══██╗
//                            ███████╗    ██║    ██║   ██║ ██████╔╝
//                            ╚════██║    ██║    ██║   ██║ ██╔═══╝
//                            ███████║    ██║    ╚██████╔╝ ██║
//                            ╚══════╝    ╚═╝     ╚═════╝  ╚═╝
//
//                              NE PAS TOUCHER LE CODE CI-DESSOUS
//                            SAUF SI VOUS SAVEZ CE QUE VOUS FAITES
//
// =============================================================================================

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const loadingBar = document.getElementById('loadingBar');
    const splashContainer = document.getElementById('splashContainer');
    const background = document.getElementById('backgroundContainer');
    const backgroundOverlay = document.getElementById('backgroundOverlay');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const playerContainer = document.getElementById('playerContainer');
    const leftContainer = document.getElementById('leftContainer');

    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressFill = document.getElementById('progressFill');
    const progressBar = document.getElementById('progressBar');
    const totalTimeSpan = document.getElementById('totalTime');
    const currentTimeSpan = document.getElementById('currentTime');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const songIcon = document.getElementById('songIcon');

    const isPreview = () => {
        const hostnames = ['127.0.0.1', 'localhost', 'ventarp.fr', 'nevylish.fr', 'github.io'];

        for (const hostname of hostnames) {
            if (window.location.hostname.includes(hostname)) {
                return true;
            }
        }
        return false;
    };

    if (isPreview()) {
        if (config.welcome.displayPlayerName) {
            const names = [
                'Alvaro',
                'Andrew',
                'Cassie',
                'Diego',
                'Ethan',
                'Eva',
                'Hayley',
                'Ivy',
                'Jake',
                'James',
                'Jessie',
                'Jimmy',
                'Justin',
                'Kurtis',
                'Leon',
                'Lizzy',
                'Megan',
                'Naya',
                'Reese',
                'Ruben',
                'Thomas',
                'Zack',
            ];

            const name = names[Math.floor(Math.random() * names.length)];
            title.innerText = `${config.welcome.text}${config.welcome.separator}${name}`;
        } else {
            title.innerText = config.welcome.text;
        }

        const previewContainer = document.getElementById('previewContainer');
        const previewWatermark = document.getElementById('previewWatermark');

        const year = new Date().getFullYear();
        previewWatermark.innerText = `© ${year} Nevylish — Venta Rôleplay`;

        previewContainer.style.display = 'flex';
        previewContainer.addEventListener('click', () => {
            toggleFullScreen();

            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            audio
                .play()
                .then(() => {
                    audio.pause();
                })
                .catch(() => {});

            previewContainer.style.display = 'none';

            start(true);
        });
    } else {
        title.innerText = config.welcome.text;

        start();

        if (window.nuiHandoverData && window.nuiHandoverData.name && config.welcome.displayPlayerName) {
            title.innerText = `${config.welcome.text}${config.welcome.separator}${window.nuiHandoverData.name}`;
        }

        window.addEventListener('message', (event) => {
            if (event.data.eventName !== 'loadProgress') return;
            loadingBar.value = event.data.loadFraction;
        });
    }

    if (!config.enableBackgroundOverlay) {
        backgroundOverlay.style.display = 'none';
    }
    if (leftContainer && commands.length > 0) {
        commands.forEach((command) => {
            const element = document.createElement('p');
            element.classList.add('command');
            element.innerHTML = `<strong>${command.key}</strong>${command.text}`;
            leftContainer.appendChild(element);
        });
    }

    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex].file);

    let currentVolume = config.defaultVolume / 100;
    volumeSlider.value = config.defaultVolume;

    let audioCtx, analyser, sourceNode, lowpassFilter, gainNode;

    // Only used for web preview
    function startFakeLoading() {
        let value = 0;

        const intervalId = setInterval(() => {
            value += Math.random(0, 1) / 50;
            if (value > 1) {
                clearInterval(intervalId);
            }
            loadingBar.value = value;
        }, 300);
    }

    function start(fakeLoading = false) {
        if (config.displaySplash) splashContainer.style.opacity = '1';

        setTimeout(
            () => {
                splashContainer.style.opacity = '0';
                backgroundVideo.style.opacity = '1';
                playerContainer.style.opacity = '1';

                tryAutoplay();

                if (fakeLoading) {
                    startFakeLoading();
                }
            },
            config.displaySplash ? 2500 : 0,
        );
    }

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

    if (config.enableReactiveBackground) {
        background.style.filter = 'brightness(0.75)';
        startBeatDetection();
    }

    function updateTrackInfo() {
        const currentTrack = songs[currentSongIndex];
        if (songTitle) songTitle.textContent = currentTrack.title;
        if (songArtist) songArtist.textContent = currentTrack.artist;
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
        backgroundVideo.muted = true;
        backgroundVideo.play().catch((err) => {
            if (err.name !== 'AbortError') {
                console.warn('Erreur de lecture vidéo:', err);
            }
        });

        audio.play().catch((err) => {
            if (err.name !== 'AbortError') {
                console.warn('Erreur de lecture audio:', err);
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

    function toggleFullScreen() {
        const doc = window.document;
        const docEl = doc.documentElement;

        const requestFullScreen =
            docEl.requestFullscreen ||
            docEl.mozRequestFullScreen ||
            docEl.webkitRequestFullScreen ||
            docEl.msRequestFullscreen;
        const cancelFullScreen =
            doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (
            !doc.fullscreenElement &&
            !doc.mozFullScreenElement &&
            !doc.webkitFullscreenElement &&
            !doc.msFullscreenElement
        ) {
            requestFullScreen.call(docEl);
        } else {
            cancelFullScreen.call(doc);
        }
    }
});

function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
