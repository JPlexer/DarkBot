const Discord = require('discord.js');
const client = new Discord.Client();
const guilds = {};
const tinydate = require('tinydate');
const cmdhelp = require("./modules/cmdhelp.js")
const func = require("./modules/functions.js")
const prefix = func.prefix;
const usef = require("./modules/useful.js")
const nousef = require("./modules/nouseful.js")
const eval = require("./modules/evil.js")
const music = require("./modules/music.js")
const mod = require("./modules/mod.js")

client.on('ready', () => {
  console.log('Ready!')
  client.setInterval(setGamef, 30000, client);
  setGamef(client);
  usef.clstart();
});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
  //just some Variables
  const lc = message.content.toLowerCase();
  const args = message.content.split(' ').slice(1).join(" ");
  const args2 = message.content.split(' ').slice(1);
  const allowedRole = message.guild.roles.find("name", "darkbotadmin");
  const mute = message.guild.roles.find("name", "dbmuted");
  const time = tinydate('{DD}.{MM}.{YYYY} {HH}:{mm}:{ss}');

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

  if (lc.startsWith(`${prefix}ping`)) {
    usef.ping(message);

  }else if (lc.startsWith(`${prefix}help ping`)){
    cmdhelp.helpping(message);

  } else if (lc.startsWith(`${prefix}pong`)) {
    nousef.pong(message);

  }else if (lc.startsWith(`${prefix}help pong`)){
    cmdhelp.helppong(message);

  } else if (lc === `${prefix}help`) {
    usef.help(message);

  } else if (lc.startsWith(`${prefix}pizza`)) {
    nousef.pizza(message);

  }else if (lc.startsWith(`${prefix}help pizza`)){
    cmdhelp.helppizza(message);

  } else if (message.isMentioned(client.user)) {
    usef.clev(message);

  } else if (lc.startsWith(`${prefix}eval`)) {
    eval(client, message, args2);

  } else if (lc.startsWith(`${prefix}kick`)) {
    mod.kick(message, args2, time, allowedRole);

  }else if (lc.startsWith(`${prefix}help kick`)){
    cmdhelp.helpkick(message);

  } else if (lc.startsWith(`${prefix}ban`)) {
    mod.ban(message, args2, time, allowedRole);

  }else if (lc.startsWith(`${prefix}help ban`)){
    cmdhelp.helpban(message);

  } else if (lc.startsWith(`${prefix}mute`)) {
    mod.mute(message, args2, time, allowedRole, mute);

  }else if (lc.startsWith(`${prefix}help mute`)){
    cmdhelp.helpmute(message);

  } else if (lc.startsWith(`${prefix}tempmute`)) {
    mod.tempmute(message, args2, time, allowedRole, mute);

  }else if (lc.startsWith(`${prefix}help tempmute`)){
    cmdhelp.helptempmute(message);

  } else if (lc.startsWith(`${prefix}tempban`)) {
    mod.tempban(message, args2, time, allowedRole);

  }else if (lc.startsWith(`${prefix}help tempban`)){
    cmdhelp.helptempban(message);

  } else if (lc.startsWith(`${prefix}unmute`)) {
    mod.unmute(message, allowedRole, mute);

  }else if (lc.startsWith(`${prefix}help unmute`)){
    cmdhelp.helpunmute(message);

  } else if (lc.startsWith(`${prefix}report`)) {
    mod.report(message, args2, time);

  }else if (lc.startsWith(`${prefix}help report`)){
    cmdhelp.helpreport(message);

  } else if (lc.startsWith(`${prefix}warn`)) {
    mod.warn(message, args2, time, allowedRole)

  }else if (lc.startsWith(`${prefix}help warn`)){
    cmdhelp.helpwarn(message);

  } else if (lc.startsWith(`${prefix}sinfo`)) {
    mod.sinfo(message);

  }else if (lc.startsWith(`${prefix}help sinfo`)){
    cmdhelp.helpsinfo(message);

  } else if (lc.startsWith(`${prefix}play`)) {
    music.play(message, guilds, args);

  }else if (lc.startsWith(`${prefix}help play`)){
    cmdhelp.helpplay(message);

  } else if (lc.startsWith(`${prefix}skip`)) {
    music.skip(message, guilds);

  }else if (lc.startsWith(`${prefix}help skip`)){
    cmdhelp.helpskip(message);

  } else if (lc.startsWith(`${prefix}queue`)) {
    music.queue(message, guilds);

  }else if (lc.startsWith(`${prefix}help queue`)){
    cmdhelp.helpqueue(message);

  } else if (lc.startsWith(`${prefix}stop`)) {
    music.stop(message, guilds);

  }else if (lc.startsWith(`${prefix}help stop`)){
    cmdhelp.helpstop(message);

  } else if (lc.startsWith(`${prefix}clear`)) {
    music.clear(message, guilds);

  }else if (lc.startsWith(`${prefix}help clear`)){
    cmdhelp.helpclear(message);
  }
});