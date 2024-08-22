module.exports = {
  config: {
    name: "bio",
    description: "Change bot bio",
    usage: "(text)",
    cooldown: 5,
    accessableby: 2,
    category: "owner",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, text, reply }) {
    try {
      api.changeBio(text.join(" "));
      reply("Admin changed bot bio to: " + text.join(" "));
    } catch (error) {
      console.error(error);
      reply("Failed to change bot bio.");
    }
  },
};