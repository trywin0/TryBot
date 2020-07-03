exports.help = {
    name: "jail",
    description: "Put a user in jail",
    usage: "jail <@user>",
    type: "fun"
};
exports.run = async(client, message, args) => {
    const Canvas = require("canvas")
    const Discord = require("discord.js");
    let user = message.mentions.users.first() || message.author
    const canvas = Canvas.createCanvas(700, 700);
    const ctx = canvas.getContext('2d');
    if (!user) return message.channel.send("You need to send what emoji you want to copy`");
    const background = await Canvas.loadImage(user.displayAvatarURL({ dynamic: true, format: "png" }));
    const foreground = await Canvas.loadImage('https://pluspng.com/img-png/free-png-jail-pix-for-prison-bars-png-1020.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#0a0a0a";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${user.username} jailed.png`)
    message.channel.send(
        attachment
    )
}