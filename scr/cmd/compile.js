const axios = require("axios");

module.exports = {
  config: {
    name: "compile",
    description: "Compile and run code in various languages",
    usage: "<code>",
    cooldown: 5,
    accessableby: 2,
    category: "compiler",
    prefix: false,
    author: "heru"
  },
  start: async function ({ api, text, react, event, reply }) {
    try {
      const code = text.join(" ");
      const language = this.detectLanguage(code);

      const { data } = await axios.post('https://apiv3-2l3o.onrender.com/compile', {
        language,
        code,
        input: ''
      });

      const url = this.extractUrl(data.output);
      const body = url ? data.output.replace(url, '').trim() : data.output;

      if (url) {
        const { status, data: attachment } = await axios.get(url, { responseType: "stream" });
        status === 200 ? reply({ body, attachment }) : reply({ body });
      } else {
        reply({ body });
      }
    } catch (e) {
      reply(e.response?.data || e.message);
    }
  },

  detectLanguage: function (code) {
    if (/^#!\s*\/bin\/bash/.test(code)) return 'bash';
    if (/public\s+class\s+\w+/.test(code) && /public\s+static\s+void\s+main\s*\(/.test(code)) return 'java';
    if (/^\s*import\s+\w+/.test(code) || /function\s+\w+\s*\(/.test(code) || /class\s+\w+/.test(code)) return 'typescript';
    if (/def\s+\w+\s*\(/.test(code) || /import\s+\w+/.test(code) || code.includes('print(')) return 'python';
    if (/^\s*#include\s+<.*?>/.test(code) || /namespace\s+\w+/.test(code)) return 'cpp';
    if (/^\s*using\s+System/.test(code) || /namespace\s+\w+/.test(code)) return 'csharp';
    if (/^\s*require\s*\(\s*['"][^'"]+['"]\s*\)/.test(code) || /function\s+\w+\s*\(/.test(code) || /console\.log\(/.test(code)) return 'node';
    if (/(\bfor\s+\w+\s+in\s+\w+|\bwhile\s+\w+|\becho\s+.*)/.test(code)) return 'bash';
    return 'unsupported';
  },

  extractUrl: function (output) {
    const match = output.match(/(https:\/\/[^\s]+)/);
    return match ? match[0] : null;
  }
};
