const loadCommands = require('../load-commands')
const { prefix, svrID} = require('../../config.json')
const Discord = require("discord.js")
module.exports = {
  commands: ['embed', 'e'],
  description: "Cria embeds.",
  callback: (message, arguments, text, client) => {
    const emojiDiamante = client.emojis.cache.get('917221594592591933')
    message.delete();

    if(message.author.id != "479733668559192066") {
      message.channel.send('Desculpa você não é pode usar esse comando.').then(msg => msg.delete({timeout: 5000}))
      }
      const embed = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setAuthor("Bot map")
      .setTitle("Bot's Disponíveis / Available Bot's")
      .setThumbnail('https://images-ext-2.discordapp.net/external/Hxi1CBxwpHWoDxtBraeFvWSZmC7eEAoyG0edI0AFa2A/https/imgur.com/jb3fQG5.png')
      .setDescription("1️⃣ Tenha acesso ao Gartic. / Get access to Gartic.\n2️⃣ Tenha acesso ao Akinator. / Get access to Akinator.\n3️⃣ Tenha acesso ao Mudae. / Get access to Mudae.")
      .setFooter("Para adicionar mais bots fale conosco no canal de sugestão. / To add more bots contact us on the suggestion channel.")




      message.channel.send(embed).then(msg => {
        msg.react('1️⃣')
        msg.react('2️⃣')
        msg.react('3️⃣')
      })

  },
   }