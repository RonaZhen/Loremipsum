const first = `𝙷𝚒! 𝙸'𝚖 ${global.deku.BOTNAME}`;
const second = `𝙼𝚢 𝚙𝚛𝚎𝚏𝚒𝚡 𝚒𝚜 ${global.deku.PREFIX}`;
const third = `𝙼𝚢 𝚘𝚠𝚗𝚎𝚛 𝚒𝚜 https://facebook.com/100077070762554`;
const fourth = `𝚃𝚢𝚙𝚎 "${global.deku.PREFIX}help" 𝚝𝚘 𝚟𝚒𝚎𝚠 𝚊𝚕𝚕 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜.\n𝚈𝚘𝚞 𝚌𝚊𝚗 𝚞𝚗𝚜𝚎𝚗𝚝 𝚝𝚑𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚘𝚏 𝚋𝚘𝚝 𝚋𝚢 𝚛𝚎𝚊𝚌𝚝𝚒𝚗𝚐 𝚕𝚒𝚔𝚎 (👍) 𝚘𝚗 𝚒𝚝𝚜 𝚖𝚎𝚜𝚜𝚊𝚐𝚎`;
module.exports.config = {
          name: "bot",
          accessibleby: 0,
          author: "Deku",
          description: "Guide",
          prefix: false,
          category: "bot",
};
module.exports.auto = async function ({ api, event }) {
          const { threadID } = event;
          if (
                    event.body.toLowerCase() == "bot" ||
                    event.body.toLowerCase() == "guide"
          ) {
                    const firstMessage = await api.sendMessage(first, threadID);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    await api.editMessage(
                              second,
                              firstMessage.messageID,
                              threadID,
                    );
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    await api.editMessage(
                              third,
                              firstMessage.messageID,
                              threadID,
                    );
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    await api.editMessage(
                              fourth,
                              firstMessage.messageID,
                              threadID,
                    );
          }
};
