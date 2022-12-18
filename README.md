## LoL Spotify Status

É tipo o status do MSN, só que no LoL.

<video width="480" controls>
    <source src="./lol-spotify-status.mp4" type="video/mp4" >
</video>

Pra configurar é só criar o token.js na raiz, colocar o token do SDK do Spotify e a porta da API da seguinte forma:

```js
export const spotifyToken = '<tokenAqui>'
export const apiPort = 3000
```

Também é preciso criar o .env na pasta server, com o password e o port do lockfile, e a porta da API, que é opcional e vem como default 3000.

```js
LOCKFILE_PASSWORD=qmDi66exHlO6PwBH6mXsyw
LOCKFILE_PORT=1298
API_PORT=3000
```

É... mais um projetinho inútil. Mas foi divertido fazer.