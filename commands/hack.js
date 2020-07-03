exports.help = {
    name: "hack",
    description: "\"hack\" a user ",
    usage: "hack <@user>",
    type: "fun"
};
exports.run = async(client, message, args) => {
    const fs = require("fs")
    if (!message.mentions.members.first()) return message.reply("You need to mention who you want me to hack.");
    message.channel.send("Hacking discord database...").then(msg => {
        setTimeout(() => {
            msg.edit("Decrypting user information...")
        }, 3000);
        setTimeout(() => {
            let hackphrases = ["Do you think i am gay?", "I prefer men.", "How do i tame a racoon?", "What's 9+9? Ik i might seem dumb but i genuinely don't know", " 5 + 5 = 55 right?"]
            msg.edit(`Latest sentence written in dms : \`${hackphrases[Math.floor(Math.random()*hackphrases.length)]}\``)
        }, 5000);
        setTimeout(() => {
            let passwords = [];
            fs.readFile("passwords.txt", "utf8", function read(err, data) {
                if (err) {
                    throw err;
                }
                data = data.split(" ")
                for (let i = 0; i < data.length; i++) {
                    data[i] = data[i].replace(/(\r\n|\n|\r)/gm, " ");
                    passwords.push(data[i])
                }
                passwords = passwords.join("").split(" ")
                msg.edit(`**Login info:**\n\`Email : ${message.mentions.users.first().username.split(" ").join(".")}${Math.round(Math.random()*50)}@gmail.com\nPassword : ${passwords[Math.floor(Math.random() * passwords.length)]}\``)
            });

        }, 7000);
        setTimeout(() => {
            let ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
            msg.edit(`IP address : ${ip} ||⁽ⁿᵒᵗ ʳᵉᵃˡ⁾||`)
        }, 9000);
        setTimeout(() => {
            msg.edit("Selling information on the dark web...")
        }, 12000);
        setTimeout(() => {
            msg.edit("Hack done.")
        }, 15000);
    })
}