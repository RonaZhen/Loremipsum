module.exports = {
  config: {
    name: "bingv2", 
    description: "Search Bing using an API",
    usage: "[your search query]",
    cooldown: 0, 
    accessableby: 0, 
    category: "Search", 
    prefix: false, 
    author: "heru"
  },
  start: async function ({ api, text, react, event, reply }) {
    const { get } = require("axios");
    try {
      let query = text.join(" ");
      if (!query) return reply("Please provide a prompt.");
      
      react("⏳");
      
      const response = await get(`https://ruiapi.ddns.net/api/bing?prompt=${encodeURIComponent(query)}`);
      
      react("✅");
      return reply(`𝙱𝚒𝚗𝚐 𝙰𝚒 (𝙼𝚒𝚌𝚛𝚘𝚜𝚘𝚏𝚝'𝚜 𝚕𝚕𝚖)\n━━━━━━━━━━━━━━━━━━\n${response.data.response}━━━━━━━━━━━━━━━━━━`);
      
    } catch (error) {
      return api.sendMessage(error.message, event.threadID, event.messageID);
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // Auto-reply logic if needed
  }
};