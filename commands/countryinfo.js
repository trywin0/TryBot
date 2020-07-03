exports.help = {
    name: "countryinfo",
    description: "Get information on a country",
    usage: "countryinfo <country>",
    type: "general",
    aliases: ["ci"]
};
exports.run = async(client, message, args) => {
        try {
            const Discord = require("discord.js")
            const fetch = require("node-fetch")
            let msg = await message.channel.send("Fetching information...")
            fetch("https://restcountries.eu/rest/v2/name/" + args.join(" ")).then(r => r.json()).then(response => {
                        console.log(response)
                        let country = response[0]
                        console.log(country.currencies.map(c => c.name))
                        let embed = new Discord.MessageEmbed()
                            .setDescription(
                                `**__Information about ${country.name}__**
            • Name: ${country.name}
            • Capital: ${country.capital}
            • Alternative spellings: ${country.altSpellings.join(", ")}
            • Region: ${country.region}
            • Population: ${country.population}
            • Timezones: \`${country.timezones.join("`, `")}\`
            • Currencies: ${country.currencies.map(c => c.name).join(", ")}
            • Languages: ${country.languages.map(c => c.name).join(", ")}
            • Native name: ${country.nativeName}`)
                .setColor(`GREEN`)
                .setThumbnail(`https://www.countryflags.io/${country.alpha2Code}/shiny/64.png`)
                .setTimestamp();
            msg.edit("Here:", embed)
        })
    } catch (e) {
        console.log(e);
        message.reply("i couldn't find a country with that name.")
    }
}