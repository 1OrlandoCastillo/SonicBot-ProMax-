import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome)
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios)
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()

  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let wel = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 😁 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🌹  𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀\n   │🌹  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
   let bye = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `┌─★ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ✨ \n│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │😒  𝐒𝐄 𝐅𝐔𝐄\n   │🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n   └───────────────┈ ⳹`
await conn.sendMini(m.chat, packname, dev, kick, img2, img2, channel, fkontak)
}}

/*import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://qu.ax/bsNq.mp3';
  let vn2 = 'https://qu.ax/EuNQ.mp3';
  let welc = welcome;
  let adi = adios;
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, {
      audio: { url: vn },
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
          "thumbnail": welc,
          "title": "  ͟͞ 𝐁 𝐈 𝐄 𝐍 𝐕 𝐄 𝐍 𝐈 𝐃 𝐎 ͟͞  ",
          "body": `${userName}!`,
          "previewType": "PHOTO",
          "thumbnailUrl": null,
          "showAdAttribution": true,
          sourceUrl: [yt, md, channel].sort(() => 0.5 - Math.random())[0]
        }
      },
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'welcome.mp3'
    }, { quoted: fkontak });
  }

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, {
      audio: { url: vn2 },
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
        "thumbnail": adi,
        "title": '  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  ',
        "body": `${userName}, se despide.`,
        "previewType": "PHOTO",
          "showAdAttribution": true,
          "containsAutoReply": true,
         "thumbnailUrl": null,
          "showAdAttribution": true,
          "sourceUrl": redes
        }
      },
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'bye.mp3'
    }, { quoted: fkontak });
  }
}*/
