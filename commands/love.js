exports.help = {
    name: "love",
    description: "Calculate love between two users",
    usage: "love <@user> <@user>",
    type: "fun"
};
exports.run = async(client, message, args) => {
    const discord = require("discord.js")
    const db = require("quick.db")
    if (!message.mentions.members.first()) return;
    let one = message.mentions.members.array()[0]
    let two = message.mentions.members.array()[1]
    if (!two) two = one
    let percentage = Math.floor(Math.random() * 100 - 1) + 1
    if (db.has(one.id + two.id)) percentage = db.get(one.id + two.id)
    db.set(one.id + two.id, percentage);
    const embed = new discord.MessageEmbed()
        .setTitle("LOVE CALCULATOR")
        .setDescription(`${one} loves ${two} this much -> **${percentage}%**`);

    if (percentage <= 35) embed.setColor("RED")
    if (percentage > 35 && percentage < 65) embed.setColor("BLUE")
    if (percentage >= 65) embed.setColor("GREEN")
    message.channel.send(embed)
}