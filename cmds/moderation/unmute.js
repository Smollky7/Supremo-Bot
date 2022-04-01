const Commando = require('discord.js-commando')
const muteSchema = require('../../schemas/mute-schema')

module.exports = class UnmuteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      group: 'moderation',
      memberName: 'unmute',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Reativa o usuário',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    //!unmute @
    //!unmute ID

    const { guild } = message

    if (args.length !== 1) {
      message.reply(
        `Use a sintaxe correta: ${guild.commandPrefix}silenciar <@Membro ou ID>`
      )
      return
    }

    let id = ''

    const target = message.mentions.users.first()
    if (target) {
      id = target.id
    } else {
      id = args[0]
    }

    const result = await muteSchema.updateOne(
      {
        guildId: guild.id,
        userId: id,
        current: true,
      },
      {
        current: false,
      }
    )

    if (result.nModified === 1) {
      const mutedRole = guild.roles.cache.find((role) => {
        return role.name === 'SilênciadaSuprema'
      })

      if (mutedRole) {
        const guildMember = guild.members.cache.get(id)
        guildMember.roles.remove(mutedRole)
      }

      message.reply(`Você ativou o som <@${id}>`)
    } else {
      message.reply('Esse usuário não está silenciado')
    }
  }
}
