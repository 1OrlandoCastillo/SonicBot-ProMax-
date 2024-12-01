const items = ['yenes'];
const confirmation = {};
const DEBT_INCREMENT = 10;
const DEBT_INTERVAL = 5 * 60 * 60 * 1000;
const MIN_AMOUNT = 10;

async function handler(m, { conn, args, usedPrefix, command }) {
  const user = global.db.data.users[m.sender];

  if (command === 'prestamo') {
    const loanedUser = args[2] ? args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net' : '';
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(MIN_AMOUNT, (isNumber(args[1]) ? parseInt(args[1]) : MIN_AMOUNT))) * 1;

    if (!loanedUser) {
      return conn.sendMessage(m.chat, { text: '*👤 Menciona al usuario que desea recibir yenes.*', mentions: [m.sender] }, { quoted: m });
    }

    if (!(loanedUser in global.db.data.users)) {
      return conn.sendMessage(m.chat, { text: `*👤 El usuario ${loanedUser} no está en la base de datos.*`, mentions: [m.sender] }, { quoted: m });
    }

    if (user.yenes < count) {
      return conn.sendMessage(m.chat, { text: `*💰 No tienes suficientes yenes para prestar.*`, mentions: [m.sender] }, { quoted: m });
    }

    if (confirmation[loanedUser]) {
      return conn.sendMessage(m.chat, { text: '*💰 Ya hay una solicitud de préstamo pendiente para este usuario.*', mentions: [m.sender] }, { quoted: m });
    }

    const confirmMessage = `*@${(m.sender.split('@')[0])} desea prestarte ${count} yenes. ¿Aceptarás?* 
*—◉ Tienes 60 segundos para confirmar.*
*—◉ Escribe:* 
*◉ si = para aceptar*
*◉ no = para cancelar*`.trim();

    await conn.sendMessage(m.chat, { text: confirmMessage, mentions: [loanedUser] }, { quoted: m });

    confirmation[loanedUser] = {
      sender: loanedUser,
      to: m.sender,
      message: m,
      count,
      timeout: setTimeout(() => {
        conn.sendMessage(m.chat, { text: '*⌛ Se acabó el tiempo, no se obtuvo respuesta. Préstamo cancelado.*', mentions: [loanedUser] }, { quoted: m });
        delete confirmation[loanedUser];
      }, 60 * 1000)
    };
  } else if (command === 'pagar') {
    const amountToPay = Math.min(Number.MAX_SAFE_INTEGER, Math.max(MIN_AMOUNT, (isNumber(args[0]) ? parseInt(args[0]) : MIN_AMOUNT))) * 1;

    if (!user.debts || Object.keys(user.debts).length === 0) {
      return conn.sendMessage(m.chat, { text: '*💳 No tienes yenes en deuda para pagar.*', mentions: [m.sender] }, { quoted: m });
    }

    const totalDebt = Object.values(user.debts).reduce((acc, val) => acc + val, 0);

    if (amountToPay < MIN_AMOUNT) {
      return conn.sendMessage(m.chat, { text: `*💰 La cantidad mínima para pagar es ${MIN_AMOUNT} yenes.*`, mentions: [m.sender] }, { quoted: m });
    }

    if (amountToPay > totalDebt) {
      return conn.sendMessage(m.chat, { text: `*💰 No puedes pagar más de ${totalDebt} yenes.*`, mentions: [m.sender] }, { quoted: m });
    }

    for (const [lender, debtAmount] of Object.entries(user.debts)) {
      if (amountToPay <= debtAmount) {
        user.debts[lender] -= amountToPay;
        if (user.debts[lender] <= 0) {
          delete user.debts[lender];
        }
        break;
      }
      amountToPay -= debtAmount;
      delete user.debts[lender];
    }

    conn.sendMessage(m.chat, { text: `*💸 Pago realizado: ${amountToPay} yenes.*`, mentions: [m.sender] }, { quoted: m });

    if (Object.keys(user.debts).length === 0) {
      conn.sendMessage(m.chat, { text: '*🎉 Préstamo cancelado, ya no debes nada.*', mentions: [m.sender] }, { quoted: m });
    }
  } else if (command === 'deuda') {
    if (!user.debts || Object.keys(user.debts).length === 0) {
      return conn.sendMessage(m.chat, { text: '*💳 No tienes deudas pendientes.*', mentions: [m.sender] }, { quoted: m });
    }

    let debtMessage = '*💳 Deudas pendientes:*\n';
    for (const [lender, amount] of Object.entries(user.debts)) {
      debtMessage += `*— ${amount} yenes a @${lender.replace(/@s\\.whatsapp\\.net/g, '')}*\n`;
    }

    conn.sendMessage(m.chat, { text: debtMessage, mentions: Object.keys(user.debts) }, { quoted: m });
  }
}

handler.before = async (m) => {
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;

  const { timeout, sender, message, to, count } = confirmation[m.sender];
  if (m.id === message.id) return;

  const user = global.db.data.users[sender];
  const loanedUser = global.db.data.users[to];

  if (/^No|no$/i.test(m.text)) {
    clearTimeout(timeout);
    delete confirmation[sender];
    return conn.sendMessage(m.chat, { text: '*🔴 Cancelado, el préstamo no se realizará.*', mentions: [m.sender] }, { quoted: m });
  }

  if (/^Si|si$/i.test(m.text)) {
    loanedUser.yenes += count;
    loanedUser.debts = loanedUser.debts || {};
    loanedUser.debts[sender] = (loanedUser.debts[sender] || 0) + count;

    conn.sendMessage(m.chat, { text: `*💱 Se prestaron correctamente ${count} yenes a @${(to || '').replace(/@s\\.whatsapp\\.net/g, '')}.*`, mentions: [to] }, { quoted: m });

    setInterval(() => {
      loanedUser.debts[sender] += DEBT_INCREMENT;
      conn.sendMessage(m.chat, { text: `*💸 La deuda ha sido aumentada en ${DEBT_INCREMENT} yenes.*`, mentions: [to] }, { quoted: m });
    }, DEBT_INTERVAL);

    clearTimeout(timeout);
    delete confirmation[sender];
  }
};

handler.help = ['prestamo', 'pagar', 'deuda'].map((v) => v + ' [cantidad] [@tag]');
handler.tags = ['economy'];
handler.command = ['prestamo', 'pagar', 'deuda'];
handler.disabled = false;
handler.group = true;
handler.register = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
