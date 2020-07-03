exports.help = {
    name: "mimic",
    description: "Mimic a user using webhooks",
    usage: "mimic <@user>",
    type: "mod"
};
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Insufficient permissions.")
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.reply("I need permission to manage webhooks to do that.")
    if (!args[0]) return message.reply("You need to mention who you want to mimic and what you want to mimic")
    let user = message.mentions.members.first() || message.member;
    let avatar = user.user.displayAvatarURL({ dynamic: true, format: "png" });
    let name = user.displayName

    const hook = await message.channel.createWebhook(name, { avatar: avatar }).catch(error => message.reply(error.message))
    await hook.edit(name, { avatar: avatar }).catch(error => console.log(error))
    hook.send(args.slice(1).join(" ")).then(() => hook.delete())
    message.delete()
}