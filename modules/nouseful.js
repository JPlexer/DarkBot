const Discord = require('discord.js');
module.exports = {
    pong: function (message) {
        message.channel.send(`:ping_pong:Ping! Spiel doch nochmal c:`);
    },
    pizza: function (message) {
        message.channel.send('Hier ist deine Darktastische Pizza! :pizza: ')
    },
}