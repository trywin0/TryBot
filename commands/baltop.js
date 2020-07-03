exports.help = {
    name: "baltop",
    description: "Check the richest users in this server",
    usage: "baltop",
    type: "economy"
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    const Discord = require("discord.js")
    let guild = client.guilds.cache.get(message.guild.id);
    let scores = {};
    guild.members.cache.forEach(member => {
        if (member.user.bot) return;
        if (!db.has(message.guild.id + member.id + ".money")) db.set(message.guild.id + member.id + ".money", 0);
        if (!db.has(message.guild.id + member.id + ".bankmoney")) db.set(message.guild.id + member.id + ".bankmoney", 0)
        scores[member.user.username] = (db.get(message.guild.id + member.id + ".money") + db.get(message.guild.id + member.id + ".bankmoney"))
    })
    let tempArray = [];
    Object.keys(scores).forEach((name) => {
        tempArray.push([scores[name], name])
    });
    tempArray.sort(function(a, b) { return a[0] - b[0] });
    tempArray.reverse()
    let embed = new Discord.MessageEmbed().setColor("GREEN").setTitle(`Economy leaderboard`)
    let messageToSend = "";
    let i = 0;
    let total = 0;
    tempArray.forEach((user) => {
        i++;
        if (i > 10) return;
        total += user[0]
        messageToSend += `\n[${i}] ${user[1]}: $${Math.round(user[0])}`;
    });
    embed.setDescription(messageToSend)
    embed.setFooter(`Total: $${Math.round(total)}`)
    message.channel.send(embed)
}