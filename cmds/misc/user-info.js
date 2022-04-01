const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class UserInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'misc',
      memberName: 'userinfo',
      description: 'Exibe informações de um usuário.',
    })
  }

  run = async (message) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    console.log(member)

    const embed = new MessageEmbed()
      .setAuthor(`Informação do usuário para ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: 'User tag',
          value: user.tag,
        },
        {
          name: 'É bot',
          value: user.bot,
        },
        {
          name: 'Nickname',
          value: member.nickname || 'None',
        },
        {
          name: 'Servidor ingressado',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'Entrou no Discord',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: 'Cargos',
          value: member.roles.cache.size - 1,
        }
      )

    channel.send(embed)
  }
}
