// MODULE
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
//

// NEW CLIENT ( les deux pour pas ce prendre la tête )
const client = new Discord.Client();
const bot = new Discord.Client();
//

// BOT INFO
const version = "V.0.0.1"
const PREFIX = "!"
const botname = "Gros cul"
//

// Audio
const servers = {};
const queue = new Map();

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}
//

// Quand le bot est start
bot.on("ready", function () {
    bot.user.setActivity("Surveille le serveur", {
        'type': 'STREAMING',
        'url': "https://www.twitch.tv/nouillade"
}),
    bot.user.setUsername("Gros cul")
//   bot.user.setStatus("dnd")
    console.log("Gros cul - Connecté");
});
//

// Le code avec toute les commandes, tout sera bientôt séparer un plusieurs fichiers parce que +1000 ça pique un peut !   
bot.on("message", async function(message) {  
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var foother = "Demande de @" + message.author.username + "#" + message.author.discriminator + " ! | GrosCul - " + version

    var footheren = "Request by @" + message.author.username + "#" + message.author.discriminator + " ! | GrosCul - " + version
    
    var user = message.mentions.users.first();
  
    switch (args[0].toLowerCase()) {
        case "join":
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message) 
            });
        break;
        
        case "accept":
            if(message.member.roles.cache.find(r => r.name === "᚜👨‍✈️᚛ Recruteur")) {
            var member = message.mentions.users.first();
            if (message.mentions.users.size < 1) return message.channel.send("T'as oublié la mention fdp")
            message.channel.send(member.toString() + " a bien été accepté. ✅")
            member.addRole(r => r.name === "acc");
        } else { 
          message.channel.send("fdp") 
        }
        break;
        
        case "refuse":
        if(message.member.roles.cache.find(r => r.name === "᚜👨‍✈️᚛ Recruteur")) {
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.channel.send("T'as oublié la mention fdp")
            message.channel.send(member.toString() + " a bien été refusé. ✅")
            member.addRole(r => r.name === "ref")
        } else { 
          message.channel.send("fdp") 
        }
        break;
      /*  case "majinfo":
                if (message.author.id === "193092758267887616") {
                        var maj_embed = new Discord.RichEmbed()
                        .setAuthor("FIX " + version, message.author.avatarURL)
                            .addField("Gros Fix", `Comme vous aurez pu le constater le bot étais down depuis quelque jour ! Et aujourd'hui il est`)
                        .setColor("#00FF6F")
                        .setFooter("Pourquoi de l'espagnol ? Parce que un/des espagnol sont sur des servuers ou le bot est ( serveur anglais d'ou anglais aussi) ! " + version)
                        .setThumbnail(message.author.avatarURL)
                        .setTimestamp()
                    bot.channels.findAll('name', 'bot-update').map(channel => channel.send(maj_embed));
                    message.delete()
                }
        break; */
    }
});

bot.login(process.env.SECRET);
