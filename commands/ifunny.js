const { arg } = require("mathjs");

exports.help = {
    name: "ifunny",
    description: "Put an ifunny watermark on a image",
    usage: "ifunny <image>",
    type: "img"
};
exports.run = async(client, message, args) => {
    try {
        message.channel.startTyping()
        message.channel.messages.fetch({ limit: 25 }).then(async msgs => {
            let regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig
            let image = msgs.filter(m => {
                if (m.attachments.first()) {
                    return true
                } else if (regex.test(m.content)) {
                    return true
                } else if (m.embeds[0] && m.embeds[0].image.url) {
                    return true
                } else {
                    return false
                }
                //return ( ||  || )
            }).first()
            if (image.content && regex.test(image.content)) {
                image = image.content
            } else if (image.attachments.first()) {
                image = image.attachments.first().url
            } else if (image.embeds[0] && image.embeds[0].image) {
                image = image.embeds[0].image.url
            }
            if (!image) return message.channel.send("I couldnt find any images")
            const Discord = require("discord.js")
            const Canvas = require("canvas")
            const canvas = Canvas.createCanvas((await Canvas.loadImage(image)).width, (await Canvas.loadImage(image)).height + 30);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(await Canvas.loadImage(image), 0, 0)
            const ifunny = await Canvas.loadImage("https://media.discordapp.net/attachments/682293155621896277/728348361937256528/unknown.png")
            ctx.drawImage(ifunny, 0, canvas.height - 30, canvas.width, 30)
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ifunny.png');
            message.channel.send(attachment);
        })
        message.channel.stopTyping()
    } catch {

    }
}