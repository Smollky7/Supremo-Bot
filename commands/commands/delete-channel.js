module.exports = {
  commands: ['deletechannel', 'delchannel'],
  maxArgs: 0,
  permissionError: 'Você deve ser um administrador para usar este comando.',
  permissions: 'ADMINISTRATOR',
  description: 'Apaga o canal atual.',
  callback: (message, arguments, text) => {
    message.delete()
 if(!message.channel.name.includes("ticket-")){
      message.channel.send(`${message.author} esse canal não pode ser deletado.`).then(msg => {
        msg.delete({timeout: 5000})
      })
} else {
        let c = 0
message.channel.send(`${message.channel.name} será apagado em ${c} segundos.`).then(msg => {
 let m = 0
  while(m != 80) {
    
    let c = 0
  
  while(c != 60){
    c ++
    msg.edit(`${message.channel.name} será apagado em ${c} segundos.`)
  }
   console.log(m)
  m ++
  }
  message.channel.delete()
})
    
    }
   
  },
}
