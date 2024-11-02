import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa un término de búsqueda para Pinterest\n*🌹 Ejemplo:* ${usedPrefix}${command} plantas`);

    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let ouh;
    try {
        ouh = await fetch(`http://localhost:3000/api/pinterest/search?query=${encodeURIComponent(text)}`);
        if (!ouh.ok) throw new Error('Error en la respuesta de la API');
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        throw m.reply('Hubo un error al intentar obtener los resultados. Por favor, intenta de nuevo más tarde.');
    }

    let gyh;
    try {
        gyh = await ouh.json();
        console.log('Respuesta de la API:', gyh); // Imprimir la respuesta para depuración
    } catch (error) {
        console.error('Error al parsear JSON:', error);
        throw m.reply('La respuesta no es un JSON válido.');
    }

    if (!gyh || gyh.length === 0) {
        console.error('No se encontraron resultados en la respuesta:', gyh);
        throw m.reply('No se pudo encontrar nada relacionado con tu búsqueda. Por favor, verifica el término y prueba de nuevo.');
    }

    // Crear un mensaje con los enlaces encontrados
    let message = '*✧ Resultados de la búsqueda en Pinterest:*\n\n';
    gyh.forEach((result, index) => {
        message += `🔗 ${index + 1}. ${result.url}\n`;
    });
    message += `\n> ♡⃝𝒴𝓊𝑘𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ`;

    try {
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (sendError) {
        console.error('Error al enviar el mensaje:', sendError);
        throw m.reply('Hubo un problema al enviar los resultados. Por favor, intenta de nuevo más tarde.');
    }
}

handler.help = ['pinsearch'];
handler.tags = ['descargas'];
handler.command = /^(pinsearch|pintsearch)$/i;
handler.premium = false;
handler.register = true;

export default handler;
