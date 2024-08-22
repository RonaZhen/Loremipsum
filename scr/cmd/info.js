const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "info",
    description: "Get information about a country",
    usage: "info [country name]",
    cooldown: 5,
    accessableby: 0, // Everyone can use this command
    category: "Utility",
    prefix: false,
    author: "heru",
  },

  start: async function ({ api, event, text }) {
    if (!text[0]) {
      return api.sendMessage("Please provide a country name.", event.threadID, event.messageID);
    }

    const countryName = encodeURIComponent(text.join(" "));
    const apiEndpoint = `https://restcountries.com/v3.1/name/${countryName}`;

    try {
      const response = await axios.get(apiEndpoint);
      const countryData = response.data;

      if (!countryData.length) {
        return api.sendMessage(`No information found for the country "${text.join(" ")}".`, event.threadID, event.messageID);
      }

      const countryInfo = countryData[0];
      const name = countryInfo.name.common;
      const officialName = countryInfo.name.official;
      const capital = countryInfo.capital?.[0];
      const region = countryInfo.region;
      const population = countryInfo.population;
      const languages = Object.values(countryInfo.languages).join(", ");
      const timezones = countryInfo.timezones.join(", ");
      const continents = countryInfo.continents.join(", ");
      const googleMaps = countryInfo.maps.googleMaps;
      const openStreetMaps = countryInfo.maps.openStreetMaps;
      const flagsPNG = countryInfo.flags.png;

      const message = `
𝗖𝗢𝗨𝗡𝗧𝗥𝗬: ${name} (${officialName})\n𝗖𝗔𝗣𝗜𝗧𝗔𝗟: ${capital || "N/A"}\n𝗥𝗘𝗚𝗜𝗢𝗡: ${region}\n𝗣𝗢𝗣𝗨𝗟𝗔𝗧𝗜𝗢𝗡: ${population}\n𝗟𝗔𝗡𝗚𝗨𝗔𝗚𝗘𝗦: ${languages}\n𝗧𝗜𝗠𝗘𝗭𝗢𝗡𝗘𝗦: ${timezones}\n𝗖𝗢𝗡𝗧𝗜𝗡𝗘𝗡𝗧𝗦: ${continents}\n𝗚𝗢𝗢𝗚𝗟𝗘 𝗠𝗔𝗣𝗦: ${googleMaps}\n𝗢𝗣𝗘𝗡𝗦𝗧𝗥𝗘𝗘𝗧 𝗠𝗔𝗣𝗦: ${openStreetMaps}
      `;

      // Create cache directory if it doesn't exist
      const cacheDir = path.resolve(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      // Download the flag image
      const flagResponse = await axios.get(flagsPNG, { responseType: 'arraybuffer' });
      const flagBuffer = Buffer.from(flagResponse.data, 'binary');
      const flagPath = path.resolve(cacheDir, "flag.png");

      // Write the flag image to the cache directory
      fs.writeFileSync(flagPath, flagBuffer);

      // Send the flag image as an attachment
      await api.sendMessage({
        body: message,
        attachment: fs.createReadStream(flagPath)
      }, event.threadID, event.messageID);

      // Clean up the temporary file
      fs.unlinkSync(flagPath);

    } catch (error) {
      return api.sendMessage(error.message, event.threadID, event.messageID);
    }
  },

  auto: async function ({ api, event, text, reply, User }) {
    // Implement any auto-reply functionality if needed
  }
};
