const economy = require('../../../features/features/economy')

module.exports = {
  commands: ['balance', 'bal'],
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  description: "Exibe as moedas de um usuário.",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    message.reply(`Esse usuário tem ${coins} moedas!`)
  },
}
