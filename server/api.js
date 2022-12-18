const express = require('express')
const app = express()
const axios = require('axios')
const https = require('https')
const cors = require('cors')

require('dotenv').config()
const lockfilePassowrd = process.env.LOCKFILE_PASSWORD
const lockfilePort = process.env.LOCKFILE_PASSWORD
const port = process.env.API_PORT || 3000

app.use(express.json())

app.use(cors())
app.options('*', cors())

//pegar info diretamente do lockfile
app.put('/', async (req, res) => {
  const agent = new https.Agent({ rejectUnauthorized: false })
  const password = Buffer.from(`riot:${lockfilePassowrd}`).toString('base64')
  const statusMessage = req.body.statusMessage
  const response = await axios.put(`https://127.0.0.1:${lockfilePort}/lol-chat/v1/me`, {
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
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})