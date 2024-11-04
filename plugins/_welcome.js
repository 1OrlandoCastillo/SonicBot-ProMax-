export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return !0;

    let userId = m.messageStubParameters[0];
    console.log('ID del usuario:', userId);

    let pp;
    const welcomeImage = 'https://qu.ax/xzbBy.jpg'; // Imagen de bienvenida
    const goodbyeImage = 'https://qu.ax/iSUCQ.jpg'; // Imagen de despedida

    try {
        pp = await conn.profilePictureUrl(userId, 'image');
        console.log('URL de perfil:', pp);
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        pp = null; // Si no se puede obtener, deja pp como null
    }

    // Determina qué imagen usar según el tipo de mensaje
    let img;
    if (pp) {
        img = await (await fetch(pp)).buffer();
    } else {
        img = await (await fetch(welcomeImage)).buffer(); // Imagen de respaldo para bienvenida
    }

    let chat = global.db.data.chats[m.chat];

    if (chat.welcome && m.messageStubType == 27) {
        let wel = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │🌹  𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀\n   │🌹  ${groupMetadata.subject}\n   └───────────────┈ ⳹`;
        await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
    }

    if (chat.welcome && m.messageStubType == 28) {
        let bye = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        let img2 = await (await fetch(goodbyeImage)).buffer(); // Imagen de respaldo para despedida
        await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
    }

    if (chat.welcome && m.messageStubType == 32) {
        let kick = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${userId.split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`;
        let img3 = await (await fetch(goodbyeImage)).buffer(); // Imagen de respaldo para despedida
        await conn.sendMini(m.chat, packname, dev, kick, img3, img3, channel, fkontak);
    }
}

/*let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/wo866r.m4a';
  let vn2 = 'https://files.catbox.moe/hmuevx.opus';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307382381547@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(ಥ ͜ʖಥ) 𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 (◕︿◕✿)`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363322713003916@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(oꆤ︵ꆤo) 𝘼 𝘿 𝙄 𝙊 𝙎 (|||❛︵❛.)`, 
    "body": `${userName}, Soy gay asi que me voy.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}*/
