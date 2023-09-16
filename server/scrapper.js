const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()

const url = `https://www.last.fm/user/${process.env.LASTFM_USER}`

const config = {
    headers: {
        'authority': 'www.last.fm',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'max-age=0',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1'
    }
}

const getPlayingTrack = async () => {
    const res = await axios.get(url, config)
    const html = res.data
    const $ = cheerio.load(html)
    const track = $('#recent-tracks-section > table > tbody > tr > td.chartlist-name > a', html).html()
    const artist = $('#recent-tracks-section > table > tbody > tr > td.chartlist-artist > a', html).html()
    return { track, artist }
}

(async () => (console.log(await getPlayingTrack())))()

module.exports = { getPlayingTrack }