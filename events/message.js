const db = require("quick.db")
const fs = require("fs")
const Discord = require("discord.js")
const config = require("../config.json")
const { cpu } = require("systeminformation")
exports.run = async(client, message) => {
    if (message.channel.type == "dm") return;
    // if (message.guild.id == "496015517648289792" && message.channel.id != "717837491456966799") return;

    function resetCommand(command) {
        if (!client.commands.get(command)) return;
        delete require.cache[require.resolve(`../commands/${command}.js`)]
        client.commands.delete(command)
        const pull = require(`../commands/${command}.js`)
        client.commands.set(command, pull)
    }
    let prefix = config.prefix
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        let ran = false
        let messageArray = message.content.split(" "),
            cmd = messageArray[0].split(prefix)[1],
            args = messageArray.slice(1);
        for (var i = 0; i < client.commands.size; i++) {
            let iCommand = client.commands.get(Array.from(client.commands.keys())[i])
            if (iCommand) {
                if (iCommand.help) {
                    if (iCommand.help.aliases) {

                        if (iCommand.help.aliases.includes(cmd) && !ran) {
                            ran = true
                            resetCommand(iCommand.help.name)
                            let commandfile = client.commands.get(iCommand.help.name);
                            if (!commandfile.cooldowns) commandfile.cooldowns = new Map()
                            if (commandfile.cooldowns.get(message.author.id) == true) return message.channel.send("Please wait until doing this command again")
                            commandfile.cooldowns.set(message.author.id, true)
                            if (!commandfile.help.cooldown) commandfile.help.cooldown = 3
                            console.log(commandfile.cooldowns)
                            setTimeout(() => {
                                commandfile.cooldowns.set(message.author.id, false)
                            }, commandfile.help.cooldown * 1000);

                            commandfile.run(client, message, args)
                        }
                    }
                }
            }
        }
        if (client.commands.has(cmd)) {

            resetCommand(cmd)
            let commandfile = client.commands.get(cmd);
            console.log(!commandfile.cooldowns)

            if (!commandfile.cooldowns) commandfile.cooldowns = new Map()
            console.log(!commandfile.cooldowns)
            console.log(commandfile.cooldowns.get(message.author.id) == true)
            if (commandfile.cooldowns.get(message.author.id) == true) return message.channel.send("Please wait until doing this command again")
            commandfile.cooldowns.set(message.author.id, true)
            if (!commandfile.help.cooldown) commandfile.help.cooldown = 3
            console.log(commandfile.help.cooldown * 1000)
            setTimeout(() => {
                commandfile.cooldowns.set(message.author.id, false)
                console.log("took 5 sec")
            }, commandfile.help.cooldown * 1000);
            console.log(commandfile.cooldowns.get(message.author.id) == true)
            commandfile.run(client, message, args)
        }
    } else {
        if (message.guild.id != "694556377095602196") return;
        if (message.guild.id == "566324171228053525") return;
        if (message.content == `<@${client.user.id}> help`) message.reply(`the prefix for this server is \`${prefix}\`, type \`${prefix}help\` for help`)
        if (!db.has(message.guild.id + message.author.id + ".xp") || !db.has(message.guild.id + message.author.id + ".lvl")) {
            db.set(message.guild.id + message.author.id + ".xp", 0)
            db.set(message.guild.id + message.author.id + ".lvl", 0)
        }
        if (!db.has(message.guild.id + message.author.id + ".time")) {
            db.set(message.guild.id + message.author.id + ".time", new Date().getTime())
        }
        if (new Date().getTime() - parseInt(db.get(message.guild.id + message.author.id + ".time")) > 60000 || !db.has(message.guild.id + message.author.id + '.time')) {
            db.add(message.guild.id + message.author.id + '.xp', Math.round(Math.random() * 15))
            db.add(message.guild.id + message.author.id + ".money", 10)
            db.set(message.guild.id + message.author.id + ".time", new Date().getTime())
            if (db.get(message.guild.id + message.author.id + '.xp') >= Math.round(5 * (db.get(message.guild.id + message.author.id + '.lvl') ^ 2) + 50 * db.get(message.guild.id + message.author.id + '.lvl') + 100)) {
                db.add(message.guild.id + message.author.id + '.lvl', 1)
                db.set(message.guild.id + message.author.id + '.xp', 0)
                let lvlEmbed = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, format: "png" }))
                    .setColor("BLUE")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`${message.author.tag} is now level ${db.get(message.guild.id+message.author.id+".lvl")}!`);
                message.channel.send(lvlEmbed)
            }
        }

    }
}