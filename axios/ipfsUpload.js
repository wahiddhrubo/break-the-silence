const IPFS = require("ipfs-api");
const axios = require("axios");

const ipfs = new IPFS({
	host: "api.pinata.cloud/pinning/pinFileToIPFS",
	port: 5001,
	protocol: "https",
});

export const uploadToIpfs = async (file, setUploadProgress) => {
	console.log(file);
	try {
		const formData = new FormData();
		formData.append("file", file);
		const resFile = await axios({
			method: "post",
			url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
			data: formData,
			headers: {
				pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
				pinata_secret_api_key:
					process.env.NEXT_PUBLIC_PINATA_API_SECRET,
				"Content-Type": "multipart/form-data",
			},

			onUploadProgress: (p) => {
				const percent = Math.round((p.loaded / p.total) * 100);
				if (setUploadProgress) {
					setUploadProgress(percent);
					if (percent === 100) {
						setUploadProgress(false);
					}
				}
			},
		});

		const ImgHash = `${resFile.data.IpfsHash}`;
		console.log(ImgHash);
		return ImgHash;

		//Take a look at your Pinata Pinned section, you will see a new file added to you list.
	} catch (error) {
		setUploadProgress(false);
		console.log("Error sending File to IPFS: ");
		console.log(error);
	}
};

export const uploadMetadata = async (dta) => {
	console.log(dta);
	const data = JSON.stringify(dta);
	try {
		const resFile = await axios({
			method: "post",
			url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
			data: data,
			headers: {
				pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
				pinata_secret_api_key:
					process.env.NEXT_PUBLIC_PINATA_API_SECRET,
				"Content-Type": "application/json",
			},
		});

		const metaHash = `${resFile.data.IpfsHash}`;
		console.log(metaHash);
		return `ipfs://${metaHash}`;
	} catch (error) {
		console.log("Error sending File to IPFS: ");
		console.log(error);
	}
};
