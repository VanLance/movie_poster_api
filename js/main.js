const [clientId,clientSecret] = ["23f689545bf74c10a2d4dd9817cbb426",'6284d9ce160d44759101c9619060dad2']

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body : 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await result.json()
    return data.access_token
}


const getSong = async (track, artist) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist&limit=5`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": 'application/json'
        }
    })
    const data = await result.json()
    return data.tracks.items[0].preview_url
}


const clickedEvent = async (figId) => {
    const imgIndex = parseInt(figId.slice(-1)) - 1
    const [track, artist] = document.getElementsByTagName('img')[imgIndex].alt.split(' - ')
    const song = await getSong(track,artist)
    if(playSong){
        playSong.pause()
    }
    startSong(song)
}

let playSong 

const startSong = (url) => {
    playSong = new Audio(url)
    return playSong.play()
}

const stopSong = () => {
    playSong.pause()
}