import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let impts = 0;

let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            const quoted = m.quoted ? m.quoted.sender : null;
            who = quoted ? quoted : m.chat;
        }
    } else {
        who = m.chat;
    }
    
    if (!who) return m.reply('*🍬 Por favor, menciona al usuario o cita un mensaje.*');
    
    let txt = text.replace('@' + who.split`@`[0], '').trim();
    let dmt;

    if (txt.toLowerCase() === 'all') {
        dmt = global.db.data.users[who].coin;
    } else {
        if (!txt) return m.reply('*🍬 Por favor, ingresa la cantidad que deseas quitar.*');
        if (isNaN(txt)) return m.reply('🍭 *sólo números*');
        
        dmt = parseInt(txt);
    }
    
    let users = global.db.data.users;
    
    if (users[who].coin < dmt) {
        return m.reply(`🍭 El usuario no tiene suficientes coin para quitar. Tiene ${users[who].coin} coin.`);
    }

    users[who].coin -= dmt;
    
    m.reply(`💸 *Quitado:*
» ${dmt} \n@${who.split('@')[0]}, te han quitado ${dmt} 💸`, null, { mentions: [who] });
};

handler.help = ['quitarcoin *<@user>*', 'quitarcoin all'];
handler.tags = ['owner'];
handler.command = ['quitarcoin', 'removecoin', 'removecoins']; 
handler.mods = true;

export default handler;
