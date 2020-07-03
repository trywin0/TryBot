const { arg } = require("mathjs");

exports.help = {
    name: "blackbox",
    description: "Make a black box meme",
    usage: "blackbox <Caption> - <message>",
    type: "img"
};
exports.run = async(client, message, args) => {
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
        }).first()
        if (image.content && regex.test(image.content)) {
            image = image.content
        } else if (image.attachments.first()) {
            image = image.attachments.first().url
        } else if (image.embeds[0] && image.embeds[0].image) {
            image = image.embeds[0].image.url
        }
        console.log(image)
        if (!image) return message.channel.send("I couldnt find any images")
        const Discord = require("discord.js")
        const Canvas = require("canvas")
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3;
        const memeimage = await Canvas.loadImage(image);
        ctx.drawImage(memeimage, 100, 100, canvas.width - 200, canvas.height - 400)
        ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 400)
        ctx.fillStyle = '#ffffff'
        ctx.font = "80px Times New Roman"
        ctx.fillText(args.join(" ").split(" - ")[0], 500 - ctx.measureText(args.join(" ").split(" - ")[0]).width / 2, 800);
        ctx.font = "55px Times New Roman"
        ctx.fillText(args.join(" ").split(" - ")[1] ? args.join(" ").split(" - ")[1] : "", 500 - ctx.measureText(args.join(" ").split(" - ")[1] ? args.join(" ").split(" - ")[1] : "").width / 2, 870);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'funny.png');
        message.channel.stopTyping()
        setTimeout(() => {
            message.channel.stopTyping()
        }, 10000);
        message.channel.send(attachment);
    })
}