const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const sql = require("sqlite");
sql.open("./scores.sqlite");

client.on('ready', () => {
  console.log(`Danbot Ultimate vient de démarrer, pour un total de **${client.users.size}** membres, dans **${client.channels.size}** channels de **${client.guilds.size}** serveurs.`);
  client.user.setActivity(`être sur ${client.guilds.size} serveurs!`);
  client.user.setUsername('Danbot Ultimate')
});

client.on("guildCreate", guild => {
  msg.channel.send(`Danbot vient de rejoindre le serveur **${guild.name}** (id: ${guild.id}).\nCe serveur possède ${guild.memberCount} membres!`);
  client.user.setActivity(`être sur ${client.guilds.size} serveurs!`);
});

client.on("guildDelete", guild => {
  console.log(`Danbot vient de quitter le serveur **${guild.name}** (id: ${guild.id})`);
  client.user.setActivity(`être sur ${client.guilds.size} serveurs!`);
});

client.on('message', msg =>
{
  if (msg.author.bot) return;

sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
	if (!row) {
	  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [msg.author.id, 1, 0]);
	} else {
	  let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
	  if (curLevel > row.level) {
		row.level = curLevel;
		sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${msg.author.id}`);
		msg.channel.send(`Le membre ${msg.author.username} (${msg.author}) est passé au niveau **${curLevel}**.`);
	  }
	  sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
	}
	console.error;
  }).catch(() => {
	sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
	  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [msg.author.id, 1, 0]);
	});
  });

  if (msg.content.startsWith("d.lvl")) {
	sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
	  if (!row) return msg.reply("Vous êtes au niveau 0.");
	  msg.channel.send(`Le membre ${msg.author} est au niveau **${row.level}**.`);
	});
  } else

  if (msg.content.startsWith("d.pts")) {
	sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
	  if (!row) return msg.channel.send("Vous n'avez encore aucun points!");
    if (row.points <= 0)
    {
      sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
    {
      sql.run(`UPDATE scores SET points = 0, level = ${row.level} WHERE userId = ${msg.author.id}`);
    });
  }
	  msg.channel.send(`Le membre ${msg.author} possède **${row.points}** points.`);
	});
  }
	if (msg.content === 'd.help')
  {
	msg.channel.send({
  "embed": {
    "title": "Liste des commandes de Danbot-Ultimate",
    "color": 2285187,
    "timestamp": "2018-04-12T12:42:31.364Z",
    "footer": {
      "icon_url": "https://img.generation-nt.com/jailbreak-phoenix_01C2012C01648753.png",
      "text": "Danbot-Ultimate // Danny // Khronos Inc."
    },
    "thumbnail": {
      "url": "https://img.generation-nt.com/jailbreak-phoenix_01C2012C01648753.png"
    },
    "image": {
      "url": "https://img.generation-nt.com/jailbreak-phoenix_01C2012C01648753.png"
    },
    "author": {
      "name": "Danbot-Ultimate",
      "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Achtung.svg/220px-Achtung.svg.png"
    },
    "fields": [
      {
        "name": "d.help",
        "value": "Affiche cette aide"
      },
      {
        "name": "d.pts",
        "value": "Affiche votre nombre de points"
      },
      {
        "name": "d.lvl",
        "value": "Affiche votre niveau"
      },
      {
        "name": "d.say",
        "value": "Répète votre message"
      },
      {
        "name": "d.cas [votre nombre sur 10]",
        "value": "Parie votre nombre avec 1/10 chances de gagner.\n(+100 xp si gagné, -10 xp si perdu.)"
      },
      {
        "name": "d.caz [votre nombre sur 100]",
        "value": "Parie votre nombre avec 1/100 chances de gagner.\n(+5000 xp si gagné, -100 xp si perdu)"
      },
      {
        "name": "d.ping",
        "value": "Affiche le nombre de ms entre le post de votre message et l'arrivée de votre message"
      },
      {
        "name": "d.monika",
        "value": "JUST MONIKA"
      },
      {
        "name": "d.test",
        "value": "Vérifie que Danbot-Ultimate fonctionne correctement"
      },
      {
        "name": "d.rip",
        "value": "Si un des membres du serveur leave, veuillez utiliser cette commande"
      },
      {
        "name": "d.infos",
        "value": "Affiche les infos de danbot (encore en travail)"
      },
      {
        "name": "d.rire",
        "value": "Vous avez fait une blague incroyable mais personne ne vous comprend?\nCette commande est faite pour vous."
      },
      {
        "name": "d.mdi",
        "value": "Affiche la réponse au Mystère Des Internets"
      },
      {
        "name": "d.pong",
        "value": "..."
      },
      {
        "name": "d.maintenance",
        "value": "Prévient les membres du serveur qu'une maintenance est imminente, et que Danbot-Ultimate sera indisponible durant toute la maintenance"
      },
      {
        "name": "d.purge [votre nombre de 1 à 99]",
        "value": "Supprime le nombre de messages que vous avez indiqué"
      },
      {
        "name": "d.présentation",
        "value": "Affiche une courte présentation de Danbot-Ultimate"
      }
    ]
  }
});
	console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.ping')
  {
	msg.channel.send(new Date().getTime() - msg.createdTimestamp + " ms");
  console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.test')
  {
	msg.channel.send('test');
	console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.rip')
  {
  msg.channel.send('RIP');
  console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.infos')
  {
    msg.channel.send('Danbot ultimate est actuellement sur ' + client.guilds.size + ' serveurs, ' + client.channels.size + ' channels, Pour un total de ' + client.users.size + ' membres.');
  }

  if (msg.content === 'd.rire')
  {
  msg.channel.send('AHAHHAHAHAHAHAHHA TROP DRÔLE TA BLAGUE');
  console.log('\n[!] Message sent.');
  }

    if (msg.content === 'd.pong')
  {
	msg.channel.send('REALLY');
	console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.mdi')
{
msg.channel.send('La réponse au MDI est 42');
console.log('\n[!] Message sent.');
}

if (msg.content === 'd.monika')
{
  msg.channel.send('**just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika just monika**')
  console.log('\n[!] Message sent.');
}

      if (msg.content === 'd.maintenance')
  {
	msg.channel.send('Danbot Ultimate est en maintenance pour une durée indeterminée.');
	console.log('\n[!] Message sent.');
  }
      if (msg.content.startsWith('d.say'))
  {
	const sayMessage = msg.content.substr(6)
  msg.channel.bulkDelete(1)
	msg.channel.send(sayMessage);
  console.log('\n[!] Message sent.');
  }
      if (msg.content.startsWith('d.purge'))
  {
	const nmbMsg = msg.content.substr(9)
  msg.channel.bulkDelete(nmbMsg)
  console.log('\n[!] Message sent.');
  }
	if (msg.content.startsWith('d.cas'))
  {
	let rndNum = Math.floor((Math.random() * 10) + 1);
	let num = msg.content.substr(6)
	if (num == rndNum)
	{
		msg.reply('Vous avez gagné! + 100 XP points')
		sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
		{
			sql.run(`UPDATE scores SET points = ${row.points + 100}, level = ${row.level} WHERE userId = ${msg.author.id}`);
		});
	}
	else
	{
		msg.reply('Vous avez perdu... - 10 XP points\nVotre nombre: ' + num + ' ~\nLe nombre aléatoire: ' + rndNum + '')
			sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
		{
			sql.run(`UPDATE scores SET points = ${row.points - 10}, level = ${row.level} WHERE userId = ${msg.author.id}`);
      if (row.points < 0)
      {
        sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
      {
        sql.run(`UPDATE scores SET points = 0, level = ${row.level} WHERE userId = ${msg.author.id}`);
      });
      }
		});
	}
	console.log('\n[!] Message sent.');
  }

  if (msg.content.startsWith('d.caz'))
  {
  let rndNum = Math.floor((Math.random() * 100) + 1);
  let num = msg.content.substr(6  )
  if (num == rndNum)
  {
    msg.reply('Vous avez gagné! + 5000 XP points')
    sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
    {
      sql.run(`UPDATE scores SET points = ${row.points + 5000}, level = ${row.level} WHERE userId = ${msg.author.id}`);
    });
  }
  else
  {
    msg.reply('Vous avez perdu... - 50 XP points\nVotre nombre: ' + num + ' ~\nLe nombre aléatoire: ' + rndNum + '')
      sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
    {
      sql.run(`UPDATE scores SET points = ${row.points - 50}, level = ${row.level} WHERE userId = ${msg.author.id}`);
      if (row.points < 0)
      {
        sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row =>
      {
        sql.run(`UPDATE scores SET points = 0, level = ${row.level} WHERE userId = ${msg.author.id}`);
      });
      }
    });
  }
  console.log('\n[!] Message sent.');
  }

  if (msg.content === 'd.présentation')
  {
	if (!msg.author.id === '245654892247646208') return;
	msg.channel.send({embed: {
	color: 14356281,
	author: {
	  name: client.user.username,
	  icon_url: client.user.avatarURL
	},
	title: "Présentation Danbot",
	description: "Voici un bot codé par Danny, qui a été aidé par toute l'équipe de Projet Stingray.",
	fields: [{
		name: "Utilisation",
		value: "Vous pouvez utiliser ce bot avec le préfixe `d.`\nFaites `d.help` pour voir une lste des commandes."
	  },
	],
	timestamp: new Date(),
	footer: {
	  icon_url: client.user.avatarURL,
	  text: "© Danny-Ultimate // Khronos Inc."
	}
  }
 });
}
});

client.login('TOKEN');
