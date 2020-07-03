exports.help = {
    name: "f",
    description: "F, pay respects to someone",
    usage: "f <@user>",
    type: "fun"
};
exports.run = async(client, message, args) => {
    let user = message.mentions.members.first() || args.join(" ")
    if (!user) return message.reply("you have to mention / say who you want to pay respects for")
    const Discord = require("discord.js")
    let count = 0;
    let embed = new Discord.MessageEmbed()
        .setTitle(`Pay respects for ${user}`)
        .setDescription("Press 🇫 to pay respects \n \n" + `${count} people have paid their respects`);
    let msg = await message.channel.send(embed)
    msg.react("🇫")
    let collector = msg.createReactionCollector(m => m, {})
    collector.on("collect", (reaction, usere) => {
        count = reaction.count - 1
        embed = new Discord.MessageEmbed()
            .setTitle(`Pay respects for ${user}`)
            .setDescription("Press 🇫 to pay respects \n \n" + `${count} people have paid their respects`);
        msg.edit(embed)
    })
    collector.on("remove", (reaction, usere) => {
        console.log(reaction)
    })

}