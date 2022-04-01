const loadCommands = require('../load-commands')
const { prefix, svrID} = require('../../config.json')
const Discord = require("discord.js")
module.exports = {
  commands: ['help', 'h'],
  description: "Descreve todos os comandos deste bot.",
  callback: (message, arguments, text, client) => {
    const svr = client.guilds.cache.get(svrID)
    let reply = `Olá ${message.author.username}, eu sou o <@${client.user.id}>, aqui estão meus comandos suportados no momento:\n\n`

    const commands = loadCommands()

    for (const command of commands) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
      const { description } = command

      reply += `**${prefix}${mainCommand}${args}** = ${description}\n`
    }
    const magem = new Discord.MessageEmbed()
.setColor("BLACK")
.setDescription(reply)
.setThumbnail('https://media.discordapp.net/attachments/796831755800936489/910282424410333244/GIF-211116_183415.gif?width=655&height=655')
.setImage()
.setFooter(`${message.guild.name} 🔥 • Id: ${message.author.id}`, message.author.displayAvatarURL())

    
    message.channel.send(magem)
  },
}
