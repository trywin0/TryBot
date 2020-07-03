exports.help={
    name: "copyemoji",
    description: "Copy a certain emoji and add it to your server",
    usage: "copyemoji <:emoji:>",
    type: "fun"
  };
  exports.run = async (client, message, args) => {  
try{
    if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send("Insufficient permissions");
    if(!args[0]) return message.channel.send("You need to send what emoji you want to copy`");
    let reason1 = args.join(" ")
reason1 = reason1.split(" ");
let emojilist = []
for(var i = 0; i < reason1.length; i++){

  
let emojiinfo = reason1[i].split(":")[0];
emojiinfo = emojiinfo.split("<")[1];
let emoji = reason1[i].split(":")[2];
emoji = emoji.split(">")[0];

   //console.log(`${emoji.split(">")[0]} and ${reason1}`)
  // console.log(emojiinfo, emojiinfo === 'a')
   if(emojiinfo === "a"){

     message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji}.gif`, reason1[i].split(":")[1])
     .then(emoji =>{ 
message.channel.send(`<a:${emoji.name}:${emoji.id}>`)
    }).catch(err=>message.reply(`Error : \`${err}\``))
 }
 
 if(emojiinfo === ""){
   console.log(reason1[i].split(":")[1])
   message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji}.png`, reason1[i].split(":")[1])
   .then(emoji =>{
       message.channel.send(`<:${emoji.name}:${emoji.id}>`) 
    }).catch(err=>message.reply(`Error : \`${err}\``))
}

}
//console.log(emojilist)


message.delete();

}catch(err){
  console.log(err);
  message.reply("I couldnt create that emoji. Make sure you did everything correct and try again.")
} 
  }