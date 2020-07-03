exports.help = {
    name: "flagquiz",
    description: "Guess the name of a flag!",
    usage: "flagquiz",
    type: "fun",
    aliases: ["fq"]
};
exports.run = async(client, message, args) => {
    if (args[0] != "easy" && args[0] != "hard") return message.reply("you have to specify if you want it 'easy' or 'hard'")
    const fetch = require("node-fetch")
    let flag = await fetch("https://restcountries.eu/rest/v2/all").then(r => r.json());
    let countries = []
    const Discord = require("discord.js")
    let right = flag[Math.floor(Math.random() * flag.length)]
    if (args[0] == "hard") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Flag quiz (HARD)")
            .setThumbnail(`https://www.countryflags.io/${right.alpha2Code}/flat/64.png`)
            .setDescription(`Type the name of this country in this channel`)
            .setFooter(message.author.username)
            .setColor("BLUE");
        let msg = await message.channel.send(embed)
        let collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 30000 })
        collector.on("collect", (collected) => {
            console.log(right)
            if (collected.content.toLowerCase() == right.name.toLowerCase().split(" (")[0]) {
                embed = new Discord.MessageEmbed()
                    .setTitle("CORRECT ANSWER")
                    .setDescription(`Answer : ${right.name}`)
                    .setFooter(message.author.username)
                    .setColor("GREEN");
                msg.edit(embed)
            } else {
                embed = new Discord.MessageEmbed()
                    .setTitle("WRONG ANSWER")
                    .setDescription(`Answer : ${collected.content}\nCorrect answer : ${right.name}`)
                    .setFooter(message.author.username)
                    .setColor("RED");
                msg.edit(embed)
            }
        })
    }
    if (args[0] == "easy") {
        for (var i = 0; i < 5; i++) { countries.push(flag[Math.floor(Math.random() * flag.length)].name) }
        countries[Math.floor(Math.random() * countries.length)] = right.name
        let embed = new Discord.MessageEmbed()
            .setTitle("Flag quiz (EASY)")
            .setThumbnail(`https://www.countryflags.io/${right.alpha2Code}/flat/64.png`)
            .setDescription(`1️⃣ : ${countries[0]}\n2️⃣ : ${countries[1]}\n3️⃣ : ${countries[2]}\n4️⃣ : ${countries[3]}\n5️⃣ : ${countries[4]}`)
            .setFooter(message.author.username)
            .setColor("BLUE");
        let msg = await message.channel.send(embed)
        msg.react("1️⃣").then(() => { msg.react("2️⃣") }).then(() => { msg.react("3️⃣") }).then(() => { msg.react("4️⃣") }).then(() => { msg.react("5️⃣") })
        let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]
        const collector = msg.createReactionCollector((r, u) => u.id == message.author.id && emojis.includes(r.emoji.name), { time: 30000 })
        let answer = false
        let one = "❌",
            two = "❌",
            three = "❌",
            four = "❌",
            five = "❌";
        for (var i = 0; i < countries.length; i++) {
            if (countries[i] == right.name) {
                if (i == 0) one = "✅"
                if (i == 1) two = "✅"
                if (i == 2) three = "✅"
                if (i == 3) four = "✅"
                if (i == 4) five = "✅"
            }
        }
        collector.on("collect", (reaction, user) => {
            answer = true
            if (reaction.emoji.name == "1️⃣") {
                if (right.name == countries[0]) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("CORRECT ANSWER")
                        .setDescription(`[1️⃣ : ${countries[0]}](https://www.google.com) ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("GREEN");

                    msg.edit(embed)
                } else {
                    embed = new Discord.MessageEmbed()
                        .setTitle("INCORRECT ANSWER")
                        .setDescription(`[1️⃣ : ${countries[0]}](https://www.google.com) ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("RED");
                    msg.edit(embed)
                }
            }
            if (reaction.emoji.name == "2️⃣") {
                if (right.name == countries[1]) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("CORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n[2️⃣ : ${countries[1]}](https://www.google.com) ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("GREEN");
                    msg.edit(embed)
                } else {
                    embed = new Discord.MessageEmbed()
                        .setTitle("INCORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n[2️⃣ : ${countries[1]}](https://www.google.com) ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("RED");
                    msg.edit(embed)
                }
            }
            if (reaction.emoji.name == "3️⃣") {
                if (right.name == countries[2]) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("CORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n[3️⃣ : ${countries[2]}](https://www.google.com) ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("GREEN");
                    msg.edit(embed)
                } else {
                    embed = new Discord.MessageEmbed()
                        .setTitle("INCORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n[3️⃣ : ${countries[2]}](https://www.google.com) ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("RED");
                    msg.edit(embed)
                }
            }
            if (reaction.emoji.name == "4️⃣") {
                if (right.name == countries[3]) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("CORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n[4️⃣ : ${countries[3]}](https://www.google.com) ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("GREEN");
                    msg.edit(embed)
                } else {
                    embed = new Discord.MessageEmbed()
                        .setTitle("INCORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : [${countries[3]}](https://www.google.com) ${four}\n5️⃣ : ${countries[4]} ${five}`)
                        .setFooter(message.author.username)
                        .setColor("RED");
                    msg.edit(embed)
                }
            }
            if (reaction.emoji.name == "5️⃣") {
                if (right.name == countries[4]) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("CORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n[5️⃣ : ${countries[4]}](https://www.google.com) ${five}`)
                        .setFooter(message.author.username)
                        .setColor("GREEN");
                    msg.edit(embed)
                } else {
                    embed = new Discord.MessageEmbed()
                        .setTitle("INCORRECT ANSWER")
                        .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n[5️⃣ : ${countries[4]}](https://www.google.com) ${five}`)
                        .setFooter(message.author.username)
                        .setColor("RED");
                    msg.edit(embed)
                }
            }

        })
        collector.on("end", (collected) => {
            if (!answer) {
                embed = new Discord.MessageEmbed()
                    .setTitle("OUT OF TIME")
                    .setDescription(`1️⃣ : ${countries[0]} ${one}\n2️⃣ : ${countries[1]} ${two}\n3️⃣ : ${countries[2]} ${three}\n4️⃣ : ${countries[3]} ${four}\n5️⃣ : ${countries[4]} ${five}`)
                    .setFooter(message.author.username)
                    .setColor("RED");
                msg.edit(embed)
            }
        })
    }
}