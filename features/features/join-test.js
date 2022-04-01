module.exports = (client) => {
  client.on('guildMemberAdd', (member) => {
    console.log(`${member.id} juntou-se ao servidor`)
  })

  client.on('guildMemberLeave', (member) => {
    console.log(`${member.id} saiu do servidor`)
  })
}
