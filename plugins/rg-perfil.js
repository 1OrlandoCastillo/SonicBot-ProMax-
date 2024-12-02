import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

var handler = async (m, { conn }) => {
    loadMarriages();

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { premium, level, yenes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];
    let username = conn.getName(who);

    let isMarried = who in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[who] : null;
    let partnerName = partner ? conn.getName(partner) : 'Nadie'; // Obtiene el nombre de la pareja

    let noprem = `
「 👤 *PERFIL DE USUARIO* 」
☁️ *Nombre:* ${username}
🌸 *Tag:* @${who.split('@')[0]}
🌀 *Registrado:* ${registered ? '✅' : '❌'}
👩‍❤️‍👩 *Casado con:* ${isMarried ? partnerName : 'Nadie'}

「 💰 *RECURSOS* 」
💴 *Yenes:* ${yenes}
🔰 *Nivel:* ${level}
✨ *Experiencia:* ${exp}
⚜️ *Rango:* ${role}
👑 *Premium:* ${premium ? '✅' : '❌'}
`.trim();

    let prem = `╭──⪩ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⪨
│⧼👤⧽ *ᴜsᴜᴀʀɪᴏ:* ${username}
│⧼💌⧽ *ʀᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅' : '❌'}
│⧼🔱⧽ *ʀᴏʟ:* Vip 👑
│👩‍❤️‍👩 *Casado con:* ${isMarried ? partnerName : 'Nadie'}
╰─────────────────⪨

╭────⪩ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ⪨
│⧼💴⧽ *ʏᴇɴᴇs:* ${yenes}
│⧼🔰⧽ *ɴɪᴠᴇʟ:* ${level}
│⧼✨⧽ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp}
│⧼⚜️⧽ *ʀᴀɴɢᴏ:* ${role}
╰───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
