exports.help = {
    name: "deposit",
    description: "Deposit some money into your bank account",
    usage: "deposit <money amount>",
    type: "economy"
};
exports.run = async(client, message, args) => {
    const db = require("quick.db")
    if (!args[0]) return message.channel.send(`You need to say how much you want to deposit into your bank account`);
    if (isNaN(args[0])) return message.channel.send(`You need to say how much you want to deposit into your bank account`);
    if (db.get(message.guild.id + message.author.id + ".money") < args[0]) return message.channel.send(`You don't have that much money.`);
    db.add(message.guild.id + message.author.id + ".bankmoney", args[0]);
    db.subtract(message.guild.id + message.author.id + ".money", args[0]);
    message.channel.send(`${message.author.tag} deposited $${args[0]} to their bank account.`)

}