const fetch = require("node-fetch");
exports.help={
    name: "corona",
    description: "Check corona statistics for the specified country",
    usage: "corona <country / \"countries\">",
    type: "fun"
  };
  exports.run = async (client, message, args) => {
  const Discord = require("discord.js")
  const fs = require("fs")
  if(!args[0]) return message.channel.send("❌ You need to specify what country you want to see the corona statistics fof.")
  let country = args.slice(0).join(" ");
   let countries = "";
if((args[0] == "countries")== true){
   fetch("https://corona.lmao.ninja/v2/countries")
   .then(response => response.json())
   .then(data => {
   data.forEach(corona1=>{
           countries+="\n"+corona1.country
   });
   fs.writeFile('countries.txt', countries, (error) => console.log(error))
   let attachment = new Discord.MessageAttachment("./countries.txt")
   message.channel.send(attachment)
   })

}else if(args[0] != "countries"){
   fetch("https://corona.lmao.ninja/v2/countries/"+country)
   .then(response => response.json())
   .then(corona => {
    if(corona.message != "Country not found or doesn't have any cases"){
           let embed = new Discord.MessageEmbed().setTitle(corona.country).setColor("DARK_RED")
           .addField("Cases per 1 million", corona.casesPerOneMillion, true)
           .addField("Confirmed", corona.cases, true)
           .addField("Active cases", corona.active, true)
           .addField("Critical cases", corona.critical, true)
           .addField("Recovered cases", corona.recovered, true)
           .addField("Deaths per 1 million", corona.deathsPerOneMillion, true)
           .addField("Deaths", corona.deaths, true)
           .setThumbnail(`${corona.countryInfo.flag}`)
           .setTimestamp();
           message.channel.send(embed)
    }else{
      message.channel.send("❌ Couldn't find that country")
    }
   });

}
      }