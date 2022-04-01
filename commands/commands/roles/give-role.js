module.exports = {
  commands: 'giverole',
  minArgs: 2,
  description: "<@Membro> <O nome do cargo>",
  permissions: 'ADMINISTRATOR',
  callback: (message, arguments) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Especifique alguém para atribuir um cargo.')
      return
    }

    arguments.shift()

    const roleName = arguments.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`Não há função com o nome "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)
    member.roles.add(role)

    message.reply(`esse usuário agora tem a função "${roleName}"`)
  },
}
