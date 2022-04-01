const economy = require('../../../features/features/economy')

module.exports = {
  commands: 'pay',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<Target user's @> <Amount of coins>",
  callback: async (message, arguments, text) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Por favor, especifique alguém para dar moedas.')
      return
    }

    const coinsToGive = arguments[1]
    if (isNaN(coinsToGive)) {
      message.reply('Forneça um número válido de moedas para dar.')
      return
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`Você não tem ${coinsToGive} moedas!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)

    message.reply(
      `Você deu <@${target.id}> ${coinsToGive} moedas! Eles agora têm ${newBalance} moedas e você tem ${permanentCoins} moedas!`
    )
  },
}
