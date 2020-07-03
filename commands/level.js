exports.help = {
    name: "level",
    description: "Check your / mentioned user's level",
    usage: "level <@user>",
    type: "fun",
    aliases: ["rank", "lv", "lvl"]
};
exports.run = async(client, message, args) => {
    let member = message.mentions.members.first() || message.member;
    const Discord = require("discord.js");
    const db = require("quick.db");
    if (!db.has(message.guild.id + member.id + ".lvl") || !db.has(message.guild.id + member.id + ".xp")) {
        db.set(message.guild.id + member.id + ".lvl", 0)
        db.set(message.guild.id + member.id + ".xp", 0)
    }
    const Canvas = require("canvas")
    const canvas = Canvas.createCanvas(2000 / 2, 750 / 2);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./levelbackground.png');


    ctx.beginPath();
    ctx.rect(600 / 2, 456 / 2, 1200 / 2, 130 / 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.beginPath();
    ctx.rect(600 / 2, 456 / 2, 600 * (db.get(message.guild.id + member.id + ".xp") / Math.round(5 * (db.get(message.guild.id + member.id + '.lvl') ^ 2) + 50 * db.get(message.guild.id + member.id + '.lvl') + 100)), 130 / 2);
    ctx.fillStyle = `#${member.roles.highest.color.toString(16).toUpperCase()}`;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
    ctx.fill();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
    ctx.strokeStyle = `#${member.roles.highest.color.toString(16).toUpperCase()}`;
    Canvas.registerFont("./futur.ttf", { family: "Futura" });
    ctx.font = '75px Futura';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00000";
    ctx.save();
    ctx.beginPath();
    ctx.arc(350 / 2, 350 / 2, 200 / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    let width = ctx.measureText(member.user.username).width + 630 / 2
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 150 / 2, 150 / 2, 400 / 2, 400 / 2);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
    ctx.restore()
    ctx.save();
    ctx.beginPath();
    ctx.arc(350 / 2, 350 / 2, 200 / 2, 0, Math.PI * 2, true)
    ctx.stroke();
    ctx.restore()
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(member.user.username, 620 / 2, 350 / 2);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
    ctx.strokeText(member.user.username, 620 / 2, 350 / 2);
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.font = '35px Futura';
    ctx.strokeText("#" + member.user.discriminator, width, 350 / 2);
    ctx.font = '25px sans-serif';
    ctx.strokeStyle = "#00000";
    ctx.strokeText(`${db.get(message.guild.id + member.id + ".xp")}/${Math.round(5 * (db.get(message.guild.id + member.id + '.lvl') ^ 2) + 50 * db.get(message.guild.id + member.id + '.lvl') + 100)}xp`, 610 / 2, 650 / 2);
    Canvas.registerFont("./futur.ttf", { family: "Futura" });
    ctx.font = '100px Futura';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(db.get(message.guild.id + member.id + ".lvl"), 1700 / 2, 230 / 2);
    ctx.font = '35px Futura';
    ctx.fillText("Level", 1500 / 2, 230 / 2);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'level.png');
    message.channel.send({ files: [attachment] })
}