exports.help = {
    name: "math",
    description: "Calculate some math",
    usage: "math <calculation>",
    type: "fun"
};
const math = require("mathjs")
exports.run = async(client, message, args) => {
    const Discord = require("discord.js");
    try {
        const resp = math.evaluate(args.join(" "))
        const embed = new Discord.MessageEmbed()
            .setTitle("Math")
            .addField("**Input**", `\`\`\`${args.join(" ")}\`\`\``)
            .addField("**Output**", `\`\`\`${resp}\`\`\``)
        message.channel.send(embed)
    } catch (e) {
        console.log(e)
        return message.reply("Invalid input")
    }
}