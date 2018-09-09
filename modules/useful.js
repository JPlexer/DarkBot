const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
const cleverbot = require("cleverbot.io");
const clbot = new cleverbot(process.env.CL_USER, process.env.CL_TOKEN);
module.exports = {
    ping: function (message) {
        message.channel.send(`:ping_pong:Pong! Spiel doch nochmal c:`);
    },
    help: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`${functions.branch} Hilfe`);
        embed.setDescription(`Diese Commands kannst du mit dem ${functions.branch} benutzen. Tippe einfach ${functions.prefix}[command]! Für Hilfe bei einem Bestimmten Command gib ${functions.prefix}help [command] ein`);
        embed.addField("Spiel und Spaß Commands", `ping\npong\npizza\nhelp\nsinfo\nreport\nPing ${functions.branch} am Anfang um mit ihm zu schreiben`, true);
        embed.addField("Musik Commands", "play\nskip\nstop\nclear\nqueue", true);
        embed.addField("Mod Commands", "kick\nban\ntempban\nmute\ntempmute\nunmute\nwarn\npurge", true);
    
    
        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    clev: function (message, args) {
        clbot.create((err, session) => {
            clbot.ask(args, (err, response) => {
                message.channel.send(response)
            });
        });
    },
    clstart: function () {
        clbot.setNick(`${functions.branch}`);
    },
    purge: function(message, args2) {
        function purgg(){
        message.delete();

        if (!message.member.roles.find("name", "darkbotadmin")) { 
            message.channel.send('Das kannst du nicht machen!');
            return;
        }


        if (isNaN(args2[0])) {
                message.channel.send(`Bitte sage wieviele Nachrichten du löschen möchtest. \n Zum Beispiel: ${functions.prefix}purge 6 löscht 6 Nachrichten`);
       return;
        }

        const fetched = message.channel.fetchMessages({limit: args2[0]});

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));

    }

    purgg();

}
}