const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "JOHAN",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: 'J O H A N - LIBERT',
				gender: 'M A L E',
				Birthday: 'বলব না 😼,
				religion: 'I S L A M 🕋',
				hobby: 'C Y B E R - S E C U R I T Y',
				Fb: 'https://www.facebook.com/profile.php?id=61552024257153',
				Relationship: 'S A M I H A',
			};

			const bold = 'https://drive.google.com/uc?export=download&id=1J4yQ13L2WTpdOuqcP0yEmzULACdwfvnQ';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 NAME : ${ownerInfo.name}
 GANDER : ${ownerInfo.gender}
 BIRTHDAY : ${ownerInfo.Birthday}
 RELIGION : ${ownerInfo.religion}
 RLSNSHIP : ${ownerInfo.Relationship}
 HOBBY : ${ownerInfo.hobby}
 FB : ${ownerInfo.Fb}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);
			
			fs.unlinkSync(videoPath);

			api.setMessageReaction('😍', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	},

	onChat: async function ({ api, event }) {
		if (event.body && event.body.toLowerCase() === "owner") {
			this.onStart({ api, event });
		}
	}
};
