const ms = require('ms');

module.exports = {
  commands: ['startgiveaway'],
  minArgs: 1,
  maxArgs: 1,
  description: " ",
  permission: 'ADMINISTRATORS',
  callback: async (message, arguments) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Especifique alguΓ©m para carregar puniΓ§Γ΅es por.')
      return
    }

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!');
    }
    let giveawayDuration = args[1];
    
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }
    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }
    let giveawayPrize = args.slice(3).join(' ');

    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    client.giveawaysManager.start(giveawayChannel, {

        time: ms(giveawayDuration),
  
        prize: giveawayPrize,

        winnerCount: parseInt(giveawayNumberWinners),

        hostedBy: client.config.hostedBy ? message.author : null,

        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"ππ **GIVEAWAY** ππ",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"ππ **GIVEAWAY ENDED** ππ",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with π to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);
    
  },
}
