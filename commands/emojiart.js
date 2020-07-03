exports.help = {
    name: "emojiart",
    description: "Make art out of emojis",
    usage: "emojiart <:emoji:>",
    type: "fun"
};
exports.run = async(client, message, args) => {
    if (!args[0]) return message.reply("You need to specify a emoji")
    args[2] = args[0]
    args[1] = "      "
    message.reply(`Copy this: \`\`\`
**${args[1]}**${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[2]}${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[1]}${args[2]}${args[1]}${args[2]}${args[1]}${args[2]}
${args[2]}${args[1]}${args[1]}${args[1]}${args[2]}${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[2]}${args[1]}${args[2]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[2]}${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[1]}${args[1]}${args[1]}${args[2]}
${args[1]}${args[1]}${args[1]}${args[1]}${args[2]}\`\`\``)
}