const Commando = require('discord.js-commando')
const path = require('path')

module.exports = class PlayAudioCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'playaudio',
      group: 'misc',
      memberName: 'playaudio',
      description: 'Reproduz algum áudio.',
    })
  }

  async run(message) {
    const { voice } = message.member

    if (!voice.channelID) {
      message.reply('Você deve estar em um canal de voz')
      return
    }

    voice.channel.join().then((connection) => {
      connection.play(path.join(__dirname, 'Intro.m4a'))
    })
  }
}
