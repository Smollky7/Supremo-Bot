const Commando = require('discord.js-commando')
const muteSchema = require('../../schemas/mute-schema')

const reasons = {
  SPAMMING: 5,
  ADVERTISING: 24,
}

module.exports = class MuteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: '_mute',
      group: 'moderation',
      memberName: '_mute',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Silencia um usuário',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    // !mute @ reason

    const { guild, author: staff } = message

    if (args.length !== 2) {
      message.reply(
        `Sintaxe correta: ${guild.commandPrefix}mute <@Membro> <Razão>`
      )
      return
    }

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique alguém para silenciar')
      return
    }

    const reason = args[1].toUpperCase()
    if (!reasons[reason]) {
      let validReasons = ''
      for (const key in reasons) {
        validReasons += `${key}, `
      }
      validReasons = validReasons.substr(0, validReasons.length - 2)

      message.reply(
        `Motivo desconhecido, por favor, use um dos seguintes: ${validReasons}`
      )
      return
    }

    const previousMutes = await muteSchema.find({
      userId: target.id,
    })

    const currentlyMuted = previousMutes.filter((mute) => {
      return mute.current === true
    })

    if (currentlyMuted.length) {
      message.reply('Esse usuário já está silenciado')
      return
    }

    let duration = reasons[reason] * (previousMutes.length + 1)

    const expires = new Date()
    expires.setHours(expires.getHours() + duration)

    const mutedRole = guild.roles.cache.find((role) => {
      return role.name === 'SilênciadaSuprema'
    })
    if (!mutedRole) {
      message.reply('Não foi possível encontrar um papel "SilênciadaSuprema"')
      return
    }

    const targetMember = (await guild.members.fetch()).get(target.id)
    targetMember.roles.add(mutedRole)

    await new muteSchema({
      userId: target.id,
      guildId: guild.id,
      reason,
      staffId: staff.id,
      staffTag: staff.tag,
      expires,
      current: true,
    }).save()

    message.reply(
      `Você silenciou <@${target.id}> por "${reason}". O som deles será reativado em ${duration} horas.`
    )
  }
}
