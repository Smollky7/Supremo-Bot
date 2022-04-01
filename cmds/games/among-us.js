const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

const amongUsCategorySchema = require('../../schemas/among-us-category-schema')

const channelNameStart = 'Among Us'

module.exports = class AmongUsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'au',
      group: 'games',
      memberName: 'au',
      description: 'Torna mais fácil jogar "Among Us" com os amigos',
      argsType: 'multiple',
    })

    client.on('voiceStateUpdate', (oldState) => {
      const { channel } = oldState

      if (
        channel &&
        channel.name.startsWith(channelNameStart) &&
        channel.members.size === 0
      ) {
        channel.delete()
        console.log(`Excluindo canal "${channel.name}"`)
      }
    })
  }

  run = async (message, args) => {
    //!au <Region> <Code>
    const [region, code] = args

    if (!region) {
      message.reply('Especifique uma região.')
      return
    }

    if (!code) {
      message.reply('Especifique o código do jogo.')
      return
    }

    const { channel, guild, member } = message

    const categoryDocument = await amongUsCategorySchema.findOne({
      _id: guild.id,
    })

    if (!categoryDocument) {
      message.reply('Uma categoria Among Us não foi definida neste servidor')
      return
    }

    const channelName = `${channelNameStart} "${code}"`
    await guild.channels.create(channelName, {
      type: 'voice',
      userLimit: 10,
      parent: categoryDocument.categoryId,
    })

    const embed = new MessageEmbed()
      .setAuthor(
        member.nickname || member.displayName,
        member.user.displayAvatarURL()
      )
      .setDescription(
        `${member} criou um novo jogo Entre Nós! Entrar no canal "${channelName}"`
      )
      .addField('Região', region)
      .addField('Código do Jogo', code)

    channel.send(embed)
  }
}
