## LoL Spotify Status

É tipo o status do MSN, só que no LoL.

https://github.com/LeoBardineo/lol-spotify-status/assets/45073941/7b2e6468-6e99-4f05-ad58-be571d73d5e8

Há duas formas de usar:
- Usando o Spotify Web SDK, disponível no `index.html`.
- Usando o scrapper do LastFM que eu fiz, que pega a track mais recente tocada.

### Usando o Spotify Web
Pra configurar é só criar o token.js na raiz, colocar o token do SDK do Spotify e a porta da API da seguinte forma:

```js
export const spotifyToken = '<tokenAqui>'
export const apiPort = 3000
```

Daí é só iniciar o server com `npm start` na pasta server, abrir o index.html e começar a ouvir de lá.
Dessa forma, o status atualiza automaticamente de acordo com a música, mas você vai ouvir pelo navegador em vez do app.

### Usando o Last FM
Também é possível mandar uma request pra pegar a track mais recente do LastFM e atualizar o status.
Pra isso, é só colocar no .env o seu user do LastFM como sendo o `LASTFM_USER`, iniciar o server e mandar um PUT para `/lastfm` com o body com sua mensagem customizável:

```json
{
	"statusMessage": "♫ Tocando {track} - {artist} ♫"
}
```

Sendo `{track}` o nome da música e `{artist}` o nome do artista.

### Variáveis de ambiente

No .env na pasta server, você pode definir o API_PORT como sendo a porta da API, que é opcional e vem como default 3000.
E o LASTFM_USER, como o próprio nome diz, define o user do Last FM que o scrapper vai pegar a track.

```js
API_PORT=3000
LASTFM_USER=leobardineo
```

Fique à vontade para sugerir features ou reportar bugs :)
