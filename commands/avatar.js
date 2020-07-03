exports.help = {
    name: "avatar",
    description: "Get the specified user's avatar",
    usage: "avatar <@user>",
    type: "general",
    aliases: ["av"]
};
exports.run = async(client, message, args) => {
    const Discord = require("discord.js");
    const user = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
        .setTitle(`${user.user.username}'s avatar`)
        .setImage(user.user.displayAvatarURL({ dynamic: true }))
        .setFooter(user.user.tag)
        .setColor(`BLUE`)
    embed.setTimestamp();
    message.channel.send(embed);
}