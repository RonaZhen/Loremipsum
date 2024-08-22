module.exports = {
  config: {
    name: "gpt4o", 
    description: "Talk to GPT-4 using RuiAPI",
    usage: "[your prompt]",
    cooldown: 0, 
    accessableby: 0, 
    category: "AI Chatbot", 
    prefix: false, 
    author: "heru"
  },
  start: async function ({ api, text, react, event, reply }) {
    const { get } = require("axios");
    try {
      let prompt = text.join(" ");
      if (!prompt) return reply("Please provide a prompt.");
      
      react("⏳");
      
      const response = await get(`https://ruiapi.ddns.net/api/gpt4o?prompt=${encodeURIComponent(prompt)}`);
      
      react("✅");
      return reply(`𝙶𝚙𝚝4𝚘 (𝙰𝚛𝚌𝚑𝚒𝚝𝚎𝚌𝚝𝚞𝚛𝚎)\n━━━━━━━━━━━━━━━━━━\n${response.data.response}\n━━━━━━━━━━━━━━━━━━`);
      
    } catch (error) {
      react("❌");
      return reply(`Error: ${error.message}`);
    }
  }
};