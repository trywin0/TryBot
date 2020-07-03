exports.help={
    name: "ban",
    description: "ban the mentioned user",
    usage: "ban <@user> <reason>",
    type: "mod"
  };
exports.run = async (client, message, args) => {  
if(!message.member.hasPermission("BAN_MEMBERS"))return message.channel.send("Insufficient permissions.");
if(!message.guild.me.hasPermission("BAN_MEMBERS"))return message.channel.send("I don't have permissions to do that");
if(!message.mentions.members.first()) return message.channel.send("You need to mention who you want to ban");
let reason = args.splice(1).join(" ");
if(!reason) reason = "no reason specified."
if(message.mentions.members.first().bannable){
  message.mentions.members.first().send(`You have been banned from ${guild.name} by ${message.author.tag}. Reason ${reason}`).then(()=>{
    message.mentions.members.first().ban(reason);
  }).catch(err=>{
    console.log(err)
  })
}else{
 message.channel.send("I don't have permissions to do that");
}
}

