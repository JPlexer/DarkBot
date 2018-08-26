const ms = require("ms");
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    kick: function(message, args2, time, allowedRole){
    var kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    var kReason = args2.join(" ").slice(22);
    if (kReason === "") {kReason = "undefiniert"};
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
    if(kUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gekickt werden!");

    var kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#00FFFB")
    .addField("Gekickter User", `${kUser} mit der ID ${kUser.id}`)
    .addField("Gekickt von", `<@${message.author.id}> mit der ID ${message.author.id}`)
    .addField("Gekicket in", message.channel)
    .addField("Zeit", time())
    .addField("Grund", kReason);

    var kickChannel = message.guild.channels.find(`name`, "verwarnungen");
    if(!kickChannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
    },
    ban: function(message, args2, time, allowedRole){
        var bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    var bReason = args2.join(" ").slice(22);
    if (bReason === "") {bReason = "undefiniert"};
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
    if(bUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gebannt werden!");

    var banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#00FFFB")
    .addField("Gebannter Nutzer", `${bUser} mit der ID ${bUser.id}`)
    .addField("Gebannt Von", `<@${message.author.id}> mit der ID ${message.author.id}`)
    .addField("Gebannt in", message.channel)
    .addField("Zeit", time())
    .addField("Grund", bReason);

    var incidentchannel = message.guild.channels.find(`name`, "verwarnungen");
    if(!incidentchannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


return;
    },
    mute: function(message, args2, time, allowedRole, mute){
        var mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!mUser) return message.channel.send("Can't find user!");
    var mReason = args2.join(" ").slice(22);
    if (mReason === "") {mReason = "undefiniert"};
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
    if(mUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gemutet werden!");

    message.guild.channels.forEach( (channel, id) => {
      channel.overwritePermissions(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    });
    message.guild.member(mUser).addRole(mute)
    var muteEmbed = new Discord.RichEmbed()
    .setDescription("Mute")
    .setColor("#00FFFB")
    .addField("Gemuteter User", `${mUser} mit der ID ${mUser.id}`)
    .addField("Gemutet von", `<@${message.author.id}> mit der ID ${message.author.id}`)
    .addField("Gemutet in", message.channel)
    .addField("Zeit", time())
    .addField("Grund", mReason);

    var muteChannel = message.guild.channels.find(`name`, "verwarnungen");
    if(!muteChannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");
    muteChannel.send(muteEmbed);
    return;
    },
    tempmute: function(message, args2, time, allowedRole, mute){
        var tmUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tmUser) return message.channel.send("Can't find user!");
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
    if(tmUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gemutet werden!");

  let mutetime = args2[1];
  if(!mutetime) return message.reply("Du hast keine Zeit angegeben!");

    message.guild.channels.forEach( (channel, id) => {
      channel.overwritePermissions(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    });
  message.guild.member(tmUser).addRole(mute)
  var tmuteEmbed = new Discord.RichEmbed()
  .setDescription("TempMute")
  .setColor("#00FFFB")
  .addField("Gemuteter User", `${tmUser} mit der ID ${tmUser.id}`)
  .addField("Gemutet von", `<@${message.author.id}> mit der ID ${message.author.id}`)
  .addField("Gemutet in", message.channel)
  .addField("Zeit", time())
  .addField("Länge", `${ms(ms(mutetime))}` );

  var tmuteChannel = message.guild.channels.find(`name`, "verwarnungen");
  if(!tmuteChannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");
  tmuteChannel.send(tmuteEmbed);
  setTimeout(function(){
    tmUser.removeRole(mute);
    tmuteChannel.send(`<@${tmUser.id}> wurde Entmutet!`);
}, ms(mutetime));
    },
    tempban: function(message, args2, time, allowedRole){
        var tbUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tbUser) return message.channel.send("Can't find user!");
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
    if(tbUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gebannt werden!");

  let bantime = args2[1];
  if(!bantime) return message.reply("Du hast keine Zeit angegeben!");

  message.guild.member(tbUser).ban();
  var tbanEmbed = new Discord.RichEmbed()
  .setDescription("TempBan")
  .setColor("#00FFFB")
  .addField("Gebannter User", `${tbUser} mit der ID ${tbUser.id}`)
  .addField("Gebannt von", `<@${message.author.id}> mit der ID ${message.author.id}`)
  .addField("Gebannt in", message.channel)
  .addField("Zeit", time())
  .addField("Länge", `${ms(ms(bantime))}` );

  var tbanChannel = message.guild.channels.find(`name`, "verwarnungen");
  if(!tbanChannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");
  tbanChannel.send(tbanEmbed);
  setTimeout(function(){
    message.guild.unban(tbUser);
    tbanChannel.send(`<@${tbUser.id}> wurde Entbannt!`);
}, ms(bantime));
    },
    unmute: function(message, allowedRole, mute){
        var umUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!umUser) return message.channel.send("Can't find user!");
    if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");

    var umuteChannel = message.guild.channels.find(`name`, "verwarnungen");
    if(!umuteChannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");

    message.guild.member(umUser).removeRole(mute);
    umuteChannel.send(`<@${umUser.id}> wurde Entmutet!`);

    return;
    },
    report: function(message, args2, time){
        var rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        var rreason = args2.join(" ").slice(22);
        if (rreason === "") {rreason = "undefiniert"};
    
        var reportEmbed = new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#00FFFB")
        .addField("Reporteter User", `${rUser} mit der ID ${rUser.id}`)
        .addField("Reportet von", `${message.author} mit der ID ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Zeit", time())
        .addField("Grund", rreason);
    
        var reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Kann den Report Channel nicht finden!");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
    return;
    },
    warn: function(message, args2, time, allowedRole){
        var wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.channel.send("Couldn't find user.");
        if(!message.member.roles.has(allowedRole.id)) return message.channel.send("Du kannst das nicht machen!");
        if(wUser.roles.has(allowedRole.id)) return message.channel.send("Die Person kann nicht gewarnt werden!");
        var wreason = args2.join(" ").slice(22);
        if (wreason === "") {wreason = "undefiniert"};
      
        var warnEmbed = new Discord.RichEmbed()
        .setDescription("Warnung")
        .setColor("#00FFFB")
        .addField("Gewarnter User", `${wUser} mit der ID ${wUser.id}`)
        .addField("Gewarnt von", `${message.author} mit der ID ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Zeit", time())
        .addField("Grund", wreason);
      
        var rerportschannel = message.guild.channels.find(`name`, "verwarnungen");
        if(!rerportschannel) return message.channel.send("Kann den Verwarnungs Channel nicht finden!");
      
      
        rerportschannel.send(warnEmbed);
      
      return;
    },
    sinfo: function(message){
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
    }
}