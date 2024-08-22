module.exports = {
  config: {
    name: "rona3",
    description: "Talk to Grumpy AI",
    usage: "", 
    cooldown: 5, 
    accessableby: 0, 
    category: "", 
    prefix: false, 
    author: "heru",
  },
  start: async function ({ api, text, react, event, reply, User }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("😒 Ano ba? Tanong nga, bago ka humingi ng sagot!");
      react("⏳");

      const heru = await new Promise(resolve => {
        api.sendMessage('😒 Wait lang........', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = (
        await get("https://rest-apis-g2jk.onrender.com/api/v3/rona?ask=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('😒 𝚁𝚘𝚗𝚊 𝙰𝙸(𝙶𝚛𝚞𝚖𝚙𝚢)\n━━━━━━━━━━━━━━━━━━\n' + response.result, heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
  }
};