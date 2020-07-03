exports.help = {
    name: "addfunds",
    description: "Cheat some money for someone",
    usage: "addfunds <@user> <money amount>",
    type: "economy"
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    const Discord = require("discord.js")
    let mentionedUser = message.mentions.users.first();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Insufficient permissions.");
    let user = mentionedUser || message.author
    if (!args[0]) return message.reply("you need to specify how much money you want to give that user")
    if (mentionedUser && !args[1] || mentionedUser && isNaN(args[1])) return message.reply("you need to specify how much you want to coinflip and who you want to add it to")
    if (!mentionedUser && isNaN(args[0]) || mentionedUser && isNaN(args[1])) return message.reply("you need to specify how much you want to coinflip and who you want to add it to")
    let amount = args[1];
    if (!mentionedUser) amount = args[0]
    db.add(message.guild.id + user.id + ".money", amount)
    message.channel.send(`Added $${amount} to ${user.tag}'s wallet`)
}