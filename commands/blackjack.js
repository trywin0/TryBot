exports.help = {
    name: "blackjack",
    description: "Play blackjack",
    usage: "blackjack <amount>",
    type: "economy"
};
exports.run = async(client, message, args) => {
    try {
        const db = require("quick.db")
        const Discord = require("discord.js")
        let messag = ""
        let cards = client.guilds.cache.get("694556377095602196").emojis.cache.filter(e => messag += e.name + "\n")
        message.channel.send(messag)
    } catch (e) {
        console.log(e)
        message.reply(e)
    }
}