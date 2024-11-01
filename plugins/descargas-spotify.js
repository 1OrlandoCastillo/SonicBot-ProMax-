
import axios from 'axios';
import fetch from 'node-fetch';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import search from 'yt-search';

async function spotifyxv(query) {
    let token = await tokens();
    let response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const tracks = response.data.tracks.items;
    const results = tracks.map((track) => ({
        name: track.name,
        artista: track.artists.map((artist) => artist.name),
        album: track.album.name,
        duracion: timestamp(track.duration_ms),
        url: track.external_urls.spotify,
        imagen: track.album.images.length ? track.album.images[0].url : '',
    }));
    return results;
}

async function tokens() {
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64'),
        },
        data: 'grant_type=client_credentials',
    });
    return response.data.access_token;
}

function timestamp(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

async function getBuffer(url, options) {
    try {
        options = options || {};
        const res = await axios({
            method: 'get',
            url,
            headers: {
                DNT: 1,
                'Upgrade-Insecure-Request': 1,
            },
            ...options,
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
        return response.data;
    } catch (error) {
        return text;
    }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `╰⊱❗️⊱ *ACCIÓN MAL USADA* ⊱❗️⊱╮\n\n✨ *DEBE DE USAR EL COMANDO COMO EN ESTE EJEMPLO:*\n${usedPrefix + command} *tu foto*`;
    
    try {
        conn.reply(m.chat, '🚀 *Enviando su música de Spotify*', m);
        m.react('⏳'); // Indicador de espera

        let songInfo = await spotifyxv(text);
        if (!songInfo.length) throw `*No se encontró la canción*`;

        let res = songInfo[0];
        let shortURL = await getTinyURL(res.url);
        const info = `✨ *TITULO:*\n_${res.name}_\n\n👤 *ARTISTA:*\n» ${res.artista.join(', ')}\n\n🔗 *LINK:*\n» ${shortURL}\n\n✨️ *Enviando Canción....*\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣ⷭ𓆪͟͞ `;

        let resImg = await fetch(res.imagen);
        let thumbb = await resImg.buffer();

        let { videos } = await search(res.name);
        let q = '128kbps';
        let v = videos[0].url;
        let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
        let dl_url = await yt.audio[q].download();

        // Enviar el audio
        conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${res.name}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

        // Enviar la información con la imagen como un enlace
        await conn.sendMessage(m.chat, {
            text: info,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    thumbnail: thumbb,
                    mediaUrl: shortURL,
                    sourceUrl: shortURL,
                }
            }
        }, { quoted: m });

        m.react('✅'); // Indicador de éxito
    } catch (error) {
        console.error(error);
        m.reply(`Error: ${error.message}`);
    }
};

handler.tags = ['descargas'];
handler.help = ['spotify'];
handler.group = true;
handler.register = true;
handler.command = ['spotify', 'music'];

export default handler;
