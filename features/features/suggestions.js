const { MessageEmbed } = require('discord.js')
const suggestionSchema = require('../../schemas/suggestions-schema')

const statusMessages = {
  WAITING: {
    text: '📊 Aguardando feedback da comunidade, vote!',
    color: 0xffea00,
  },
  ACCEPTED: {
    text: '✅ Ideia aceita! Espere isso em breve.',
    color: 0x34eb5b,
  },
  DENIED: {
    text:
      '❌ Obrigado pelo feedback, mas não estamos interessados ​​nesta ideia no momento.',
    color: 0xc20808,
  },
}

let suggestionCache = '796810805093072948'

const fetchSuggestionChannels = async (guildId) => {
  let query = {}

  if (guildId) {
    query._id = guildId
  }

  const results = await suggestionSchema.find(query)

  for (const result of results) {
    const { _id, channelId } = result
    suggestionCache[_id] = channelId
  }
}

module.exports = (client) => {
  fetchSuggestionChannels()

  client.on('message', (message) => {
    if(message.channel.type == 'dm') {
      return;
    }else {
          const { guild, channel, content, member } = message

    const cachedChannelId = suggestionCache[guild.id]
    if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
      message.delete()

      const status = statusMessages.WAITING

      const embed = new MessageEmbed()
        .setColor(status.color)
        .setAuthor(member.displayName, member.user.displayAvatarURL())
        .setDescription(content)
        .addFields({
          name: 'Status',
          value: status.text,
        })
        .setFooter('Quer sugerir algo? Basta digitar neste canal')

      channel.send(embed).then((message) => {
        message.react('👍').then(() => {
          message.react('👎')
        })
      })
    }
    }
  })
}

module.exports.fetchSuggestionChannels = fetchSuggestionChannels

module.exports.statusMessages = statusMessages

module.exports.suggestionCache = () => {
  return suggestionCache
}
