const economy = require('../../../features/features/economy')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  permissionError: 'Você deve ser um administrador para usar este comando.',
  permissions: 'ADMINISTRATOR',
  description: 'Dá moedas ao usuário.',
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Marque um usuário para adicionar moedas.')
      return
    }

    const coins = arguments[1]
    if (isNaN(coins)) {
      message.reply('Forneça um número válido de moedas.')
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `Você deu <@${userId}> ${coins} moedas(s). Eles agora têm ${new Coins} moeda(s)!`
    )
  },
}
