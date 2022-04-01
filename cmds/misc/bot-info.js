const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const { version } = require('../../package.json')

module.exports = class BotInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      group: 'misc',
      memberName: 'botinfo',
      description: 'Exibe informações sobre o bot.',
    })
  }

  run = async (message) => {
    let totalMembers = 0

    for (const guild of this.client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }

    const embed = new MessageEmbed()
      .setAuthor(
        `Informações sobre o ${this.client.user.username} Bot`,
        this.client.user.displayAvatarURL()
      )
      .addFields(
        {
          name: 'Bot tag',
          value: this.client.user.tag,
        },
        {
          name: 'Versão',
          value: version,
        },
        {
          name: "Prefixo de comando do servidor",
          value: message.guild.commandPrefix,
        },
        {
          name: 'Tempo desde a última reinicialização',
          value: `${process.uptime().toFixed(2)}s`,
        },
        {
          name: 'Contagem de servidores',
          value: this.client.guilds.cache.size,
        },
        {
          name: 'Total members',
          value: totalMembers,
        }
      )

    message.channel.send(embed)
  }
}
