const Commando = require('discord.js-commando')
const tempChannelSchema = require('../../schemas/temp-channels-schema')

module.exports = class TempChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'tempchannel',
      group: 'misc',
      memberName: 'tempchannel',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Cria um canal temporário.',
    })
  }

  run = async (message) => {
    const { guild, member } = message
    const guildId = guild.id
    const memberId = member.id

    const results = await tempChannelSchema.findOne({
      guildId,
      memberId,
    })

    if (results) {
      message.reply('Você já tem um canal temporário')
      return
    }

    message.reply('Você foi marcado em um canal, verifique.')

    const role = guild.roles.cache.find((role) => {
      return role.name === '@everyone'
    })

    const newChannel = await guild.channels.create('Canal de temperatura de teste', {
      parent: '464318590632460291', // Community category
      permissionOverwrites: [
        {
          id: role.id, // Everyone role
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: memberId,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    })

    newChannel.send('Hello world')

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 1)

    await new tempChannelSchema({
      guildId,
      channelId: newChannel.id,
      userId: memberId,
      expires,
    }).save()
  }
}
