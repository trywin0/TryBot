exports.help = {
    name: "balance",
    description: "Check how much money you or another user has",
    usage: "balance <@user>",
    type: "economy",
    aliases: ["bal", "money"]
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    const Discord = require("discord.js")
    let user = message.mentions.users.first() || message.author;
    if (!db.has(message.guild.id + user.id + ".money")) db.set(message.guild.id + user.id + ".money", 0);
    if (!db.has(message.guild.id + user.id + ".bankmoney")) db.set(message.guild.id + user.id + ".bankmoney", 0);
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
        .setTitle(`${user.username}'s balance`)
        .addFields({ name: "**Wallet**", value: `$${db.get(message.guild.id+user.id+".money")}`, inline: true }, { name: "**Bank**", value: `$${db.get(message.guild.id+user.id+".bankmoney")}`, inline: true })
        .setTimestamp()
        .setFooter(client.user.username);
    message.channel.send(embed)
}