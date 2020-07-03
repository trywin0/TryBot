exports.help = {
    name: "help",
    description: "Shows this message!",
    usage: "help",
    type: "general",
    aliases: ["commands"]
};
exports.run = async(client, message, args) => {
        const Discord = require("discord.js");
        const fs = require("fs")
        let ownercommands = [];
        let generalcommands = [];
        let funcommands = [];
        let modcommands = [];
        let economycommands = [];
        let imgcommands = [];
        let nsfwcommands = [];
        fs.readdir("./commands/", (err, files) => {
                    if (err) return console.log(err);
                    files.forEach(file => {
                        if (!file.endsWith(".js")) return;
                        let command = client.commands.get(file.split(".js")[0])
                        if (!command) return;
                        if (!command.help) return;
                        if (command.help.type == "owner") ownercommands.push(file.split(".js")[0])
                        if (command.help.type == "general") generalcommands.push(file.split(".js")[0])
                        if (command.help.type == "fun") funcommands.push(file.split(".js")[0])
                        if (command.help.type == "mod") modcommands.push(file.split(".js")[0])
                        if (command.help.type == "economy") economycommands.push(file.split(".js")[0])
                        if (command.help.type == "img") imgcommands.push(file.split(".js")[0])
                        if (command.help.type == "nsfw") nsfwcommands.push(file.split(".js")[0])
                    });
                    let nsfw = ""
                    if (message.channel.nsfw) nsfw = "`" + nsfwcommands.join("` `") + "`"
                    if (!message.channel.nsfw) nsfw = "`Do this command in a nsfw channel to see`"
                    if (!args[0]) {
                        let helpembed = new Discord.MessageEmbed().setTitle(`${client.user.username}`)
                            .setDescription(`Type ${message.content.split("help")[0]}help <command name> for help with a certain command`)
                            .addField(`**General commands** [**${generalcommands.length}**]`, "`" + generalcommands.join("` `") + "`")
                            .addField(`**Fun commands** [**${funcommands.length}**]`, "`" + funcommands.join("` `") + "`")
                            .addField(`**Image manipulation commands** [**${imgcommands.length}**]`, "`" + imgcommands.join("` `") + "`")
                            .addField(`**NSFW commands** [**${nsfwcommands.length}**]`, nsfw)
                            .addField(`**Economy commands** [**${economycommands.length}**]`, "`" + economycommands.join("` `") + "`")
                            .addField(`**Moderation commands** [**${modcommands.length}**]`, "`" + modcommands.join("` `") + "`")
                            .addField(`**Bot owner commands** [**${ownercommands.length}**]`, "`" + ownercommands.join("` `") + "`")
                            .setFooter(`Command count : ${generalcommands.length+funcommands.length+modcommands.length+ownercommands.length+economycommands.length+imgcommands.length+nsfwcommands.length}`)
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor("BLUE")
                        message.channel.send(helpembed)
                    } else if (args[0]) {
                        let commandfile = client.commands.get(args[0].toLowerCase())
                        if (!commandfile) return message.reply("couldn't find that command")
                        let aliases = "None"
                        if (commandfile.help.type == "nsfw" && !message.channel.nsfw) return message.channel.send("That is a nsfw command and cannot be viewed in non nsfw channels")
                        if (commandfile.help.aliases) aliases = `\`${commandfile.help.aliases.join("`, `")}\``
            let helpembed = new Discord.MessageEmbed().setTitle(commandfile.help.name.charAt(0).toUpperCase() + commandfile.help.name.slice(1))
                .addField("**Description**", commandfile.help.description)
                .addField("**Usage**", commandfile.help.usage)
                .addField("**Command type**", commandfile.help.type.charAt(0).toUpperCase() + commandfile.help.type.slice(1))
                .addField("**Aliases**", aliases)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("BLUE")
            message.channel.send(helpembed)
        }
    })
}