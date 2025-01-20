import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

let handler = m => m;

handler.before = async function (m, { conn, usedPrefix }) {
    if (!db.data.chats[m.chat].autolevelup) return;

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');
    let userName = m.pushName || 'Anónimo';
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

    if (!chat.autolevelup) return;

    let level = user.level;
    let before = user.level;
    
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++;
    }

    if (before !== user.level) {
        let currentRole = Object.entries(global.roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level + 1 >= minLevel)[0];
        let nextRole = Object.entries(global.roles).sort((a, b) => a[1] - b[1]).find(([, minLevel]) => level + 2 < minLevel)[0];

        if (level >= 1) {
            user.role = currentRole;
            let text22 = `✨ ¡Felicidades *${userName}*, por tu nuevo rango!\n\n\`Nuevo Rango:\`\n${currentRole}`;
            if (nextRole) {
                text22 += `\n\n> Próximo rango ${nextRole}, en el *nivel ${global.roles[nextRole]}*. ¡Sigue así!`;
            }

            await conn.sendMessage(global.channelid, { text: text22, contextInfo: {
                externalAdReply: {
                    title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
                    body: '🥳 ¡Alguien obtuvo un nuevo Rango!',
                    thumbnailUrl: perfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }}, { quoted: null });
        }

        m.reply(`*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n🌟 Nivel Actual » *${user.level}*\n⚜️ Rango » ${user.role}\n📆 Fecha » *${moment.tz('America/Bogota').format('DD/MM/YY')}*\n\n> *\`¡Has alcanzado un Nuevo Nivel!\`*`);

        let especial = 'coin';
        let especial2 = 'exp';
        let especial3 = 'joincount';

        let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
        let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        let especialCant3 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;

        let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom();
        let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'].getRandom();
        let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom();

        let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom();
        let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom();
        let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom();

        if (level >= 1) {
            let chtxt = `👤 *Usuario:* ${userName}\n⭐ *Nivel anterior:* ${before}\n🌟 *Nivel actual:* ${level + 1}\n⚜️ *Rango:* ${user.role}${(level + 1) % 5 === 0 ? `\n\n💰 *Recompensa por alcanzar el nivel ${level + 1}:*
🎁 *Bono:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`
- *${especialCant * (Math.floor(((level + 1) - 5) / 10) + 1)} 💸 ${especial}*
- *${especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1)} ✨️ ${especial2}*
- *${especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1)} 👾 ${especial3}*

> 👀 Siguiente recompensa en el *nivel ${level + 6}*` : ''}`.trim();
            
            await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
                externalAdReply: {
                    title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
                    body: '🥳 ¡Un usuario obtiene un nuevo nivel!',
                    thumbnailUrl: perfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }}, { quoted: null });
        }

        let levelRewards = {
            5: 1, 10: 1, 15: 2, 20: 2, 25: 3,
            30: 3, 35: 4, 40: 4, 45: 5, 50: 5,
            55: 6, 60: 6, 65: 7, 70: 7, 75: 8,
            80: 8, 85: 9, 90: 9, 95: 10, 100: 10
        };

        if (levelRewards[user.level]) {
            let multiplier = levelRewards[user.level];
            conn.reply(m.chat, `*✎ RECOMPENSA POR SU NUEVO NIVEL ${user.level}!!* ✦
ᰔᩚ *${especialCant * multiplier} ${especial}*
ᰔᩚ *${especialCant2 * multiplier} ${especial2}*
ᰔᩚ *${especialCant3 * multiplier} ${especial3}*`, m);
            user[especial] += especialCant * multiplier;
            user[especial2] += especialCant2 * multiplier;
            user[especial3] += especialCant3 * multiplier;
        }
    }
};

export default handler;

global.roles = {
    '*Aventurero(a) - Novato(a) V*': 0,
    '*Aventurero(a) - Novato(a) IV*': 2,
    '*Aventurero(a) - Novato(a) III*': 4,
    '*Aventurero(a) - Novato(a) II*': 6,
    '*Aventurero(a) - Novato(a) I*': 8,
    '*Aprendiz del Camino V*': 10,
    '*Aprendiz del Camino IV*': 12,
    '*Aprendiz del Camino III*': 14,
    '*Aprendiz del Camino II*': 16,
    '*Aprendiz del Camino I*': 18,
    '*Explorador(a) del Valle V*': 20,
    '*Explorador(a) del Valle IV*': 22,
    '*Explorador(a) del Valle III*': 24,
    '*Explorador(a) del Valle II*': 26,
    '*Explorador(a) del Valle I*': 28,
    '*Guerrero(a) del Alba V*': 30,
    '*Guerrero(a) del Alba IV*': 32,
    '*Guerrero(a) del Alba III*': 34,
    '*Guerrero(a) del Alba II*': 36,
    '*Guerrero(a) del Alba I*': 38,
    '*Guardián(a) de los Bosques V*': 40,
    '*Guardián(a) de los Bosques IV*': 42,
    '*Guardián(a) de los Bosques III*': 44,
    '*Guardián(a) de los Bosques II*': 46,
    '*Guardián(a) de los Bosques I*': 48,
    '*Mago(a) del Crepúsculo V*': 50,
    '*Mago(a) del Crepúsculo IV*': 52,
    '*Mago(a) del Crepúsculo III*': 54,
    '*Mago(a) del Crepúsculo II*': 56,
    '*Mago(a) del Crepúsculo I*': 58,
    '*Héroe(a) de la Corona V*': 60,
    '*Héroe(a) de la Corona IV*': 62,
    '*Héroe(a) de la Corona III*': 64,
    '*Héroe(a) de la Corona II*': 66,
    '*Héroe(a) de la Corona I*': 68,
    '*Paladín(a) de Diamante V*': 70,
    '*Paladín(a) de Diamante IV*': 72,
    '*Paladín(a) de Diamante III*': 74,
    '*Paladín(a) de Diamante II*': 76,
    '*Paladín(a) de Diamante I*': 78,
    '*Maestro(a) de las Estrellas V*': 80,
    '*Maestro(a) de las Estrellas IV*': 85,
    '*Maestro(a) de las Estrellas III*': 90,
    '*Maestro(a) de las Estrellas II*': 95,
    '*Maestro(a) de las Estrellas I*': 99,
    '*Leyenda del Valle V*': 100,
    '*Leyenda del Valle IV*': 110,
    '*Leyenda del Valle III*': 120,
    '*Leyenda del Valle II*': 130,
    '*Leyenda del Valle I*': 140,
    '*Soberano(a) del Reino V*': 150,
    '*Soberano(a) del Reino IV*': 160,
    '*Soberano(a) del Reino III*': 170,
    '*Soberano(a) del Reino II*': 180,
    '*Soberano(a) del Reino I*': 199,
    '*Titán(a) del Norte V*': 200,
    '*Titán(a) del Norte IV*': 225,
    '*Titán(a) del Norte III*': 250,
    '*Titán(a) del Norte II*': 275,
    '*Titán(a) del Norte I*': 299,
    '*Guardían(a) de la Luz V*': 300,
    '*Guardían(a) de la Luz IV*': 325,
    '*Guardían(a) de la Luz III*': 350,
    '*Guardían(a) de la Luz II*': 375,
    '*Guardían(a) de la Luz I*': 399,
    '*Maestro(a) de la Magia V*': 400,
    '*Maestro(a) de la Magia IV*': 425,
    '*Maestro(a) de la Magia III*': 450,
    '*Maestro(a) de la Magia II*': 475,
    '*Maestro(a) de la Magia I*': 499,
    '*Señor(a) de la Guerra V*': 500,
    '*Señor(a) de la Guerra IV*': 525,
    '*Señor(a) de la Guerra III*': 550,
    '*Señor(a) de la Guerra II*': 575,
    '*Señor(a) de la Guerra I*': 599,
    '*Héroe(a) Inmortal V*': 600,
    '*Héroe(a) Inmortal IV*': 625,
    '*Héroe(a) Inmortal III*': 650,
    '*Héroe(a) Inmortal II*': 675,
    '*Héroe(a) Inmortal I*': 699,
    '*Maestro(a) de la Realidad V*': 700,
    '*Maestro(a) de la Realidad IV*': 725,
    '*Maestro(a) de la Realidad III*': 750,
    '*Maestro(a) de la Realidad II*': 775,
    '*Maestro(a) de la Realidad I*': 799,
    '*Sabio(a) Eterno(a) V*': 800,
    '*Sabio(a) Eterno(a) IV*': 825,
    '*Sabio(a) Eterno(a) III*': 850,
    '*Sabio(a) Eterno(a) II*': 875,
    '*Sabio(a) Eterno(a) I*': 899,
    '*Viajero(a) del Multiverso V*': 900,
    '*Viajero(a) del Multiverso IV*': 925,
    '*Viajero(a) del Multiverso III*': 950,
    '*Viajero(a) del Multiverso II*': 975,
    '*Viajero(a) del Multiverso I*': 999,
    '*Deidad de la Eternidad V*': 1000,
    '*Deidad de la Eternidad IV*': 2000,
    '*Deidad de la Eternidad III*': 3000,
    '*Deidad de la Eternidad II*': 4000,
    '*Deidad de la Eternidad I*': 5000,
    '*Apocalipsis*': 10000,
};
