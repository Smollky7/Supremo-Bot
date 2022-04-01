const Discord = require('discord.js')
const mongo = require('../../util/mongo')
const command = require('../../util/command')
const welcomeSchema = require('../../schemas/welcome-schema')

module.exports = (client, message) => {
  //!setwelcome <message>
  const cache = {} // guildId: [channelId, text]

  command(client, 'setwelcome', async (message) => {
    message.delete();
    const { member, channel, content, guild } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('Você não tem permissão para executar este comando.')
      return
    }

    let text = content

    const split = text.split(' ')

    if (split.length < 2) {
      channel.send('Por favor, forneça uma mensagem de boas-vindas')
      return
    }

    split.shift()
    text = split.join(' ')

    cache[guild.id] = [channel.id, text]

    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
        text,
      },
      {
        upsert: true,
      }
    )
  })

  const onJoin = async (member) => {
    const { guild } = member

    let data = cache[guild.id]

    if (!data) {
      console.log('BUSCANDO DO BANCO DE DADOS')

      const result = await welcomeSchema.findOne({ _id: guild.id })

      cache[guild.id] = data = [result.channelId, result.text]
    }

    const channelId = data[0]
    const text = data[1]

    const channel = guild.channels.cache.get(channelId)



    
    const embed = new Discord.MessageEmbed()
.setColor('A020F0')
.setThumbnail('https://media.discordapp.net/attachments/796831755800936489/910282424410333244/GIF-211116_183415.gif?width=655&height=655')
.setDescription(text.replace(/<@membro>/g, `${member.user.username}`))
.setFooter(`${guild.name} 🔥 | id: ${member.id}`)
    channel.send( `<@${member.id}>`, embed)
  }

  command(client, 'simjoin', (message) => {
    message.delete();
    onJoin(message.member)
  })

  client.on('guildMemberAdd', (member) => {
    onJoin(member)
  })
}
