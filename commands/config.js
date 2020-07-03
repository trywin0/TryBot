exports.help = {
    name: "config",
    description: "Configurate some bot settings",
    usage: "config <setting>",
    type: "mod",
    aliases: ["cfg"]
};
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you don't have permission to do that.")
    const db = require("quick.db")
    const Discord = require("discord.js")
    Object.prototype.sendEmbed = async(title, description, color) => {
        if (!color) color = "BLUE"
        const embed = new Discord.MessageEmbed().setTitle(title).setDescription(description).setColor(color)
        return await this.send(embed)
    }
    switch (args[0]) {
        case "autorole":
            if (args[1] == "set") {
                if (!message.guild.roles.cache.find(n => n.name.toLowerCase() == args.slice(2).join(" ").toLowerCase())) return message.channel.sendEmbed("INVALID ROLE", `There is no role in this server by the name of \`${args.slice(2).join(" ")}\``, "RED")
                if (db.has(message.guild.id + ".autorole")) db.push(message.guild.id + ".autorole", message.guild.roles.cache.find(n => n.name.toLowerCase() == args.slice(2).join(" ").toLowerCase()).id)
                if (!db.has(message.guild.id + ".autorole")) db.set(message.guild.id + ".autorole", [message.guild.roles.cache.find(n => n.name.toLowerCase() == args.slice(2).join(" ").toLowerCase()).id])
                message.channel.sendEmbed("SUCCESSFULLY ADDED ROLE", `Added role ${message.guild.roles.cache.find(n => n.name.toLowerCase() == args.slice(2).join(" ").toLowerCase())} to the autorole list (index ${db.get(message.guild.id+".autorole").length})`)
                message.guild.members.cache.forEach(m => m.roles.add(message.guild.roles.cache.find(n => n.name.toLowerCase() == args.slice(2).join(" ").toLowerCase())))
            } else if (args[1] == "show") {
                let rolelist = "This server doesn't have any autoroles configured"
                if (db.has(message.guild.id + ".autorole")) {
                    rolelist = ""
                    let autoroles = db.get(message.guild.id + ".autorole")
                    for (var i = 0; i < autoroles.length; i++) {
                        if (!message.guild.roles.cache.get(autoroles[i])) return message += `**[${i+1}]**: DELETED_ROLE`
                        rolelist += `**[${i+1}]**: ${message.guild.roles.cache.get(autoroles[i])}`
                    }
                    message.channel.sendEmbed("AUTOROLES", rolelist, "GREEN")
                }
            } else if (args[1] == "remove") {
                if (!db.has(message.guild.id + ".autorole")) return message.channel.sendEmbed("NO ROLES TO REMOVE", "This server doesn't have any auto roles configured", "RED")

            }
            break;
        default:
            message.channel.sendEmbed("INVALID SETTING", "You chose a invalid setting, type `config settings` to see all the settings", "RED")
            break;
    }
}