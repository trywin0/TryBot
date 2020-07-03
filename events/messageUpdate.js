const db = require("quick.db")
const Discord = require("discord.js")
exports.run = async(client, message, newM) => {
    if (message.guild.id != "694556377095602196") return;
    if (message.channel.type == "dm") return;
    if (!db.has(message.guild.id + ".logchannel")) return;
    if (!message.guild.channels.cache.has(db.get(message.guild.id + ".logchannel"))) return;
    if (message.content == newM.content) return;
    let newcontent = newM.content.split(" ")
    for (var i = 0; i < newcontent.length; i++) {
        if (newcontent[i] != message.content.split(" ")[i]) newcontent[i] = "__" + newcontent[i] + "__"
    }
    const embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("Edited Message")
        .setDescription(`[Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
        .addFields({ name: "**Old Message**", value: message.content, inline: true }, { name: "\u200b", value: "\u200b", inline: true }, { name: "**New Message**", value: newcontent.join(" "), inline: true }, { name: "**Channel**", value: message.channel, inline: true }, { name: "\u200b", value: "\u200b", inline: true }, { name: "**Author**", value: `${message.author} / ${message.author.tag}`, inline: true })
        .setFooter(`Message ID : ${message.id} | Message Author ID : ${message.author.id}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    message.guild.channels.cache.get(db.get(message.guild.id + ".logchannel")).send(embed)
}