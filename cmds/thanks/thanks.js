const Commando = require('discord.js-commando')
const thanksSchema = require('../../schemas/thanks-schema')

module.exports = class ThanksCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'thx',
      group: 'thanks',
      memberName: 'thx',
      description: 'Obrigado, um usuário por ajudar você',
    })
  }

  run = async (message) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique alguém para agradecer.')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if (targetId === authorId) {
      message.reply('Você não pode agradecer a si mesmo')
      return
    }

    const authorData = await thanksSchema.findOne({
      userId: authorId,
      guildId,
    })

    if (authorData && authorData.lastGave) {
      const then = new Date(authorData.lastGave)

      const diff = now.getTime() - then.getTime()
      const diffHours = Math.round(diff / (1000 * 60 * 60))

      const hours = 24
      if (diffHours <= hours) {
        message.reply(
          `Você já agradeceu a alguém nas últimas ${hours} horas.`
        )
        return
      }
    }

    // Update the "lastGave" property for the command sender
    await thanksSchema.findOneAndUpdate(
      {
        userId: authorId,
        guildId,
      },
      {
        userId: authorId,
        guildId,
        lastGave: now,
      },
      {
        upsert: true,
      }
    )

    // Increase how many thanks the target user has had
    const result = await thanksSchema.findOneAndUpdate(
      {
        userId: targetId,
        guildId,
      },
      {
        userId: targetId,
        guildId,
        $inc: {
          received: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    const amount = result.received
    message.reply(
      `Você agradeceu <@${targetId}>! Eles agora têm ${amount} agradecimentos.`
    )
  }
}
