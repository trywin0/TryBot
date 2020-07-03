exports.help = {
    name: "leaderboard",
    description: "Get the highest leveled users in this server",
    usage: "leaderboard",
    type: "fun",
    aliases: ["levels"]
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    const Discord = require("discord.js")
    let guild = client.guilds.cache.get(message.guild.id);
    let scores = {};
    guild.members.cache.forEach(member => {
        if (db.get(message.guild.id + member.id + ".lvl") === NaN || db.get(message.guild.id + member.id + ".lvl") === undefined) return;
        scores[member.user.username] = [db.get(message.guild.id + member.id + ".lvl"), db.get(message.guild.id + member.id + ".xp")]
    })
    let tempArray = [];
    Object.keys(scores).forEach((name) => {
        tempArray.push([scores[name], name])
    });
    tempArray.sort((a, b) => { return a[0][0] - b[0][0] || a[0][1] - b[0][1] });
    tempArray.reverse()
    let embed = new Discord.MessageEmbed().setColor("GREEN").setTitle(`Level leaderboard`)
    let messageToSend = "";
    let i = 0;
    let total = 0;
    console.log(scores)
    tempArray.forEach((user) => {
        i++;
        if (i > 10) return;
        total += user[0]
        messageToSend += `\n[${i}] ${user[1]}: level ${Math.floor(user[0][0])}`;
    });
    embed.setDescription(messageToSend)
    message.channel.send(embed)
}