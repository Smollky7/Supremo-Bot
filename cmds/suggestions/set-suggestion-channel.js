const Commando = require('discord.js-commando')
const suggestionSchema = require('../../schemas/suggestions-schema')
const { fetchSuggestionChannels } = require('../../features/features/suggestions')

module.exports = class SetSuggestionChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'setsuggestions',
      group: 'suggestions',
      memberName: 'setsuggestions',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Define o canal de sugestão',
    })
  }

  run = async (message) => {
    const channel = message.mentions.channels.first() || message.channel

    const {
      guild: { id: guildId },
    } = message
    const { id: channelId } = channel

    await suggestionSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        channelId,
      },
      {
        upsert: true,
      }
    )

    message.reply(`O canal de sugestões foi definido para ${channel}`)

    fetchSuggestionChannels(guildId)
  }
}
