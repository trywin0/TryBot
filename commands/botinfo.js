exports.help = {
    name: "botinfo",
    description: "Get information about a bot. Gets info from www.top.gg",
    usage: "botinfo <@bot / bot id>",
    type: "general"
};
exports.run = async(client, message, args) => {
    const DBL = require('dblapi.js');
    const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDg4ODQzMjAzMTM2NzI1OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4MTkyNTExfQ.rvKC63vX5EB_coosfMTE_tBkohHhAYqeB7CYfPIhcEc", client);
    let id = message.mentions.users.first() || args[0]
    if (message.mentions.users.first()) id = id.id
    const Discord = require("discord.js");
    dbl.getBot(id).then(async bot => {
        console.log(bot)
        let embed = new Discord.MessageEmbed()
            .setAuthor(bot.username, `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`)
            .setDescription(`${bot.shortdesc}`)
            .addField("**Owner id(s)**", bot.owners)
            .addField("**Prefix**", bot.prefix, true)
            .addField("**Invite link**", `[click me](${bot.invite})`, true)
            .addField("**Tags**", bot.tags.join("\n"), true)
            .setColor("BLUE")
        await message.channel.send(embed)
    }).catch(err => message.reply("couldn't find that user"))
}