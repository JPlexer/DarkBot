const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  description: "Functions for Basic Commands",
  getRandom: function () {
    if (arguments.length == 1) {
      if (typeof arguments[0] == Array) {
        var random = Math.floor(Math.random() * 1000) % arguments[0].length;
        return arguments[0][random];
      }
    } else {
      var random = Math.floor(Math.random() * 1000) % arguments.length;
      return arguments[random];
    }
  },
  setGame: function (client) {
      client.user.setActivity(this.getRandom(
        "mit der DarknessCrew",
        "JPlexer nerfen",
        "Dark Kid_HD nerfen",
        `${this.prefix}help`,
        `${this.botver}`,
        `${this.botver}`,
        `${this.prefix}help`), {
        type: "PLAYING"
      });
  },
  prefix: "why?",
  botver: "v.3.0.0",
  branch: "WhyBot",
}