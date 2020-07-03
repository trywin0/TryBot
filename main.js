/*
TODO____________
clean up the auto unmute : 16-30
clean up reminders : 32-47
finish learning mongodb and replace quick.db with it
*/

const Discord = require("discord.js"),
    client = new Discord.Client({
        disableMentions: "everyone"
    }),
    fs = require("fs"),
    config = require("./config.json");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
const db = require("quick.db");
setInterval(() => {
            client.guilds.cache.forEach(g => {
                        if (db.has(g.id + ".muteusers")) {
                            db.get(g.id + ".muteusers").forEach(async user => {
                                if (db.get(g.id + "." + user + ".mute.value") == true) {
                                    if ((new Date().getTime() - db.get(g.id + "." + user + ".mute.time")) >= db.get(g.id + "." + user + ".mute.length")) {
                                        let tomute = await g.members.fetch(user)
                                        let muterole = g.roles.cache.find(muterole => muterole.name.toLowerCase() === "muted");
                                        tomute.roles.remove(muterole.id)
                                        let muteusers = db.get(g.id + ".muteusers")
                                        muteusers.splice(muteusers.indexOf(user), 1)
                                        db.set(g.id + ".muteusers", muteusers)
                                        db.delete(g.id + "." + user + ".mute")
                                    }
                                }
                            })
                        }
                        if (db.has(g.id + ".reminders")) {
                            Object.keys(db.get(g.id + ".reminders")).forEach(async user => {
                                        for (let i = 0; i < db.get(g.id + ".reminders" + "." + user).length; i++) {
                                            if ((new Date().getTime() - db.get(`${g.id}.reminders.${user}`)[i].time) >= db.get(`${g.id}.reminders.${user}`)[i].duration) {
                                                let tomute = await g.members.fetch(user)
                                                const exampleEmbed = new Discord.MessageEmbed()
                                                    .setColor("GREEN")
                                                    .setAuthor(`REMINDER`, tomute.user.displayAvatarURL({ format: "png", dynamic: true }))
                                                    .setDescription(`Reminder : \`\`\`${db.get(`${g.id}.reminders.${user}`)[i].reminder}\`\`\``);
                                                g.channels.cache.get(db.get(`${g.id}.reminders.${user}`)[i].channel).send(`${tomute}`, { embed:exampleEmbed})
                        let muteusers = db.get(`${g.id}.reminders.${user}`)
                        muteusers.splice(i, 1)
                        db.set(`${g.id}.reminders.${user}`, muteusers)
                    }
                }
            })
        }
    })
}, 2000);
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);

        console.log("Successfully loaded " + file)
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});

client.on("ready", () => {
    console.log(client.user.username + " is online.")
});
client.login(config.token)
