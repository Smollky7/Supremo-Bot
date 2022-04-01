const fs = require('fs')
const path = require('path')
const { MessageAttachment } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class ImageCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'image',
      group: 'misc',
      memberName: 'image',
      description: 'Envia uma imagem.',
    })
  }

  run = (message) => {
    const image = fs.readFileSync(path.join(__dirname, 'image.jpg'))

    const attachment = new MessageAttachment(image)

    message.reply('Aqui está uma imagem', attachment)
  }
}
