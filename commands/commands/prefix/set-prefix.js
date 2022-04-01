const commandPrefixSchema = require('../../../schemas/command-prefix-schema')

// Importing command-base so we have access to the
// "updateCache" function which I forgot to cover in the video
const commandBase = require('../../command-base')

module.exports = {
  commands: 'setprefix',
  minArgs: 1,
  maxArgs: 1,
  description: "<O novo prefixo de comando deste bot>",
  permissionError: 'Você deve ser um administrador para executar este comando.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {
    const guildId = message.guild.id
    const prefix = arguments[0]

    await commandPrefixSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        prefix,
      },
      {
        upsert: true,
      }
    )

    message.reply(`O prefixo para este bot agora é \`${prefix}\``)

    // Update the cache
    commandBase.updateCache(guildId, prefix)
  },
}
