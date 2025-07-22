import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = '🌸⋆｡˚ ✩ 𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓 ✩˚｡⋆🌸'
  let txt1 = '🌙⋆｡˚ ✩ 𝑴𝒆𝒎𝒃𝒆𝒓 𝑶𝒖𝒕 ✩˚｡⋆🌙'
  let groupSize = participants.length

  if (m.messageStubType == 27) groupSize++
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `🌟 *Yay~!* 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂 *${groupMetadata.subject}* ⊹₊˚.༄\n` +
      `✨ @${m.messageStubParameters[0].split`@`[0]} llegó con estrellitas~\n\n` +
      `${global.welcom1}\n\n` +
      `📌 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 *${groupSize}* miembros adorables ꒰⑅ᵕ༚ᵕ꒱˖♡\n` +
      `💖 𝑫𝒊𝒗𝒊𝒆𝒓𝒕𝒆 𝒎𝒖𝒄𝒉𝒐 𝒚 𝒑𝒖𝒆𝒅𝒆𝒔 𝒖𝒔𝒂𝒓 *#help* 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔.`
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `🌧 *Sniff sniff...* 𝑨𝒍𝒈𝒖𝒊𝒆𝒏 𝒔𝒆 𝒗𝒂 𝒅𝒆 *${groupMetadata.subject}*… (｡•́︿•̀｡)\n` +
      `🍂 @${m.messageStubParameters[0].split`@`[0]} se ha ido volando~\n\n` +
      `${global.welcom2}\n\n` +
      `📌 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 *${groupSize}* miembros en el club~\n` +
      `🪽 𝑽𝒖𝒆𝒍𝒗𝒆 𝒑𝒓𝒐𝒏𝒕𝒐, 𝒕𝒆 𝒆𝒔𝒑𝒆𝒓𝒂𝒓𝒆𝒎𝒐𝒔 𝒄𝒐𝒏 𝒂𝒃𝒓𝒂𝒛𝒐𝒔 ✩⡱`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
}