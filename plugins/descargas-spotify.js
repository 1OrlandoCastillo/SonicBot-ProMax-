import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa una consulta\n*🌹 Ejemplo:* ${usedPrefix}${command} Joji Ew`);

    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let ouh = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`);
    let gyh = await ouh.json();

    if (!gyh.result) throw m.reply(`*No se encontró la canción*`);

    // Usar un acortador para el enlace de Spotify
    let shortURL = await getTinyURL(gyh.result.urlSpotify);

    const info = `🌹 *TITULO:*\n_${gyh.result.title} - Versión original_\n\n👤 *ARTISTA:*\n» ${gyh.result.artists}\n\n🔗 *LINK:*\n» ${shortURL}\n\n🥀 *Enviando Canción....*\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓣ⷭ𓆪͟͞ `;

    // Obtener la imagen en formato buffer de la URL original
    const thumbnailBuffer = await (await fetch(gyh.result.thumbnail)).buffer();

    // Enviar la imagen como foto de perfil
    await conn.sendMessage(m.chat, { 
        image: { url: gyh.result.thumbnail }, 
        caption: info 
    }, { quoted: m });

    const doc = {
        audio: { url: gyh.result.url },
        mimetype: 'audio/mp4',
        fileName: `${gyh.result.title}.mp3`,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: gyh.result.urlSpotify,
                title: gyh.result.title,
                sourceUrl: gyh.result.urlSpotify,
                thumbnail: thumbnailBuffer
            }
        }
    };

    // Enviar el archivo de audio
    await conn.sendMessage(m.chat, doc, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
        return response.data;
    } catch (error) {
        return text;
    }
}

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = /^(spotify|sp)$/i;
handler.premium = false;
handler.register = true;

export default handler;
