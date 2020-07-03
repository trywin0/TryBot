exports.help={
    name: "kick",
    description: "Kick the mentioned user",
    usage: "kick <@user> <reason>",
    type: "mod"
  };
exports.run = async (client, message, args) => {  
if(!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send("Insufficient permissions.");
if(!message.guild.me.hasPermission("KICK_MEMBERS"))return message.channel.send("I don't have permissions to do that");
if(!message.mentions.members.first()) return message.channel.send("You need to mention who you want to kick");
let reason = args.splice(1).join(" ");
if(!reason) reason = "no reason specified."
if(message.mentions.members.first().kickable){
  message.mentions.members.first().send(`You have been kicked from ${guild.name} by ${message.author.tag}. Reason ${reason}`).then(()=>{
    message.mentions.members.first().kick(reason);
  }).catch(err=>{
    console.log(err)
  })
}else{
 message.channel.send("I don't have permissions to do that");
}
}

