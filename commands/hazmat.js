const { arg } = require("mathjs");

exports.help = {
    name: "hazmat",
    description: "Put a user or emoji in a hazmat!",
    usage: "hazmat <@user | :emoji:>",
    type: "img",
    aliases: ["hz"]
};
const Canvas = require("canvas")

exports.run = async(client, message, args) => {
    const Discord = require("discord.js");
    const user = message.mentions.members.first() || message.member;
    let image = user.user.displayAvatarURL({ format: "png" })
    if (/<?(a)?:?(\w{2,32}):(\d{17,19})>?/.test(args[0])) {
        let emoji = args[0]
        let regex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/
        image = regex.exec(emoji)[1] == undefined ? `https://cdn.discordapp.com/emojis/${regex.exec(emoji)[3]}.png` : `https://cdn.discordapp.com/emojis/${regex.exec(emoji)[3]}.gif`
    }
    const canvas = Canvas.createCanvas(300, 300);

    const ctx = canvas.getContext('2d');

    const avatar = await Canvas.loadImage(image);
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + 10, canvas.height / 2 + 10, 255 / 2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 60, 40, 225, 225);
    ctx.restore()





    const background = await Canvas.loadImage('./hazmat.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hazmat.png');
    message.channel.send(attachment)
}