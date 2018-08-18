const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let docschannel = message.guild.channels.find(`name`, "politie-docs-commands");
  if(message.channel === docschannel) {
    if(!args[0]) return message.reply("je moet een spelers naam ingeven! Gebruik: !boete <Speler> <Hoeveel> <Redenen>");
    if(!args[1]) return message.reply("je moet een hoeveelheid ingeven! Gebruik: !boete <Speler> <Hoeveel> <Redenen>");
    if(!args[2]) return message.reply("je moet een redenen geven! Gebruik: !boete <Speler> <Hoeveel> <Redenen>");

    let redenen = args[2];
    let redenentekst = redenen;
    for (i = 3; args[i]; i++) {
      if (!args[i]) return;
      redenentekst = `${redenentekst} ${args[i]}`;
    }

    let ncheck = parseInt(args[1]);
    if (!ncheck) return message.reply("je mag alleen nummers gebruiken bij de hoeveelheid! Gebruik: !docs <add> <Speler> <tijd> <tijdsoort> <redenen>");

    let t = message.createdAt;
    let docsEmbed = new Discord.RichEmbed()
    .setDescription("Boete")
    .setColor("#990000")
    .addField("Persoon:", `${args[0]}`)
    .addField("Toegevoegd door:", `${message.author}`)
    .addField("Gegeven op:", `${t.getDate()}-${t.getMonth()}-${t.getFullYear()} om ${t.getHours()}:${t.getMinutes()}`)
    .addField("Redenen:", `${redenentekst}`)
    .addField("Hoeveel:", `€${args[1]}`)
    .setFooter("Copyright © 2018-2018");

    message.delete().catch(O_o=>{});
    let politiedocs = message.guild.channels.find(`name`, "politie-docs");
    if(!politiedocs) return message.channel.send("Geen Politie Docs channel gevonden.");
    message.reply("succesvol toegevoegd in #politie-docs!");
    politiedocs.send(docsEmbed);
  }
}

module.exports.help = {
  name: "boete"
}
