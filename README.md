# Venta Rôleplay - Loading Screen

A modern, highly customizable, and interactive FiveM loading screen created for Venta Rôleplay. It features a stunning 4K YouTube video background, a fully functional music player, and audio-reactive visual effects to keep your players entertained while joining your server.

## ✨ Features

- **🎬 4K UHD Video Background**: Utilizes the YouTube API to automatically maintain the highest visual quality (hd2160) and provides seamless looping without quality drops.
- **🎵 Custom Audio Player**: A fully embedded music player displaying album covers, track titles, and artists. Includes interactive controls (clickable progress bar, volume slider, next/previous track buttons).
- **🔊 Audio-Reactive (Beat Detection)**: Visual background effects (subtle dimming/flashing) smoothly synchronized with the bass of the playing track using the Web Audio API.
- **🔄 FiveM Synchronization**: A dynamic progress bar that communicates directly with native FiveM loading events (`loadProgress` and `nuiHandoverData`) to show true loading states.
- **📱 Responsive Design**: Fully responsive CSS scaled for all displays, ranging from standard monitors all the way up to ultra-wide 4K (3840px) displays.

## 📥 Installation

1. Download or clone this repository.
2. Place the folder inside your FiveM server's `resources` directory (e.g., `resources/[local]/venta-loadingscreen`).
3. Add `ensure venta-loadingscreen` to your `server.cfg`.
4. Make sure your `fxmanifest.lua` is properly configured to load `index.html` as the `loadscreen`.

## ⚙️ Configuration

### Changing the Background Video

To change the YouTube background video, open `index.html` and modify the following variable with your desired YouTube Video ID:

```html
<script>
    let videoId = 'nVnnSm00EUM'; // Replace with your YouTube Video ID
    // ...
</script>
```

### Changing the Music

To add or modify the available songs, open `script.js` and edit the `songs` array. Make sure your `.mp3` and cover image files are in the `songs/` folder.

```javascript
const songs = shuffle([
    {
        id: 'music1',
        file: 'songs/song1.mp3',
        icon: 'songs/song1.jpg',
        title: 'Pump It Louder',
        artist: 'Tiësto & Black Eyed Peas',
    },
    // Add more objects here...
]);
```

### Default Volume

To change the default startup volume, you need to update two files so that the logic and the visual slider match.

1. **In `script.js`**: Adjust the base logic value (between `0.0` and `1.0`).
```javascript
let currentVolume = 0.15; // Represents 15% volume
```

2. **In `index.html`**: Update the visual slider `value` attribute (between `0` and `100`) to match the percentage above.
```html
<div class="volume-control">
    <input type="range" id="volumeSlider" min="0" max="100" value="15" class="volume-slider" />
</div>
```

### Customizing the Display Name

By default, the loading screen displays the player's FiveM/Steam account name (e.g., "Bienvenue sur Venta Rôleplay, PlayerName"). This data is handed over from the server.

To change what name is sent to the loading screen, edit the `server.lua` file:

```lua
AddEventHandler('playerConnecting', function(_, _, deferrals)
    local source = source

    -- Modify 'name' to whatever you want the loading screen to display.
    -- e.g., fetching a roleplay character's name from your database if allowed during connection.
    deferrals.handover({
        name = GetPlayerName(source)
    })
end)
```

The front-end (`script.js`) automatically reads `window.nuiHandoverData.name` to update the welcome text.
