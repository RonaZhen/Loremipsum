const axios = require("axios");

module.exports = {
  config: {
    name: "quote",
    description: "Fetch a random quote",
    usage: "",
    cooldown: 5,
    accessableby: 0,
    category: "fun",
    prefix: false,
    author: "heru"
  },
  start: async function ({ reply, react }) {
    try {
      const { data } = await axios.get('https://deku-rest-api-3jvu.onrender.com/quotes');
      if (data.error) return reply("Could not fetch quote.");

      const quote = data.quotes;
      const author = data.author ? ` - ${data.author}` : "";
      react('⌛')
      reply({ body: `💌 𝚁𝚊𝚗𝚍𝚘𝚖 𝚚𝚞𝚘𝚝𝚎𝚜\n\n${quote}\n\n${author}` });
      react('✅')
    } catch (e) {
      reply(e.response?.data || e.message);
    }
  }
};
