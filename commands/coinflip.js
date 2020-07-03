exports.help = {
    name: "coinflip",
    description: "Play coinflip and try to win some money",
    usage: "coinflip <money amount>",
    type: "economy"
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    const Discord = require("discord.js")
    if (!args[0]) return message.reply("you need to specify how much you want to coinflip")
    if (isNaN(args[0])) return message.reply("you need to specify how much you want to coinflip")
    if (db.get(message.guild.id + message.author.id + ".money") < args[0]) return message.reply("Insufficient funds.")
    db.subtract(message.guild.id + message.author.id + ".money", args[0]);
    let result = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    if (result == 1) {
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png" }))
            .setTitle(`${message.author.tag} won ${args[0]*2} in coinflip`)
            .setTimestamp()
            .setFooter(client.user.username);
        message.channel.send(embed)
        db.add(message.guild.id + message.author.id + ".money", args[0] * 2);
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png" }))
            .setTitle(`${message.author.tag} lost ${args[0]} in coinflip`)
            .setTimestamp()
            .setFooter(client.user.username);
        message.channel.send(embed)
    }

}