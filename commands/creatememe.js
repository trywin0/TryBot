const fetch = require("node-fetch");
exports.help = {
    name: "creatememe",
    description: "Create a meme!",
    usage: "creatememe <top text> - <bottom text> <attached image>",
    type: "fun"
};
tryGetJson = async(resp) => {
    return new Promise((resolve) => {
        if (resp) {
            resp.json().then(json => resolve(json)).catch(() => resolve(null))
        } else {
            resolve(null)
        }
    })
}
exports.run = async(client, message, args) => {
    if (!args.join(" ").split(" - ")[1]) return message.reply("you have to type top and bottom text like this `Top text - Bottom text`")
    if (!message.attachments.first()) return message.reply("you have to attach a image")
    message.channel.send({ files: [`https://memegen.link/custom/${args.join(" ").split(" - ")[0].replace(" ", "-")}/${args.join(" ").split(" - ")[1].replace(" ", "-")}.jpg?alt=${message.attachments.first().url}`] })


}