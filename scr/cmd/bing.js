const axios = require("axios");

module.exports = {
  config: {
    name: "bing",
    description: "Talk to Bing AI using different modes",
    usage: "bing [mode] [prompt]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "heru",
  },

  start: async function ({ api, event, text, react, reply }) {
    const { messageID, threadID } = event;
    const [mode, ...promptArray] = text;
    const prompt = promptArray.join(" ");

    if (!mode || !prompt) return reply("Please provide a mode:\n1 (creative)\n2 (balanced)\n3 (precise)\nExample: bing 1 hello");

    const modes = {
      "1": "Creative",
      "2": "Balanced",
      "3": "Precise"
    };

    if (!modes[mode]) return reply("Invalid mode. Choose from:\n 1 (Creative)\n2 (Balanced)\n3 (Precise).");

    try {
      react("⏳");

      const rona = await new Promise(resolve => {
        api.sendMessage('Searching, please wait...', threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await axios.get(`https://deku-rest-api-3jvu.onrender.com/bing?prompt=${encodeURIComponent(prompt)}&mode=${mode}`);
      const result = response.data.bing;

      react("✅");
      await api.editMessage(`📦 𝙱𝚒𝚗𝚐 𝙰𝚒 (${modes[mode]})\n━━━━━━━━━━━━━━━━━━\n${result}`, rona.messageID);
    } catch (error) {
      react("❌");
      reply(`An error occurred: ${error.message}`);
    }
  }
};
