const punishmentLogSchema = require('../../../schemas/punishment-log-schema')

module.exports = {
  commands: ['punishmentlogs', 'punishlogs'],
  minArgs: 1,
  maxArgs: 1,
  description: "<@Membro>",
  permission: 'ADMINISTRATORS',
  callback: async (message, arguments) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique alguém para carregar punições por.')
      return
    }

    const { guild } = message
    const { id } = target

    const results = await punishmentLogSchema.find({
      guildId: guild.id,
      userId: id,
    })

    let reply = 'Punições anteriores:\n\n'

    for (const result of results) {
      reply += `${result.command} foi executado em ${new Date(
        result.createdAt
      ).toLocaleTimeString()}\n\n`
    }

    message.reply(reply)
  },
}
