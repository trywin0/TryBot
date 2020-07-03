exports.help = {
    name: "emoji",
    description: "Get some info on a emoji",
    usage: "emoji <:emoji:>",
    type: "general"
};
const Discord = require("discord.js")
exports.run = async(client, message, args) => {
    let emoji = args[0]
    let regex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/
    let unicoderegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
    if (!emoji) return;
    if (regex.test(emoji)) {
        let emojiurl;
        if (regex.exec(emoji)[1] == undefined) {
            emojiurl = `https://cdn.discordapp.com/emojis/${regex.exec(emoji)[3]}.png`
        } else {
            emojiurl = `https://cdn.discordapp.com/emojis/${regex.exec(emoji)[3]}.gif`
        }
        const Canvas = require("canvas")
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');
        const name = regex.exec(emoji)[2]
        const background = await Canvas.loadImage(emojiurl);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "emoji.png")
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Info about ${name} (ID: ${regex.exec(emoji)[3]})`)
            .addField("**> Info**", `• Name: ${name}\n• Identifier: \`${emoji}\`\n• URL: [Click me](${emojiurl})`)
            .setThumbnail(emojiurl)
        message.channel.send({ embed: embed })
    } else if (unicoderegex.test(emoji)) {
        function emojiToUnicode(s) {
            return s.match(unicoderegex)
                .map(e => "\\u" + e.charCodeAt(0).toString(16) + "\\u" + e.charCodeAt(1).toString(16))
        }
        const emoj = require("emoji-dictionary");
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Info about ${emoj.getName(emoji)}`)
            .addField("**> Info**", `• Name: \`${emoj.getName(emoji)}\`\n• Unicode: \`${emojiToUnicode(emoji)}\`\n• Raw: \`${emoji}\``)
        message.channel.send(embed)
    } else message.reply("that's not a valid emoji")


}