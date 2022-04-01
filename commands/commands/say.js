const loadCommands = require('../load-commands')
const { prefix, svrID} = require('../../config.json')
const Discord = require("discord.js")
module.exports = {
  commands: ['say', 's', 'falar'],
  description: "Cria embeds.",
  callback: (message, arguments, text, client) => {
    const emojiDiamante = serv.emojis.cache.get('')
    message.delete();
    const content = args.join(" ");
    message.channel.send(content)
  },
   }