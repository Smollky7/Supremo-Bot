const Discord = require('discord.js')
module.exports = async (client, id, text, message) => {
  const serv = client.guilds.cache.find(g => g.id === '759455771225358367')
  const channel = await client.channels.cache.get(id)
  if (!channel) {
    return
  }
const guild = client.guilds.cache.get('759455771225358367')
  const cargCEO = guild.roles.cache.find(r => r.id === '767564039818706966')
  const cargMode = guild.roles.cache.find(r => r.id === '850544777018474526')
  const cargADM = guild.roles.cache.find(r => r.id === '801488276887175208')
  const cargDevs = guild.roles.cache.find(r => r.id === '850544295621820426')
  const cargStaffs = guild.roles.cache.find(r => r.id === '801488370366676993')
  const cargEstagiarios = guild.roles.cache.find(r => r.id === '807312386847408179')

  const CargoCEO = cargCEO.members.map(e => `${e.user.tag}`).join("\n")
  const CargoMode = cargMode.members.map(e => `${e.user.tag}`).join("\n")
  const CargoADM = cargADM.members.map(e => `${e.user.tag}`).join("\n")
  const CargoDevs = cargDevs.members.map(e => `${e.user.tag}`).join("\n")
  const CargoStaffs = cargStaffs.members.map(e => `${e.user.tag}`).join("\n")
  const CargoEstagiarios = cargEstagiarios.members.map(e => `${e.user.tag}`).join("\n")
  
     
  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      channel.send(new Discord.MessageEmbed()
.setColor("BLACK")
.setTitle(`Cargos do servidor ${serv}`)
.setThumbnail('https://media.discordapp.net/attachments/796831755800936489/910282424410333244/GIF-211116_183415.gif?width=655&height=655')
.addField(`${cargCEO.name}:`, `${CargoCEO ? CargoCEO : "Ninguém tem esse cargo."}`)
.addField(`${cargMode.name}:`,`${CargoMode ? CargoMode : "Ninguém tem esse cargo."}`)
.addField(`${cargADM.name}:`, `${CargoADM ? CargoADM : "Ninguém tem esse cargo."}`)
.addField(`${cargDevs.name}:`, `${CargoDevs ? CargoDevs : "Ninguém tem esse cargo."}`)
.addField(`${cargStaffs.name}:`,`${CargoStaffs ? CargoStaffs : "Ninguém tem esse cargo."}`)
.addField(`${cargEstagiarios.name}:`,`${CargoEstagiarios ? CargoEstagiarios : "Ninguém tem esse cargo."}`)
.setFooter(`${serv} 🔥`)).then((messag) => {
      })
    } else {
      // Edit th()e existing message
      for (const messag of messages) {
        messag[1].edit(new Discord.MessageEmbed()
.setColor("BLACK")
.setTitle(`Cargos do servidor ${serv}`)
.setThumbnail('https://media.discordapp.net/attachments/796831755800936489/910282424410333244/GIF-211116_183415.gif?width=655&height=655')
.addField(`${cargCEO.name}:`, `${CargoCEO ? CargoCEO : "Ninguém tem esse cargo."}`)
.addField(`${cargMode.name}:`,`${CargoMode ? CargoMode : "Ninguém tem esse cargo."}`)
.addField(`${cargADM.name}:`, `${CargoADM ? CargoADM : "Ninguém tem esse cargo."}`)
.addField(`${cargDevs.name}:`, `${CargoDevs ? CargoDevs : "Ninguém tem esse cargo."}`)
.addField(`${cargStaffs.name}:`,`${CargoStaffs ? CargoStaffs : "Ninguém tem esse cargo."}`)
.addField(`${cargEstagiarios.name}:`,`${CargoEstagiarios ? CargoEstagiarios : "Ninguém tem esse cargo."}`)
.setFooter(`${serv} 🔥`))
      }
    }
  })
}
