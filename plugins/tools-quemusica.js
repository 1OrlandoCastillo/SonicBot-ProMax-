import fs from 'fs';
import acrcloud from 'acrcloud';
import yts from 'yt-search';
import axios from 'axios';

let acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: 'c33c767d683f78bd17d4bd4991955d81',
    access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (/audio|video/.test(mime)) {
        let media = await q.download();
        let ext = mime.split('/')[1];
        fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
        
        let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));
        let { code, msg } = res.status;
        
        if (code !== 0) throw msg;
        
        let { title, artists, album, genres, release_date } = res.metadata.music[0];
        let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼𝘚 

• 🌹 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 🍃 𝘼𝙍𝙏𝙄𝙎𝙏𝘼: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
• 💻 𝘼𝙇𝘽𝙐𝙈: ${album?.name || 'No encontrado'}
• 🍂 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
• 🍒 𝙁𝙀𝘾𝙃𝘼 𝘿𝙀 𝙇𝘼𝙉𝙕𝘼𝙈𝙄𝙀𝙉𝙏𝙊: ${release_date || 'No encontrado'}
`.trim();

        fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
        m.reply(txt);
        
        // Buscar la canción en YouTube
        const yt_play = await yts(title);
        if (yt_play.all.length > 0) {
            const videoInfo = yt_play.all[0];
            const audioUrl = videoInfo.url; // URL del video en YouTube
            
            // Descarga el audio desde YouTube
            const downloadUrl = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(audioUrl)}`;
            try {
                const response = await axios.get(downloadUrl);
                if (response.data.status) {
                    const audioDownloadUrl = response.data.result.urlAudio;
                    m.reply(`🔊 Aquí está el audio descargado: ${audioDownloadUrl}`); // Envía el enlace de descarga
                } else {
                    m.reply("🔍 No se pudo obtener la URL de descarga.");
                }
            } catch (error) {
                m.reply(`Ocurrió un error al intentar descargar el audio - ${error.message}`);
            }
        } else {
            m.reply("🔍 No se encontró el video en YouTube.");
        }
    } else {
        throw '💭 Responda A Un Audio O Video';
    }
}

handler.command = ['quemusica', 'quemusicaes'];
export default handler;
