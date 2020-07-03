exports.help = {
    name: "gay",
    description: "Get a gay image",
    usage: "gay",
    type: "nsfw",
    aliases: ["gayporn"]
};
const redditApiImageGetter = require('reddit-api-image-getter'),
    getter = new redditApiImageGetter(),
    subredddits = ["gayporn", "dicks", "cocks"],
    Discord = require("discord.js");
exports.run = async(client, message, args) => {
    try {
        if (!message.channel.nsfw) return message.reply("This command is not available in non nsfw channels.")
        message.channel.startTyping()
        const images = await getter.getHotImagesOfSubReddit(subredddits[Math.floor(Math.random() * subredddits.length)])
        const { url, title, subreddit } = images[Math.floor(Math.random() * images.length)]
        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${title}\` from subreddit : \`${subreddit}\``)
            .setURL(url)
            .setImage(url)
            .setColor("DARK_VIVID_PINK")
            .setFooter("Hint: If the image wont load, press the title of the embed")
        await message.channel.stopTyping()
        message.channel.send(embed)

    } catch (err) {
        console.log(err);
        message.reply("Something went wrong, try again")
    }
}