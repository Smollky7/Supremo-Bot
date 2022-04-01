const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Expulsa um membro do servidor discord',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
    })
  }

  async run(message) {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique alguém para dar kick')
      return
    }

    const { guild } = message

    const member = guild.members.cache.get(target.id)
    if (member.kickable) {
      member.kick()
      message.reply('Esse usuário foi chutado')
    } else {
      message.reply('Eu não posso chutar aquele usuário')
    }
  }
}
