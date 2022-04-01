const Commando = require('discord.js-commando')

module.exports = class SlowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slow',
      group: 'misc',
      memberName: 'slow',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Altera a duração do modo lento para este canal.',
      argsType: 'multiple',
    })
  }

  run = (message, args) => {
    const { channel } = message

    if (args.length < 2) {
      message.reply('Forneça uma duração e um motivo')
      return
    }

    let duration = args.shift().toLowerCase()
    if (duration === 'off') {
      duration = 0
    }

    if (isNaN(duration)) {
      message.reply(
        'Forneça alguns segundos ou a palavra "desligado"'
      )
      return
    }

    //['testing','hello','world']
    //.join(' ')
    //testing hello world

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.reply(`O slowmode para este canal foi definido para ${duration}`)
  }
}
