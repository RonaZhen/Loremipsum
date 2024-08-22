module.exports = {
  config: {
    name: "restart",
    description: "Restart Bot",
    usage: "",
    cooldown: 0,
    accessableby: 2,
    category: "system",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, reply }) {
    const { threadID, senderID } = event;

    if (senderID !== "100077070762554") {
      return reply("You don't have permission to use this command.");
    }

    const message = await new Promise((resolve, reject) => {
      api.sendMessage(`${global.deku.BOTNAME} Bot is restarting in 5 seconds...`, threadID, (err, info) => {
        if (err) return reject(err);
        resolve(info.messageID);
      });
    });

    for (let i = 4; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await api.editMessage(`${global.deku.BOTNAME} Bot is restarting in ${i} seconds...`, message);
    }

    await api.editMessage(`✅ Bot done restarting`, message);

    return process.exit(1);
  },
};
