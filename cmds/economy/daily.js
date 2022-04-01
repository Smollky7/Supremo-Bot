const Commando = require('discord.js-commando')
const dailyRewardsSchema = require('../../schemas/daily-rewards-schema')
let claimedCache = []

const clearCache = () => {
  claimedCache = []
  setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

const alreadyClaimed = 'Você já resgatou suas recompensas diárias.'

module.exports = class DailyCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      group: 'economy',
      memberName: 'daily',
      description: 'Reivindica recompensas diárias.',
    })
  }

  async run(message) {
    const { guild, member } = message
    const { id } = member

    if (claimedCache.includes(id)) {
      console.log('Retornando do cache')
      message.reply(alreadyClaimed)
      return
    }

    console.log('Buscando de Mongo')

    const obj = {
      guildId: guild.id,
      userId: id,
    }

    const results = await dailyRewardsSchema.findOne(obj)

    console.log('RESULTADOS:', results)

    if (results) {
      const then = new Date(results.updatedAt).getTime()
      const now = new Date().getTime()

      const diffTime = Math.abs(now - then)
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        claimedCache.push(id)

        message.reply(alreadyClaimed)
        return
      }
    }

    await dailyRewardsSchema.findOneAndUpdate(obj, obj, {
      upsert: true,
    })

    claimedCache.push(id)

    message.reply('Você reivindicou suas recompensas diárias!')
  }
}
