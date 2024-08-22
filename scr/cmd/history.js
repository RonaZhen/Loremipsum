module.exports = {
  config: {
    name: "history",
    description: "Search and get information about historical events.",
    usage: "history [search_query]",
    cooldown: 5,
    accessableby: 0,
    category: "", 
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, text, reply, react }) {
    const axios = require('axios');
    const searchQuery = text.join(" ");

    if (!searchQuery) {
      return reply("Please provide a search query (e.g., history anglo Nepal war).");
    }

    try {
      react("⏳");
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`);

      if (response.data.title && response.data.extract) {
        const title = response.data.title;
        const extract = response.data.extract;
        react("✅");
        reply(`Information about "${title}":\n${extract}`);
      } else {
        reply(`No information found for "${searchQuery}".`);
      }
    } catch (error) {
      console.error("Error fetching historical information:", error);
      reply("An error occurred while fetching historical information.");
    }
  },
};