exports.help = {
    name: "define",
    description: "Get info on a term from urbandictionary",
    usage: "define <term>",
    type: "general",
    aliases: ["df"]
};
exports.run = async(client, message, args) => {
    let msg = await message.channel.send("Fetching information...")
    try {
        const Discord = require("discord.js")
        const fetch = require("node-fetch")

        fetch("http://api.urbandictionary.com/v0/define?term=" + args.join(" ")).then(r => r.json()).then(response => {
            let word = response.list[0]
            let embed = new Discord.MessageEmbed()
                .setTitle(`${word.word} definition`)
                .setDescription(`**Definition**: ${word.definition.replace(/\[/g, "").replace(/\]/g, "")}
                **Example**: \`\`\`${word.example.replace(/\[/g, "").replace(/\]/g, "")}\`\`\``)
                .setColor(`GREEN`)
                .setTimestamp();
            msg.edit("Here:", embed)
        }).catch(e => {
            msg.edit("I couldn't find that term.")
        })
    } catch (e) {
        console.log(e)
        msg.edit("I couldn't find that term.")
    }
}