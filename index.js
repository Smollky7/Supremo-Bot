const MongoClient = require('mongodb').MongoClient
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider

const path = require('path')

const config = require('./config.json')
const { loadLanguages } = require('./util/language')
const loadCommands = require('./commands/load-commands')
const commandBase = require('./commands/command-base')
const loadFeatures = require('./features/load-features')
const mongo = require('./util/mongo')
const modLogs = require('./features/features/mod-logs')
const msg = require('./util/first-message'); 
const configMSG = require('./util/configM')
const regrasMSG = require('./util/regras-edit')
const cargos = require('./util/cargoM')

const Commando = require('discord.js-commando')
const client = new Commando.CommandoClient({
  owner: '479733668559192066',
  commandPrefix: config.prefix,
})

client.setProvider(
  MongoClient.connect(config.mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      return new MongoDBProvider(client, 'BotsDiscordSupremo')
    })
    .catch((err) => {
      console.error(err)
    })
)

client.on('ready', async () => {
  
  
  await mongo()
  const guild = client.guilds.cache.get('759455771225358367')
  const cargCEO = guild.roles.cache.find(r => r.id === '767564039818706966')
  const cargMode = guild.roles.cache.find(r => r.id === '850544777018474526')
  const cargADM = guild.roles.cache.find(r => r.id === '801488276887175208')
  const cargDevs = guild.roles.cache.find(r => r.id === '850544295621820426')
  const cargStaffs = guild.roles.cache.find(r => r.id === '801488370366676993')
  const cargEstagiarios = guild.roles.cache.find(r => r.id === '807312386847408179')

  const CargoCEO = cargCEO.members.map(e => `${e.user}`).join("\n")
  const CargoMode = cargMode.members.map(e => `${e.user}`).join("\n")
  const CargoADM = cargADM.members.map(e => `${e.user}`).join("\n")
  const CargoDevs = cargDevs.members.map(e => `${e.user}`).join("\n")
  const CargoStaffs = cargStaffs.members.map(e => `${e.user}`).join("\n")
  const CargoEstagiarios = cargEstagiarios.members.map(e => `${e.user}`).join("\n")
  
 cargos(client, '916837320643207199', `__Esses são alguns dos cargos que pode lhe ajudar aqui no servidor.__\n\n`)

 regrasMSG(client, '914263142584958987', 'test', ['🤍'])
  msg(client, '903057301844426753', '**__Supremo Services__**\n\n__Os serviços disponíveis no momento são:__\n\n``` - Criação de servidores de Minecraft;```\n\n``` - Criação de Bot Discord;```\n\n``` - Criação profissionais ou divulgação de servidores Discord;```\n\n``` - Edição de fotos;```\n\n``` - Edição de videos;```\n\nClique em "📬" aqui embaixo e abrir um ticket!\nVocê pode saber mais clicando em "📃".', ['📬', '📃'])

configMSG(client)
  loadLanguages(client)
  commandBase.loadPrefixes(client)
  loadCommands(client)
  loadFeatures(client)

  modLogs(client)
  let activities = [
	  `Utilize ${config.prefix}help para obter ajuda.`,
	  'Você pode me costumisar sabia?',
	  'Venha fazer negócio conosco.'
	  ],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'STREAMING'
			}),
		1000 * 60
	);
  client.user.setStatus('idle').catch(console.error);
  console.log('Estou online!')
})
client.login(config.token)