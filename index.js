require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in with ${client.user.username}#${client.user.discriminator}`);
    client.user.setActivity('Simon Says!').catch(console.error);
});

client.on('message', message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    try {
        command.execute(message, args, client)
    } catch (error) {
        console.error(error);
        message.reply('error message here')
    }
});

client.on('message', async (message) => {
    if (message.mentions.has(client.user)) {
        if (message.author.bot) {
            return
        }
        if (message.webhookID) {
            return
        }
        if (message.content.includes('@everyone')) {
            return
        }
        if (message.content.includes('@here')) {
            return
        }
        client.commands.get('help').execute(message, client);
    }
});

client.login(process.env.TOKEN);