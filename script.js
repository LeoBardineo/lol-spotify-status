import { spotifyToken, apiPort } from "./token.js"

let lastSong = ''
let lastArtist = ''

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = spotifyToken;
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
  });
  player.addListener('initialization_error', ({ message }) => { 
    console.error(message);
  });
  
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });

  player.addListener('player_state_changed', ({ context }) => {
    if(context.metadata.current_item.name !== lastSong){
      lastSong = context.metadata.current_item.name
      lastArtist = context.metadata.current_item.artists[0].name
      const message = `♫ Tocando ${lastSong} - ${lastArtist} ♫`
      console.log(message)
      changeLoLStatus(message)
    }
  })
  
  player.connect();

  document.getElementById('togglePlay').onclick = function() {
    player.togglePlay();
  };
}

const changeLoLStatus = (message) => {
  fetch(`http://localhost:${apiPort}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ statusMessage: message })
  });
}