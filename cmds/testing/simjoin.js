const Commando = require('discord.js-commando')

module.exports = class SimJoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'simjoin',
      group: 'testing',
      memberName: 'simjoin',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simula uma entrada de membro',
    })
  }

  run = (message) => {
    this.client.emit('guildMemberAdd', message.member)
  }
}
