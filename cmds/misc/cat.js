const Commando = require('discord.js-commando')
const axios = require('axios')

module.exports = class CatCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      group: 'misc',
      memberName: 'cat',
      description: 'Exibe uma imagem aleatória de um gato.',
    })
  }

  run = async (message) => {
    axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((res) => {
        console.log('RES:', res.data[0].url)
        message.reply(res.data[0].url)
      })
      .catch((err) => {
        console.error('ERR:', err)
      })
  }
}
