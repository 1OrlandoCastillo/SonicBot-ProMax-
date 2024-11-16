import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, cookies, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://files.catbox.moe/0iw0dc.mp4', 'https://files.catbox.moe/yxpqgu.mp4', 'https://files.catbox.moe/1dtvv7.mp4']

let menu = `╰•:･✿:･✧𝑀𝑒𝓃ú 𝒹𝑒 𝒴𝓊𝓀𝒾✧･:✿･:•╯

🌸 ¡𝓗𝓸𝓵𝓪! 𝓒ó𝓶𝓸 𝓔𝓼𝓽á𝓼 𝓮𝓵 𝓓í𝓪 𝓭𝓮 𝓗𝓸𝔂 *${taguser}* 𝓢𝓸𝔂 *𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾*, ${saludo}. 

┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖑𝖆 𝕭𝖔𝖙ᚐ҉ᚐ 」⪨
┃❥ ⧼👑⧽ *𝕮𝖗𝖊𝖆𝖉𝖔𝖗:* ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
┃❥ ⧼🔱⧽ *𝕸𝖔𝖉𝖔:* 𝕻ú𝖇𝖑𝖎𝖈𝖔
┃❥ ⧼🌠⧽ *𝕭𝖆𝖎𝖑𝖊𝖞𝖘:* 𝕸𝖚𝖑𝖙𝖎 𝕯𝖊𝖛𝖎𝖈𝖊
┃❥ ⧼🤖⧽ *𝕭𝖔𝖙:* ${(conn.user.jid == global.conn.user.jid ? '𝕺𝖋𝖎𝖈𝖎𝖆𝖑' : '𝕾𝖚𝖇-𝕭𝖔𝖙')}
┃❥ ⧼⏱️⧽ *𝕬𝖈𝖙𝖎𝖛𝖆𝖉𝖔:* ${uptime}
┃❥ ⧼👥⧽ *𝖀𝖘𝖚𝖆𝖗𝖎𝖔𝖘:* ${totalreg}
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎┗━━━━━━━━━━━━━━━━━⪩‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔 𝖉𝖊 𝖀𝖘𝖚𝖆𝖗𝖎𝖔 」⪨
┃❥ ⧼👤⧽ *𝕮𝖑𝖎𝖊𝖓𝖙𝖊:* ${nombre}
┃❥ ⧼🌐⧽ *𝕻𝖆í𝖘:* ${global.userNationality}
┃❥ ⧼✨⧽ *𝕰𝖃𝕻:* ${exp}
┃❥ ⧼🍪⧽ *𝕮𝖔𝖔𝖐𝖎𝖊𝖘:* ${cookies}
┃❥ ⧼⚜️⧽ *𝕹𝖎𝖛𝖊𝖑:* ${level}
┃❥ ⧼🛡⧽ *𝕽𝖆𝖓𝖌𝖔:* ${role}
┗━━━━━━━━━━━━━━━━━⪩
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
	*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】* 

┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔-𝕭𝖔𝖙ᚐ҉ᚐ 」⪨
┃❀ .botreglas
┃❀ .menu
┃❀ .menujuegos
┃❀ .menuanime
┃❀ .menuhorny 
┃❀ .menuaudios 
┃❀ .runtime
┃❀ .script
┃❀ .staff
┃❀ .blocklist
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕴𝖓𝖋𝖔𝖗𝖒𝖆𝖈𝖎ó𝖓ᚐ҉ᚐ 」⪨
┃✿ .creador
┃✿ .owner
┃✿ .dash
┃✿ .dashboard
┃✿ .views
┃✿ .database
┃✿ .usuarios
┃✿ .user
┃✿ .ds
┃✿ .fixmsgespera
┃✿ .status
┃✿ .sug *<mensaje>*
┃✿ .horario
┃✿ .skyplus
┃✿ .infobot
┃✿ .ping
┃✿ .reportar
┃✿ .sistema
┃✿ .speed
┃✿ .speedtest
┃✿ .reportar
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕽𝖊𝖌𝖎𝖘𝖙𝖗𝖔ᚐ҉ᚐ 」⪨
┃❋ .profile
┃❋ .unreg
┃❋ .reg
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕺𝖋𝖋/𝕺𝖓ᚐ҉ᚐ 」⪨
┃⚘ .enable <option>
┃⚘ .disable <option>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕯𝖎𝖛𝖊𝖗𝖘𝖎ó𝖓ᚐ҉ᚐ 」⪨
┃☬ .amistad
┃☬ .gay <@tag> | <nombre>
┃☬ .lesbiana <@tag> | <nombre>
┃☬ .pajero <@tag> | <nombre>
┃☬ .pajera <@tag> | <nombre>
┃☬ .puto <@tag> | <nombre>
┃☬ .puta <@tag> | <nombre>
┃☬ .manco <@tag> | <nombre>
┃☬ .manca <@tag> | <nombre>
┃☬ .rata <@tag> | <nombre>
┃☬ .prostituta <@tag> | <nombre>
┃☬ .prostituto <@tag> | <nombre>
┃☬ .casarse @tag
┃☬ .consejo
┃☬ .divorciarse @tag
┃☬ .doxear
┃☬ .doxxing <nombre> | <@tag>
┃☬ .formarpareja
┃☬ .formarpareja5
┃☬ .horny
┃☬ .hornycard
┃☬ .huevo @user
┃☬ .iqtest
┃☬ .marica
┃☬ .meme
┃☬ .minovia @user
┃☬ .morse *<encode|decode>*
┃☬ .nombreninja *<texto>*
┃☬ .pajeame
┃☬ .personalidad
┃☬ .piropo
┃☬ .pokedex *<pokemon>*
┃☬ .pregunta
┃☬ .ship
┃☬ .love
┃☬ .simpcard
┃☬ .sorteo
┃☬ .itssostupid
┃☬ .estupido
┃☬ .stupid
┃☬ .top *<texto>*
┃☬ .formartrio @usuario1 @usuario2
┃☬ .waste @user
┃☬ .zodiac *2002 02 25*
┃☬ .apostar
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕵𝖚𝖊𝖌𝖔𝖘ᚐ҉ᚐ 」⪨
┃✧ .acertijo
┃✧ .paises
┃✧ .peliculas
┃✧ .ahorcado
┃✧ .math <mode>
┃✧ .mayorque
┃✧ .ppt
┃✧ .reto
┃✧ .sopa
┃✧ .buscarpalabras
┃✧ .verdad
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕰𝖒𝖔𝖏𝖎-𝕬𝖓𝖎𝖒𝖊ᚐ҉ᚐ 」⪨
┃✥ .angry/enojado @tag
┃✥ .bath/bañarse @tag
┃✥ .bite/morder @tag
┃✥ .bleh/lengua @tag
┃✥ .blush/sonrojarse @tag
┃✥ .bored/aburrido @tag
┃✥ .coffe/cafe @tag
┃✥ .cry/llorar @tag
┃✥ .cuddle/acurrucarse @tag
┃✥ .dance/bailar @tag
┃✥ .drunk/borracho @tag
┃✥ .eat/comer @tag
┃✥ .facepalm/palmada @tag
┃✥ .grop/manosear @tag
┃✥ .happy/feliz @tag
┃✥ .hello/hola @tag
┃✥ .hug/abrazar @tag
┃✥ .kill/matar @tag
┃✥ .kiss/besar @tag
┃✥ .kiss2/besar2 @tag
┃✥ .laugh/reirse @tag
┃✥ .lick/lamer @tag
┃✥ .love2/enamorada @tag
┃✥ .patt/acariciar @tag
┃✥ .poke/picar @tag
┃✥ .pout/pucheros @tag
┃✥ .preg/embarazar @tag
┃✥ .punch/golpear @tag
┃✥ .run/correr @tag
┃✥ .sad/triste @tag
┃✥ .scared/asustada @tag
┃✥ .seduce/seducir @tag
┃✥ .shy/timida @tag
┃✥ .slap/bofetada @tag
┃✥ .sleep/dormir @tag
┃✥ .smoke/fumar @tag
┃✥ .think/pensando @tag
┃✥ .undress/encuerar @tag
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕹𝕾𝕱𝖂ᚐ҉ᚐ 」⪨
┃✤ .sixnine/69 @tag
┃✤ .anal/culiar @tag
┃✤ .blowjob/mamada @tag
┃✤ .boobjob/rusa @tag
┃✤ .cum/leche @tag
┃✤ .fap/paja @tag
┃✤ .follar @tag
┃✤ .footjob/pies @tag
┃✤ .fuck/coger @tag
┃✤ .fuck2/coger2 @tag
┃✤ .grabboobs/agarrartetas @tag
┃✤ .penetrar @user
┃✤ .lickpussy/coño @tag
┃✤ .sexo/sex @tag
┃✤ .spank/nalgada @tag
┃✤ .suckboobs/chupartetas @tag
┃✤ .violar/perra @tag
┃✤ .lesbianas/tijeras @tag
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕽𝖔𝖑𝖑𝖜𝖆𝖎𝖋𝖚𝖘ᚐ҉ᚐ 」⪨
┃✦ .character
┃✦ .darrw
┃✦ .obtenidos
┃✦ .c
┃✦ .robarpersonaje
┃✦ .rw
┃✦ .toprw
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕰𝖈𝖔𝖓𝖔𝖒í𝖆ᚐ҉ᚐ 」⪨
┃✱ .bal
┃✱ .bank
┃✱ .cookies
┃✱ .apostar *<cantidad>*
┃✱ .cf
┃✱ .crimen
┃✱ .depositar
┃✱ .minar
┃✱ .retirar
┃✱ .rob2
┃✱ .rob
┃✱ .ruleta *<cantidad> <color>*
┃✱ .Buy
┃✱ .Buyall
┃✱ .slot <apuesta>
┃✱ .slut
┃✱ .trabajar
┃✱ .transfer [tipo] [cantidad] [@tag]
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝×𝕽×𝕻×𝕲×ᚐ҉ᚐ 」⪨
┃♤ .adventure
┃♤ .annual
┃♤ .yearly
┃♤ .caza
┃♤ .cofre
┃♤ .daily
┃♤ .claim
┃♤ .halloween
┃♤ .heal
┃♤ .lb
┃♤ .levelup
┃♤ .inventario 
┃♤ .mazmorra
┃♤ .monthly
┃♤ .navidad
┃♤ .christmas
┃♤ .addprem [@user] <days>
┃♤ .weekly
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕾𝖊𝖗𝖇𝖔𝖙/𝕮𝖔𝖉𝖊ᚐ҉ᚐ 」⪨
┃✾ .code
┃✾ .serbot
┃✾ .serbot --code 
┃✾ .rentbot
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕭𝖚𝖘𝖈𝖆𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ 」⪨
┃❖ .animesearch
┃❖ .applemusicdetail
┃❖ .applemusicsearch
┃❖ .githubsearch
┃❖ .gnula
┃❖ .googlesearch *<texto>*
┃❖ .npmjs
┃❖ .twitterstalk <username>
┃❖ .tiktoksearch <txt>
┃❖ .tweetposts *<búsqueda>*
┃❖ .wikis
┃❖ .xnxxsearch <query>
┃❖ .ytsearch
┃❖ .imagen <query>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕯𝖊𝖘𝖈𝖆𝖗𝖌𝖆𝖘ᚐ҉ᚐ 」⪨
┃Ѽ .animedl
┃Ѽ .apk2
┃Ѽ .apkmod
┃Ѽ .applemusic
┃Ѽ .bilibili
┃Ѽ .deezer
┃Ѽ .facebook
┃Ѽ .fb
┃Ѽ .gdrive
┃Ѽ .gitclone *<url git>*
┃Ѽ .instagram2
┃Ѽ .ig2
┃Ѽ .imagen <query>
┃Ѽ .mangad <nombre del manga> <número del capítulo>
┃Ѽ .mediafire
┃Ѽ .mega
┃Ѽ .aptoide
┃Ѽ .pinterest
┃Ѽ .pinvid
┃Ѽ .play
┃Ѽ .musica
┃Ѽ .play1
┃Ѽ .playvid
┃Ѽ .video
┃Ѽ .play2
┃Ѽ .play3
┃Ѽ .play4
┃Ѽ .applemusicplay
┃Ѽ .tiktokrandom
┃Ѽ .snackvideo *<link>*
┃Ѽ .soundclouddl *<link>*
┃Ѽ .spotify
┃Ѽ .threads *<link>*
┃Ѽ .tiktokimg <url>
┃Ѽ .tiktokmp3 *<link>*
┃Ѽ .tiktok
┃Ѽ .tiktok2 *<link>*
┃Ѽ .wallpaper <query>
┃Ѽ .tw
┃Ѽ .zedgedl *<link>*
┃Ѽ .ss2
┃Ѽ .ssvid
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝×𝕬×𝕴×ᚐ҉ᚐ 」⪨
┃☫ .blackbox <pregunta>
┃☫ .demo
┃☫ .gemini
┃☫ .yuki
┃☫ .bot
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕲𝖗𝖚𝖕𝖔𝖘ᚐ҉ᚐ 」⪨
┃♕ .add
┃♕ admins <texto>
┃♕ .bienvenidos/nuevos
┃♕ .nights/noches
┃♕ .dias/days
┃♕ .grupotime *<open/close>* *<número>*
┃♕ .grupo abrir / cerrar
┃♕ .delete
┃♕ .demote
┃♕ .encuesta <text|text2>
┃♕ .hidetag
┃♕ .infogrupo
┃♕ .invite *<numero>*
┃♕ .kick
┃♕ .listonline
┃♕ .link
┃♕ .listadv
┃♕ .promote
┃♕ .rentar
┃♕ .rentar2 *<link>*
┃♕ .revoke
┃♕ .setbye <text>
┃♕ .Setdesc <text>
┃♕ .setname <text>
┃♕ .setppgrup
┃♕ .setwelcome <text>
┃♕ .tagall *<mesaje>*
┃♕ .invocar *<mesaje>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕳𝖊𝖗𝖗𝖆𝖒𝖎𝖊𝖓𝖙𝖆𝖘 」⪨
┃✰ .blur
┃✰ .difuminar2
┃✰ .cal *<ecuacion>*
┃✰ .channelstalk
┃✰ .clima *<lugar>*
┃✰ .fake
┃✰ .getbio
┃✰ .getbio *@tag*
┃✰ .getname *@tag*
┃✰ .remini
┃✰ .hd
┃✰ .enhance
┃✰ .nuevafotochannel
┃✰ .nosilenciarcanal
┃✰ .silenciarcanal
┃✰ .noseguircanal
┃✰ .seguircanal
┃✰ .avisoschannel
┃✰ .resiviravisos
┃✰ .inspect
┃✰ .inspeccionar
┃✰ .eliminarfotochannel
┃✰ .reactioneschannel
┃✰ .reaccioneschannel
┃✰ .nuevonombrecanal
┃✰ .nuevadescchannel
┃✰ .IPdoxx
┃✰ .photo <query>
┃✰ .pixel
┃✰ .difuminar
┃✰ .readmore *<teks>|<teks>*
┃✰ .ver
┃✰ .reenviar
┃✰ .spamwa <number>|<mesage>|<no of messages>
┃✰ .ssweb
┃✰ .ss
┃✰ .tamaño *<cantidad>*
┃✰ .document *<audio/video>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕮𝖔𝖓𝖛𝖊𝖗𝖙𝖎𝖉𝖔𝖗𝖊𝖘ᚐ҉ᚐ 」⪨
┃ꕥ .ibb
┃ꕥ .paste nombre txt
┃ꕥ .to <reply image>
┃ꕥ .toanime
┃ꕥ .togifaud
┃ꕥ .tourl
┃ꕥ .tovideo
┃ꕥ .tts <lang> <teks>
┃ꕥ .tourl2
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕾𝖙𝖎𝖈𝖐𝖊𝖗𝖘ᚐ҉ᚐ 」⪨
┃☠︎︎ .emojimix *<emoji+emoji>*
┃☠︎︎ .qc
┃☠︎︎ .brat *<mensaje>*
┃☠︎︎ .stiker <img>
┃☠︎︎ .sticker <url>
┃☠︎︎ .toimg (reply)
┃☠︎︎ .take *<nombre>|<autor>*
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕬𝖓𝖎𝖒𝖊ᚐ҉ᚐ 」⪨
┃🝮 .animelink
┃🝮 .akira
┃🝮 .akiyama
┃🝮 .anna
┃🝮 .asuna
┃🝮 .ayuzawa
┃🝮 .boruto
┃🝮 .chiho
┃🝮 .chitoge
┃🝮 .deidara
┃🝮 .erza
┃🝮 .elaina
┃🝮 .eba
┃🝮 .emilia
┃🝮 .hestia
┃🝮 .hinata
┃🝮 .inori
┃🝮 .isuzu
┃🝮 .itachi
┃🝮 .itori
┃🝮 .kaga
┃🝮 .kagura
┃🝮 .kaori
┃🝮 .keneki
┃🝮 .kotori
┃🝮 .kurumi
┃🝮 .madara
┃🝮 .mikasa
┃🝮 .miku
┃🝮 .minato
┃🝮 .naruto
┃🝮 .nezuko
┃🝮 .sagiri
┃🝮 .sasuke
┃🝮 .sakura
┃🝮 .cosplay
┃🝮 .infoanime
┃🝮 .messi
┃🝮 .cr7
┃🝮 .waifu
┃🝮 .lolicon
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕱𝖚𝖑𝖑-𝕳𝖔𝖗𝖓𝖞ᚐ҉ᚐ 」⪨
┃❦ .nsfwloli
┃❦ .nsfwfoot
┃❦ .nsfwass
┃❦ .nsfwbdsm
┃❦ .nsfwcum
┃❦ .nsfwero
┃❦ .nsfwfemdom
┃❦ .nsfwfoot
┃❦ .nsfwglass
┃❦ .nsfworgy
┃❦ .yuri
┃❦ .yuri2
┃❦ .yaoi
┃❦ .yaoi2
┃❦ .panties
┃❦ .tetas
┃❦ .booty
┃❦ .ecchi
┃❦ .furro
┃❦ .hentai
┃❦ .trapito
┃❦ .imagenlesbians
┃❦ .pene
┃❦ .porno
┃❦ .randomxxx
┃❦ .pechos
┃❦ .r34 <texto>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕾𝖙𝖆𝖋𝖋ᚐ҉ᚐ 」⪨
┃߷ .autoadmin
┃߷ .banchat
┃߷ .banuser <@tag> <razón>
┃߷ .grupocrear <nombre>
┃߷ .join <link>
┃߷ .unbanchat
┃߷ .unbanuser <@tag>
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「 ♡⃝𝕮𝖗𝖊𝖆𝖉𝖔𝖗ᚐ҉ᚐ 」⪨
┃🜲 .listafk
┃🜲 .enable <option>
┃🜲 .disable <option>
┃🜲 .expired *<días>*
┃🜲 .addcookies *<@user>*
┃🜲 .addprem [@user] <days>
┃🜲 .copia
┃🜲 .broadcast
┃🜲 .bc
┃🜲 .broadcastgroup
┃🜲 .bcgc
┃🜲 .bcgc2
┃🜲 .chetar
┃🜲 .cleanfiles *
┃🜲 .cleartmp
┃🜲 .setcmd *<texto>*
┃🜲 .deletefile
┃🜲 .delexpired
┃🜲 .delvn <text>
┃🜲 .delmsg <text>
┃🜲 .delimg <text>
┃🜲 .delsticker <text>
┃🜲 .delprem <@user>
┃🜲 .removeowner @user
┃🜲 .removerowner
┃🜲 .dsowner
┃🜲 $
┃🜲 .fetch
┃🜲 .get
┃🜲 .getplugin *<nombre>*
┃🜲 .groups
┃🜲 .grouplist
┃🜲 .okickall @user
┃🜲 .o- @user
┃🜲 .nuevabiobot <teks>
┃🜲 .nuevafotobot *<imagen>*
┃🜲 .nuevonombrebot <teks>
┃🜲 .prefix [prefix]
┃🜲 .resetpersonajes
┃🜲 .resetprefix
┃🜲 .restart
┃🜲 .saveplugin nombre
┃🜲 .update
┃🜲 .actualizar
┃🜲 >
┃🜲 =>
┗━━━━━━━━━━━━━━━━━⪨
> © 𝒫𝑜𝓌𝑒𝓇𝑒𝒹 𝐵𝓎 ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363322713003916@newsletter', newsletterName: '© 𝒫𝑜𝓌𝑒𝓇𝑒𝒹 𝐵𝓎 ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜', serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto', 'm'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
