exports.help = {
    name: "logchannel",
    description: "Set what channel all moderator / message logs should be sent in",
    usage: "logchannel <#channel>",
    type: "mod"
};
const db = require("quick.db")
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Insufficient permissions.");
    if (!message.mentions.channels.first()) return message.channel.send("You need say what channel you want to put the logs in.");
    db.set(message.guild.id + ".logchannel", message.mentions.channels.first().id)
    message.channel.send(`${message.mentions.channels.first()} is now the new log channel`)
}