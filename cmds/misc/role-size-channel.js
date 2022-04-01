const Commando = require('discord.js-commando')
const roleSizeSchema = require('../../schemas/role-size-schema')
const { fetchChannelData } = require('../../features/features/role-size-channel')

module.exports = class RoleCounterCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'rolecounter',
      group: 'misc',
      memberName: 'rolecounter',
      userPermissions: ['ADMINISTRATOR'],
      description:
        'Habilita um canal para contar o número de membros em um papel ou guilda.',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    //!rolecounter 475984375894435 47543567435643 Python:

    const { guild } = message
    const syntax = `${guild.commandPrefix}roleCounter <Voice canall ID> <cargo ID or "all"> <Text>`

    if (args.length < 3) {
      message.reply(`Sintaxe correta: ${syntax}`)
      return
    }

    const channelId = args.shift()
    const channel = guild.channels.cache.get(channelId)
    if (!channel || channel.type !== 'voice') {
      message.reply(`Você deve fornecer um ID de canal de voz:\n${syntax}`)
      return
    }

    const roleId = args.shift().toLowerCase()
    if (roleId !== 'all') {
      const role = guild.roles.cache.get(roleId)
      if (!role) {
        message.reply(
          `Você deve fornecer um ID de função válido ou a palavra "todos" para todos os membros da guilda:\n${syntax}`
        )
        return
      }
    }

    const text = args.join(' ')

    await roleSizeSchema.findOneAndUpdate(
      {
        guildId: guild.id,
        channelId,
      },
      {
        guildId: guild.id,
        channelId,
        roleId,
        text,
      },
      {
        upsert: true,
      }
    )

    message.reply('Conjunto de contador de canal de voz!')

    fetchChannelData()
  }
}
