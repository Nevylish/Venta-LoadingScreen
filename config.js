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

// Si vous ne voulez pas de musique, laissez comme ci-dessous
// const songs = []

const songs = [
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
];

// Liste des commandes qui seront affichées
const commands = [
    {
        key: 'F1',
        text: 'Open shop',
    },
    {
        key: 'F3',
        text: 'Change voice range',
    },
    {
        key: 'F5',
        text: 'Open personal menu',
    },
    {
        key: 'G',
        text: 'Take out your phone',
    },
    {
        key: 'U',
        text: 'Use your vehicle keys',
    },
];

// Configuration supplémentaire

// true = activé
// false = désactivé
const config = {
    // Personnalisation du message de bienvenue
    welcome: {
        text: 'Welcome to Venta Rôleplay',

        // Inclure l'espace dans le sépérator
        // Utilise si displayPlayerName est activé
        separator: ', ',

        // Afficher le nom du joueur
        displayPlayerName: true,
    },

    music: {
        // Activer la musique
        enable: true,

        // Volume par défaut (de 0 à 100)
        defaultVolume: 15,

        // Cacher le lecteur de musique (lecteur invisible)
        hidePlayer: false,

        // Jouer les musiques dans un ordre aléatoire
        shuffleSongs: true,

        // Activer la détection de basses et faire réagir le fond
        enableReactiveBackground: true,

        // Couleur de la barre de progression (par défaut: #4e80eca8)
        // https://htmlcolorcodes.com/
        progressBarColor: '#4e80eca8',
    },

    loadingBar: {
        // Activer la barre de chargement
        enable: true,
    },

    splashScreen: {
        // Activer le splash screen
        enable: true,
        // Temps d'affichage du splash screen en secondes
        duration: 2.5,
    },

    // Afficher le logo en haut à droite
    displayLogo: true,

    // Activer le dégradé sombre sur les contours
    enableBackgroundOverlay: true,
};
