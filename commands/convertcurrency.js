const { arg } = require("mathjs");

exports.help = {
    name: "convertcurrency",
    description: "Check how much X is in one currency compared to another",
    usage: "comparecurrency <amount> <currency 1> <currency 2>",
    type: "general",
    aliases: ["cc"]
};
exports.run = async(client, message, args) => {
    const Discord = require("discord.js")
    const fetch = require("node-fetch")
    fetch("https://api.exchangeratesapi.io/latest").then(r => r.json()).then(response => {
        if (!Object.keys(response.rates).map(m => m.toLowerCase()).includes(args[1].toLowerCase()) && args[1].toLowerCase() != "eur") return message.reply(`That's not a valid currency, here's a list of all the currently supported currencies \`\`\`${Object.keys(response.rates).join(", ")}, EUR\`\`\``)
        if (!Object.keys(response.rates).map(m => m.toLowerCase()).includes(args[2].toLowerCase()) && args[2].toLowerCase() != "eur") return message.reply(`That's not a valid currency, here's a list of all the currently supported currencies \`\`\`${Object.keys(response.rates).join(", ")}, EUR\`\`\``)
        fetch("https://api.exchangeratesapi.io/latest?base=" + args[1].toUpperCase()).then(a => a.json()).then(rates => {
            message.channel.send(`${args[0]} ${args[1].toUpperCase()} = ${(rates.rates[args[2].toUpperCase()]*args[0]).toPrecision(3)} ${args[2].toUpperCase()}`)
            console.log(rates)
        })

    })
}