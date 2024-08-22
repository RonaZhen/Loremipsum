module.exports = {
  config: {
    name: "rona",
    description: "Talk to Rona AI",
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
      if (!ask) return reply("Palihug ug hatag og pangutana!");
      react("⏳");

      const heru = await new Promise(resolve => {
        api.sendMessage('😝 Nye! nye! nye! nye!...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = (
        await get("https://rest-apis-g2jk.onrender.com/api/v1/rona?ask=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('😝 𝚁𝚘𝚗𝚊 𝙰𝚒(𝙿𝚕𝚊𝚢𝚏𝚞𝚕)\n━━━━━━━━━━━━━━━━━━\n' + response.result, heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Additional auto-reply logic can be added here if needed
  }
};