import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

var handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { premium, level, genre, married, yenes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];

    if (!('married' in global.db.data.users[m.sender])) {
        global.db.data.users[m.sender].married = false;
    }

    let username = conn.getName(who);
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';
    
    let partnerName = married ? conn.getName(global.db.data.users[marriages[m.sender]]) : 'Nadie';

    let noprem = `
「 👤 *PERFIL DE USUARIO* 」
☁️ *Nombre:* ${username}
💠 *Edad:* *${registered ? `${age} años` : '×'}*
⚧️ *Genero:* *${genre === 0 ? 'No especificado' : genre}*
🌐 *Pais:* *${userNationality}*
🌀 *Registrado:* ${registered ? '✅': '❌'}
👩‍❤️‍👩 *Casado/a:* ${married ? partnerName : 'Nadie'}

「 💰 *RECURSOS* 」
💴 *Yenes:* ${yenes}
🔰 *Nivel:* ${level}
✨ *Experiencia:* ${exp}
⚜️ *Rango:* ${role}
👑 *Premium:* ${premium ? '✅': '❌'}
`.trim();

    let prem = `╭──⪩ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⪨
│⧼👤⧽ *ᴜsᴜᴀʀɪᴏ:* ${username}
│⧼💠⧽ *ᴇᴅᴀᴅ:* *${registered ? `${age} años` : '×'}*
│⧼⚧️⧽ *ɢᴇɴᴇʀᴏ:* *${genre === 0 ? 'No especificado' : genre}*
│⧼🌐⧽ *ᴘᴀɪs:* *${userNationality}*
│⧼💌⧽ *ʀᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *ʀᴏʟ: ᴠɪᴘ* 👑
│⧼👩‍❤️‍👩⧽ *ᴄᴀsᴀᴅᴏ:* ${married ? partnerName : 'Nadie'}
╰─────────────────⪨

╭────⪩ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ⪨
│⧼💴⧽ *ʏᴇɴᴇs:* ${yenes}
│⧼🔰⧽ *ɴɪᴠᴇʟ:* ${level}
│⧼✨⧽ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp}
│⧼⚜️⧽ *ʀᴀɴɢᴏ:* ${role}
╰───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
