const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot.io");
const prefix = "db:";
const botver = "v.0.0.2"
const branch = "DarkBot"
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const yt_api_key = process.env.YT_TOKEN;
const clbot = new cleverbot(process.env.CL_USER, process.env.CL_TOKEN);
const guilds = {};

global.getRandom = function (...args) {
  if (args.length == 1) {
    if (typeof args[0] == Array) {
      var random = Math.floor(Math.random() * 1000) % args[0].length;
      return args[0][random];
    }
  } else {
    var random = Math.floor(Math.random() * 1000) % args.length;
    return args[random];
  }
}

function setGame() {
  client.user.setActivity(getRandom(
    "mit der DarknessCrew",
    "JPlexer nerfen",
    "Dark Kid_HD nerfen",
    `${prefix}help`,
    `${botver}`,
    `${botver}`,
    `${prefix}help`), {
    type: "PLAYING"
  });
}

client.on('ready', () => {
  console.log('Ready!')
  client.setInterval(setGame, 30000);
  setGame();
  clbot.setNick(`${branch}`);
});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
    //just some Variables
    const lc = message.content.toLowerCase();
    const args = message.content.split(' ').slice(1).join(" ");
    const messageArray = message.content.split(" ");
    const args2 = messageArray.slice(1);

    if (!guilds[message.guild.id]) {
        guilds[message.guild.id] = {
          queue: [],
          queueNames: [],
          isPlaying: false,
          dispatcher: null,
          voiceChannel: null,
          skipReq: 0,
          skippers: []
        };
      }

      if (lc === `${prefix}ping`) {
        message.channel.send(`:ping_pong:Pong! Spiel doch nochmal c:`);

      }else if (lc === `${prefix}pong`) {
            message.channel.send(`:ping_pong:Ping! Spiel doch nochmal c:`);

      }else if (lc === `${prefix}help`) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`${branch} Help`);
        embed.setDescription(`Diese Commands kannst du mit dem ${branch} benutzen. Tippe einfach ${prefix}[command]`);
        embed.addField("Spiel und Spaß Commands", `ping\npong\npizza\nhelp\nsinfo\nreport\nPing ${branch} am Anfang um mit ihm zu schreiben`, true);
        embed.addField("Musik Commands", "play\nskip\nstop\nclear\nqueue", true);
        embed.addField("Mod Commands", "kick\nban", true);
    
    
        embed.setFooter(`${branch} von JPlexer und der #DarknessCrew ${botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    } else if (lc === `${prefix}pizza`) {
        message.channel.send('Hier ist deine Darktastische Pizza! :pizza: ')

} else if (message.isMentioned(client.user)) {
    clbot.create((err, session) => {
      clbot.ask(message.content, (err, response) => {
        message.channel.send(response)
      });
    });

}else if (lc === `${prefix}kick`) {
    var kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    var kReason = args2.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    var kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Gekickter User", `${kUser} mit der ID ${kUser.id}`)
    .addField("Gehickt von", `<@${message.author.id}> mit der ID ${message.author.id}`)
    .addField("Gekicket in", message.channel)
    .addField("Zeit", message.createdAt)
    .addField("Grund", kReason);

    var kickChannel = message.guild.channels.find(`name`, "verwahnungen");
    if(!kickChannel) return message.channel.send("Kann den Verwahnungs Channel nicht finden!");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;

}else if (lc === `${prefix}ban`) {
    var bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    var bReason = args2.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    var banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Gebannter Nutzer", `${bUser} mit der ID ${bUser.id}`)
    .addField("Gebannt Von", `<@${message.author.id}> mit der ID ${message.author.id}`)
    .addField("Gebannt in", message.channel)
    .addField("Zeit", message.createdAt)
    .addField("Grund", bReason);

    var incidentchannel = message.guild.channels.find(`name`, "verwahnungen");
    if(!incidentchannel) return message.channel.send("Kann den Verwahnungs Channel nicht finden!");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


return;

}else if (lc === `${prefix}report`) {
    var rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    var rreason = args2.join(" ").slice(22);

    var reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("#15f153")
    .addField("Reporteter User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reportet von", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Zeit", message.createdAt)
    .addField("Grund", rreason);

    var reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Kann den Report Channel nicht finden!");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

return;

}else if (lc === `${prefix}sinfo`) {
    var sicon = message.guild.iconURL;
    var serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Gemacht Am", message.guild.createdAt)
    .addField("Du bist gejoint am", message.member.joinedAt)
    .addField("User auf dem Server", message.guild.memberCount);

return message.channel.send(serverembed);

} else if (lc.startsWith(`${prefix}play`)) {
    if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        getID(args, id => {
          add_to_queue(id, message);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            message.reply(` **${title}** wurde zur Warteschlange hinzugefügt!`);
            guilds[message.guild.id].queueNames.push(title);
          });
        });
      } else {
        isPlaying = true;
        getID(args, id => {
          guilds[message.guild.id].queue.push(id);
          playMusic(id, message);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            guilds[message.guild.id].queueNames.push(title);

            message.reply(` **${title}** wird jetzt Abgespielt!`);
          })
        });
      }
    } else {
      message.reply(" du musst in einem Voice Channel sein!");
    }
  } else if (lc.startsWith(`${prefix}skip`)) {
    if (!guilds[message.guild.id].skippers.includes(message.author.id)) {
      guilds[message.guild.id].skippers.push(message.author.id);
        skip_song(message);
        message.reply(" dein Skip wurde angennommen! Skippe jetzt!");
      }

  } else if (lc.startsWith(`${prefix}queue`)) {
    let message2 = "```";
    for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
      const temp = `${i + 1}: ${guilds[message.guild.id].queueNames[i]}${i === 0? "**(Current Song)***" : ""}\n`;
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else if (guilds[message.guild.id].queue.length === 0) {
        message.channel.send("Da ist nichts in der Warteschlange!")
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);

  } else if (lc === `${prefix}stop`) {
    stop_song(message);
    message.reply(' die Musik wurde gestoppt')

  } else if (lc.startsWith(`${prefix}clear`)) {
    guilds[message.guild.id].queue = [guilds[message.guild.id].queue.slice(0, 1)];
    guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames.slice(0, 1)];
    message.reply(" die Warteschlange wurde gereinigt!");
  }
});


