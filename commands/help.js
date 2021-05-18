const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "This displays all of my commands!",
    async execute(message, args) {
        return message.channel.send({
            embed: {
                color: '#FFFF00',
                description: `**Here are my commands:**\n`
                    + `\`ss!help\` - Displays this help menu.\n`
                    + `\`ss!start\` - Starts a new game of Simon Says.\n`
                // Add this line for each new command you want
                // + `\`L:command\` - Command Description.\n`
                ,
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                },
                footer: {
                    text: `Support: DM Kermit#3000`
                }
            }
        });
    }
}