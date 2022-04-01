module.exports = (client) => {
  const channelId = '902968285816033300'

  const updateMembers = (guild) => {
    if (guild) {
      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        channel.setName(`Membros: ${guild.memberCount.toLocaleString()} 👥`)
      }
    }
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('759455771225358367')
  updateMembers(guild)
}