function skip_song({
  guild
}) {
  guilds[guild.id].dispatcher.end();
}

function stop_song({
  guild
}) {
  guilds[guild.id].queue.length = 0;
  guilds[guild.id].dispatcher.end();
}


function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



  guilds[message.guild.id].voiceChannel.join().then(connection => {
    stream = ytdl(`https://www.youtube.com/watch?v=${id}`, );
    guilds[message.guild.id].skipReq = 0;
    guilds[message.guild.id].skippers = [];

    guilds[message.guild.id].dispatcher = connection.playStream(stream);
    guilds[message.guild.id].dispatcher.on('end', () => {
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];
      guilds[message.guild.id].queue.shift();
      guilds[message.guild.id].queueNames.shift();
      if (guilds[message.guild.id].queue.length === 0) {
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].newsongs = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].voiceChannel.leave();
      } else {
        setTimeout(() => {
          playMusic(guilds[message.guild.id].queue[0], message);
        }, 500)
      }
    })
  });
}

function getID(str, cb, message) {
  if (isYoutube(str)) {
    cb(getYouTubeID(str));
  } else {
    search_video(str, id => {
      cb(id);
    });
  }
}

function add_to_queue(strID, {
  guild
}) {
  if (isYoutube(strID)) {
    guilds[guild.id].queue.push(getYoutubeID(strID));
  } else {
    guilds[guild.id].queue.push(strID);
  }
}

function isYoutube(str) {
  return str.toLowerCase().includes("youtube.com");
}

function search_video(query, callback) {
  request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
    const json = JSON.parse(body);
    if (!json.items[0]) callback("3_-a9nVZYjk");
    else {
      callback(json.items[0].id.videoId);
    }
  });
}
