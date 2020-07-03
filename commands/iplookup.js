exports.help = {
    name: "iplookup",
    description: "Get information on a IPv4 address",
    usage: "iplookup <IPv4 Address>",
    type: "general"
};
const Discord = require("discord.js")
exports.run = async(client, message, args) => {
    try {
        const fetch = require("node-fetch");
        if (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(args[0])) return message.reply("That's not a valid IPv4 address.")
        let ip = await fetch(`http://ip-api.com/json/${args[0]}`).then(e => e.json());
        if (!ip || ip.status != "success") return message.reply("something went wrong, make sure that the provided ip is correct")
        const embed = new Discord.MessageEmbed()
            .setTitle(`Info about ${args[0]}`)
            .setThumbnail(`https://www.countryflags.io/${ip.countryCode}/shiny/64.png`)
            .addField("Country", ip.country, true)
            .addField("City", ip.city + ", " + ip.regionName, true)
            .addField("Timezone", ip.timezone, true)
            .addField("ISP", `[${ip.isp}](https://www.google.com/search?q=${encodeURI(ip.isp)} "Google")`, true)
            .addField("Organization", !ip.org ? "None" : `[${ip.org}](https://www.google.com/search?q=${encodeURI(ip.org)} "Google")`, true)
            .setColor("GREEN")
        message.channel.send(embed)
    } catch (e) {
        message.reply(e.message)
    }
}