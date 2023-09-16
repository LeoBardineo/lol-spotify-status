const express = require('express')
const app = express()
const axios = require('axios')
const https = require('https')
const cors = require('cors')
const { getPlayingTrack } = require('./scrapper')
const { authenticate } = require('league-connect')

require('dotenv').config()
const port = process.env.API_PORT || 3000

app.use(express.json())

app.use(cors())
app.options('*', cors())

const setStatusMessage = async (req, res) => {
  const agent = new https.Agent({ rejectUnauthorized: false })
  const credentials = await authenticate();
  const password = Buffer.from(`riot:${credentials.password}`).toString('base64')
  const statusMessage = req.body.statusMessage
  const response = await axios.put(`https://127.0.0.1:${credentials.port}/lol-chat/v1/me`, {
    statusMessage
  }, {
    httpsAgent: agent,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${password}`
    }
  });
  console.log(response)
  res.json(response.data.lol)
}

app.put('/', setStatusMessage)
app.put('/lastfm', async (req, res) => {
  const { track, artist } = await getPlayingTrack()
  req.body.statusMessage = req.body.statusMessage.replace('{track}', track).replace('{artist}', artist)
  await setStatusMessage(req, res)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})