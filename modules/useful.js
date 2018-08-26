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
        embed.setDescription(`Diese Commands kannst du mit dem ${functions.branch} benutzen. Tippe einfach ${functions.prefix}[command] Für Hilfe bei einem Bestimmten Command gib ${functions.prefix}help [command] ein`);
        embed.addField("Spiel und Spaß Commands", `ping\npong\npizza\nhelp\nsinfo\nreport\nPing ${functions.branch} am Anfang um mit ihm zu schreiben`, true);
        embed.addField("Musik Commands", "play\nskip\nstop\nclear\nqueue", true);
        embed.addField("Mod Commands", "kick\nban\ntempban\nmute\ntempmute\nunmute\nwarn", true);
    
    
        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    clev: function (message) {
        clbot.create((err, session) => {
            clbot.ask(message.content, (err, response) => {
                message.channel.send(response)
            });
        });
    },
    clstart: function () {
        clbot.setNick(`${functions.branch}`);
    },
}