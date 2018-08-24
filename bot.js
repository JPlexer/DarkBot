const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot.io");
const prefix = "db:";
const botver = "v.0.0.1"
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
        embed.addField("Fun & Play Commands", `ping\npong\npizza\nhelp\nPing ${branch} at the beginning of a Message to chat with him`, true);
        embed.addField("Music Commands", "play\nskip\nstop\nclear\nqueue", true);
    
    
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
      guilds[message.guild.id].skipReq++;
      if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
        skip_song(message);
        message.reply(" dein Skip wurde angennommen! Skippe jetzt!");
      } else {
        message.reply(`${` dein Skip wurde angennommen, aber du brauchst **${Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)}` - skipReq}** Stimmen mehr!`);
      }
    } else {
      message.reply(" du hast schon abgestimmt zu Skippen");
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