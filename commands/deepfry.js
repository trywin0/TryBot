exports.help = {
    name: "deepfry",
    description: "Deep fry a image.",
    usage: "deepfry <image>",
    type: "img"
};
exports.run = async(client, message, args) => {
    try {
        message.channel.startTyping()
        var Jimp = require('jimp');
        message.channel.messages.fetch({ limit: 25 }).then(msgs => {
            let regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig
            let image = msgs.filter(m => {
                if (m.attachments.first()) {
                    return true
                } else if (regex.test(m.content)) {
                    return true
                } else if (m.embeds[0] && m.embeds[0].image && m.embeds[0].image.url) {
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
            deepfry(image)

            function deepfry(link) {
                Jimp.read(link)
                    .then(image => {
                        image
                            .contrast(0.95)
                            .posterize(8)
                            .quality(0)
                            .pixelate(1.5)
                            .write('./images/deepfry.png')
                        message.channel.send({
                            files: [
                                './images/deepfry.png'
                            ]
                        })
                    })
            }
        })
        message.channel.stopTyping()
    } catch (e) {
        message.reply(e.message)
    }
}