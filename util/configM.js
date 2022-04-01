const Discord = require('discord.js')
module.exports = async (client, message, user, reaction) => {
  const messageTIcket = '908671779260747776'
  const messageVerific = '945152555489583114'
  const messageBotMap = '945364067432923146'
  const messageCarg = '916827800097394798'

  client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot) return; 
    if(reaction.message.id == messageTIcket && reaction.emoji.name == '📬') {
      await reaction.users.remove(user);
         }
    if(reaction.message.id == messageTIcket && reaction.emoji.name == '📃') {
       await reaction.users.remove(user);
         }
    if(reaction.message.id == messageBotMap && reaction.emoji.name == '1️⃣') {
       await reaction.users.remove(user);
         }
     if(reaction.message.id == messageBotMap && reaction.emoji.name == '2️⃣') {
       await reaction.users.remove(user);
         }
    if(reaction.message.id == messageBotMap && reaction.emoji.name == '3️⃣') {
       await reaction.users.remove(user);
         }    
          })


  client.on('raw', async dados => {
    if(dados.t !== "MESSAGE_REACTION_ADD") return
  const msg = dados.d.message_id
  const serv = client.guilds.cache.get('759455771225358367')
 if(dados.d.message_id === messageTIcket){
    if(dados.t === "MESSAGE_REACTION_ADD"){

        if(dados.d.emoji.name === '📬'){
 
          const membro = serv.members.cache.get(dados.d.user_id);
          const tick = serv.channels.cache.find(ch => ch.name.includes(`${membro.id}`));
          if (serv.channels.cache.find(ch1 => ch1.name.includes(`${membro.id}`)))
       return membro.send(new Discord.MessageEmbed()
       .setColor("WHITE")
       .setTitle(serv.name)
       .setDescription(`Olá ${membro}! o seu ticket já está aberto, inclusive eu até já mencionei você lá!\n\nMais caso queira, clique aqui 👉 ${tick}\n\nE você será direcionado automaticamente para lá!`)
       .setFooter(`${serv.name} 🔥`)
       .setThumbnail("https://cdn.discordapp.com/attachments/796831755800936489/804147129026478151/GIF-210127_212322.gif")
       .setTimestamp());

          serv.channels.create(`Ticket • ${membro.user.username}┇${membro.id}`,{
            type: 'text',
            parent: '908671109799497760',
            permissionOverwrites:[
                {
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                    id: membro.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: serv.id
                }
            ]

        }).then(async ch => {
            ch.send(`<@${membro.id}>`, new Discord.MessageEmbed().setTitle("Boas vindas ao seu ticket").setDescription("Em alguns estantes um Developer ira lhe atender!").setColor("BLACK"));
            client.on('message', () => {
            })
        })
        };
        if(dados.d.emoji.name === '📃'){
          const serv = client.guilds.cache.get('759455771225358367')
          const membro = serv.members.cache.get(dados.d.user_id);
    const embedHelp = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('Selecione o Serviço que você que se informar\n 1️⃣ Criação de servidores de Minecraft;\n 2️⃣ Criação de Bot Discord;\n 3️⃣ Criação profissionais ou divulgação de servidores Discord;\n 4️⃣ Edição de fotos;\n 5️⃣ Edição de videos;')
      membro.send(embedHelp).then(msgHelp =>{
        
        msgHelp.react("1️⃣")
        msgHelp.react("2️⃣")
        msgHelp.react("3️⃣")
        msgHelp.react("4️⃣")
        msgHelp.react("5️⃣")

            let minecraftFitro = (reaction, user) => reaction.emoji.name == "1️⃣" && user.id == membro.id;
            let botDcFitro = (reaction, user) => reaction.emoji.name == "2️⃣" && user.id == membro.id;
            let dcServerFitro = (reaction, user) => reaction.emoji.name == "3️⃣" && user.id == membro.id;
           let edicaodeFtFitro = (reaction, user) => reaction.emoji.name == "4️⃣" && user.id == membro.id;
           let edicaoDeVideoFitro = (reaction, user) => reaction.emoji.name == "5️⃣" && user.id == membro.id;
            
            let mineColetor = msgHelp.createReactionCollector(minecraftFitro);
            let botDcColetor = msgHelp.createReactionCollector(botDcFitro);
            let dcServerColetor = msgHelp.createReactionCollector(dcServerFitro);
        let edicaodeFtColetor = msgHelp.createReactionCollector(edicaodeFtFitro);
         let edicaoDeVideoColetor = msgHelp.createReactionCollector(edicaoDeVideoFitro);
        
        mineColetor.on('collect', () => {
          const mineEmbed = new Discord.MessageEmbed() 
               .setColor('WHITE')
               .setTitle('Servidores de Minecraft')
               .setDescription('Já pensou em jogar com seus amigos em um servidor só seu, podendo costomizar e ser total dono dele? Aqui é o lugar certo!\n\nFazemos:\nServidor Vanila por apenas R$ 30,00\nServidor Spigot/craftbukkit por apenas R$60,00\nNetwork por apenas R$160,00\n\nSendo apenas os preços iniciais ja que os servidores serão customizados conforme a preferência do cliente então terá custos adicionais ao decorrer do projeto.')

msgHelp.edit(mineEmbed).then(msgMine => {
  msgMine.react("🔁")
  
  let backFitro = (reaction, user) => reaction.emoji.name == "🔁" && user.id == membro.id;
            let backColetor = msgHelp.createReactionCollector(backFitro);

  backColetor.on('collect', () => {
      msgMine.edit(embedHelp)
})
})
        })
        botDcColetor.on('collect', () => {
          const embedBotDc = new Discord.MessageEmbed()
.setColor('WHITE')
.setTitle("Bot's Discord")
.setDescription('Já pensou ter seu próprio bot no seu servidor Discord com todos os comandos que você desejar de moderação, diversão e muitos outros?\nVocê está no lugar certo!\n\nFazemos bot personalizado com a sua cara e com o objetivo certo que lhe agrada.\n\nO valor da compra varia com os comandos e com as especificações que você desejar, fazemos o preço certo e o ideal que cabe no seu bolso!')
          msgHelp.edit(embedBotDc).then(msgBotDc => {
      msgBotDc.react('🔁')
            let backFitro = (reaction, user) => reaction.emoji.name == "🔁" && user.id == membro.id;
            let backColetor = msgHelp.createReactionCollector(backFitro);

  backColetor.on('collect', () => {
      msgBotDc.edit(embedHelp)
})
          })
        
      })
          dcServerColetor.on('collect', () => {
          const embedBotDc = new Discord.MessageEmbed()
.setColor('WHITE')
.setTitle("Criação ou divulgação de servidores Discord")
.setDescription('Você quer ter seu proprio servidor no Discord, podendo convidar seus amigos para jogar ou até bate aquele papo legal ou você pode ter seu proprio server, poder ter apoio dos bots supremos, todo profissional e poder crescer ele e se tornar talvez o melhor servidor mundo? Você veio ao lugar certo! Abra seu ticket e ajudaremos você nisso os preços são definidos na hora com ate o compinado de ter disfunções.')
          msgHelp.edit(embedBotDc).then(msgBotDc => {
      msgBotDc.react('🔁')
            let backFitro = (reaction, user) => reaction.emoji.name == "🔁" && user.id == membro.id;
            let backColetor = msgHelp.createReactionCollector(backFitro);

  backColetor.on('collect', () => {
      msgBotDc.edit(embedHelp)
})
          })
        
      })
      edicaodeFtColetor.on('collect', () => {
          const embedBotDc = new Discord.MessageEmbed()
.setColor('WHITE')
.setTitle("Edições de fotos")
.setDescription('Editamos suas fotos, fazemos flyes, bunner e tudo o que você desejar na sua foto ou propaganda, já os preços são definidos na hora da edição.')
          msgHelp.edit(embedBotDc).then(msgBotDc => {
      msgBotDc.react('🔁')
            let backFitro = (reaction, user) => reaction.emoji.name == "🔁" && user.id == membro.id;
            let backColetor = msgHelp.createReactionCollector(backFitro);

  backColetor.on('collect', () => {
      msgBotDc.edit(embedHelp)
})
          })
        
      })
      edicaoDeVideoColetor.on('collect', () => {
          const embedBotDc = new Discord.MessageEmbed()
.setColor('WHITE')
.setTitle("Edições de videos")
.setDescription('Editamos seus videos do jeito que preferir, com efeitos e até videos para o Youtube, o preço é definido conforme seja suas exigências e o pruto do video.')
          msgHelp.edit(embedBotDc).then(msgBotDc => {
      msgBotDc.react('🔁')
            let backFitro = (reaction, user) => reaction.emoji.name == "🔁" && user.id == membro.id;
            let backColetor = msgHelp.createReactionCollector(backFitro);

  backColetor.on('collect', () => {
      msgBotDc.edit(embedHelp)
})
          })
        
      })

            })
        };

    };
};

 if(dados.d.message_id === messageVerific){
   if(dados.t === "MESSAGE_REACTION_ADD"){

        if(dados.d.emoji.name === '✅'){
          const rolesADD = serv.roles.cache.get('801489328903684138')
          const membro = serv.members.cache.get(dados.d.user_id);
          
          membro.roles.add(rolesADD)
        };
      
   }
 }
 if(dados.d.message_id === messageBotMap){
   if(dados.t === "MESSAGE_REACTION_ADD"){

      if(dados.d.emoji.name === '1️⃣'){
          let rolesADD = serv.roles.cache.get('945358631405252709')
          const membro = serv.members.cache.get(dados.d.user_id);
          
          membro.roles.add(rolesADD)
        };
      if(dados.d.emoji.name === '️2️⃣'){
          let rolesADD = serv.roles.cache.get('945359175251283988')
          const membro = serv.members.cache.get(dados.d.user_id);
          
          membro.roles.add(rolesADD)
        };
      if(dados.d.emoji.name === '3️⃣'){
          let rolesADD = serv.roles.cache.get('945358976604856331')
          const membro = serv.members.cache.get(dados.d.user_id);
          
          membro.roles.add(rolesADD)
        };
   }
 }

//Ticket
/*
 if(dados.d.message_id === messageCarg){
    if(dados.t === "MESSAGE_REACTION_ADD"){
      if(dados.d.emoji.name === '📨'){
          const membro = serv.members.cache.get(dados.d.user_id);
          const tick = serv.channels.cache.find(ch => ch.name.includes(`${membro.id}`));
          if (serv.channels.cache.find(ch1 => ch1.name.includes(`${membro.id}`)))
       return membro.send(new Discord.MessageEmbed()
       .setColor("WHITE")
       .setTitle(serv.name)
       .setDescription(`Olá ${membro}! o seu ticket já está aberto, inclusive eu até já mencionei você lá!\n\nMais caso queira, clique aqui 👉 ${tick}\n\nE você será direcionado automaticamente para lá!`)
       .setFooter(`${serv.name} 🔥`)
       .setThumbnail("https://cdn.discordapp.com/attachments/796831755800936489/804147129026478151/GIF-210127_212322.gif")
       .setTimestamp());

          serv.channels.create(`Ticket • ${membro.user.username}┇${membro.id}`,{
            type: 'text',
            parent: '908671109799497760',
            permissionOverwrites:[
                {
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                    id: membro.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: serv.id
                }
            ]

        }).then(async ch => {
            ch.send(`<@${membro.id}>`, new Discord.MessageEmbed().setTitle("Boas vindas ao seu ticket").setDescription("Em alguns estantes um Developer ira lhe atender!").setColor("BLACK"));
        })

      }
    }}

*/

});












}
