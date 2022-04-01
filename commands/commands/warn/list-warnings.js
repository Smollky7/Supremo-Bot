const warnSchema = require('../../../schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw'],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ['Moderator'],
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique um usuário para carregar os avisos para.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    const results = await warnSchema.findOne({
      guildId,
      userId,
    })

    let reply = `Avisos anteriores para <@${userId}>:\n\n`

    for (const warning of results.warnings) {
      const { author, timestamp, reason } = warning

      reply += `Por ${author} sobre ${new Date(
        timestamp
      ).toLocaleDateString()} para "${reason}"\n\n`
    }

    message.reply(reply)
  },
}
