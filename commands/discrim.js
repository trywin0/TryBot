exports.help = {
    name: "disrim",
    description: "Check what users that have the same discriminator as you. (if you change to their name you can change your tag / discriminator)",
    usage: "discrim",
    type: "general"
};
exports.run = async(client, message, args) => {
    client.guilds.cache.forEach(async m => {
        await m.members.fetch()
    })
    let users = client.users.cache
    users = users.filter(u => u.discriminator == message.author.discriminator).array()
    message.reply(`${users.length} users were found with your tag\`\`\`${users.map(u=>u.tag).join("\n")}\`\`\``)
}