exports.help = {
    name: "eval",
    description: "Evaluate JavaScript code",
    usage: "eval <code>",
    type: "owner"
};
const db = require("quick.db")
exports.run = async(client, message, args) => {
    const { inspect } = require("util")
    const config = require("../config.json");
    if (message.author.id !== config.owner) return;
    let evaled;
    try {
        let time = new Date().getMilliseconds();
        evaled = await eval(args.join(" "));
        message.channel.send(`**Executed in \`${new Date().getMilliseconds()-time}ms\`**\n` + "```js\n" + inspect(evaled) + "```");
        console.log(inspect(evaled));
    } catch (error) {
        console.error(error);
        message.reply('there was an error during evaluation.```' + error + "```");
    }
}