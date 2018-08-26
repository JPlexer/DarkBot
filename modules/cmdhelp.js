const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
module.exports = {
    helpping: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Ping Hilfe`);
        embed.setDescription(`Sendet dir eine nette Nachricht`);
        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helppong: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Pong Help`);
        embed.setDescription(`Sendet dir eine nette Nachricht`);
        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helppizza: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Pizza Hilfe`);
        embed.setDescription(`Gibt dir eine Pizza`);
        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpkick: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Kick Hilfe`);
        embed.setDescription(`Kickt einen User (Nur für Mods)`);
        embed.addField("Benutzung", `(kick @JPlexer Böses Wort\n(kick @JPlexer`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpban: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Ban Hilfe`);
        embed.setDescription(`Bannt einen User (Nur für Mods)`);
        embed.addField("Benutzung", `(ban @JPlexer Wiederholt Böse Wörter\n (ban @JPlexer`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Mute Hilfe`);
        embed.setDescription(`Mutet einen User (Nur für Mods)`);
        embed.addField("Benutzung", `(mute @JPlexer Spam\n (mute @JPlexer`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helptempmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`TempMute Hilfe`);
        embed.setDescription(`Mutet einen User für eine Bestimmte Zeit (Nur für Mods)`);
        embed.addField("Benutzung", `(tempmute @JPlexer 1m\n (tempmute @JPlexer 2H`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helptempban: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`TempBan Hilfe`);
        embed.setDescription(`Bannt einen User für eine Bestimmte Zeit (Nur für Mods)`);
        embed.addField("Benutzung", `(tempban @JPlexer 1m\n (tempban @JPlexer 2H`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpunmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`UnMute Hilfe`);
        embed.setDescription(`Entmutet einen User (Nur für Mods)`);
        embed.addField("Benutzung", `(unmute @JPlexer`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpreport: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Report Hilfe`);
        embed.setDescription(`Reportet einen User an die Detektive`);
        embed.addField("Benutzung", `(report @JPlexer Ich Glaube er ist ein Alt von Jemandem der Gebannt ist!`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpwarn: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Warn Hilfe`);
        embed.setDescription(`Warnt einen User (Nur für Mods)`);
        embed.addField("Benutzung", `(warn @JPlexer Spam`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpsinfo: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`SInfo Hilfe`);
        embed.setDescription(`Zeigt info's über den Server`);
        embed.addField("Benutzung", `(sinfo`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpplay: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Play Hilfe`);
        embed.setDescription(`Spiele Musik ab`);
        embed.addField("Benutzung", `(play Xenogenisis\n(play https://www.youtube.com/watch?v=DLzxrzFCyOs`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpskip: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Skip Hilfe`);
        embed.setDescription(`Überspringt ein Lied`);
        embed.addField("Benutzung", `(skip`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpqueue: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Queue Hilfe`);
        embed.setDescription(`Zeigt das jetzige Lied und alle dannach an`);
        embed.addField("Benutzung", `(queue`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpstop: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Stop Hilfe`);
        embed.setDescription(`Stoppt alle Lieder`);
        embed.addField("Benutzung", `(stop`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpclear: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Clear Hilfe`);
        embed.setDescription(`Löscht alle Lieder aus der Warteliste ausser das Lied was gerade Läuft`);
        embed.addField("Benutzung", `(clear`, true);

        embed.setFooter(`${functions.branch} von JPlexer und der #DarknessCrew ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
}