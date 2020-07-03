const db = require("quick.db")
const Discord = require("discord.js")
exports.run = async(client, message) => {
    if (message.guild.id != "694556377095602196") return;
    if (message.channel.type == "dm") return;
    if (!db.has(message.guild.id + ".logchannel")) return;
    if (!message.guild.channels.cache.has(db.get(message.guild.id + ".logchannel"))) return;
    let embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("Deleted Message")
        .addFields({ name: "**Channel**", value: message.channel, inline: true }, { name: "**Author**", value: `${message.author} / ${message.author.tag}`, inline: true })
        .setFooter(`Message ID : ${message.id} | Message Author ID : ${message.author.id}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    if (message.attachments.first()) {
        embed.fields.unshift({ name: "**Attachments**", value: message.attachments.first().proxyURL, inline: true }, { name: "\u200b", value: "\u200b", inline: true })
    }
    if (message.content) {
        embed.fields.unshift({ name: "**Message**", value: message.content, inline: true }, { name: "\u200b", value: "\u200b", inline: true })
    }
    message.guild.channels.cache.get(db.get(message.guild.id + ".logchannel")).send(embed)
}