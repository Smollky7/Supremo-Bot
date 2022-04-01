const Discord = require('discord.js')
const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.cache.get(id)
  if (!channel) {
    return
  }

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // Send a new message
      channel.send(new Discord.MessageEmbed()
.setColor("BLACK")
.setDescription(text)
.setFooter('Supremo Services 🔥')).then((message) => {
        addReactions(message, reactions)
      })
    } else {
      // Edit th()e existing message
      for (const message of messages) {
        message[1].edit(new Discord.MessageEmbed()
.setColor("BLACK")
.setDescription(text)
.setFooter('Supremo Services 🔥'))
        addReactions(message[1], reactions)
      }
    }
  })
}
