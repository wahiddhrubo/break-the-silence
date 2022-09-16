import {
	useMoralis,
	useMoralisQuery,
	useWeb3ExecuteFunction,
	useNewMoralisObject,
	useMoralisWeb3Api,
} from "react-moralis";
import { createContext, useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import toast from "react-hot-toast";
import { primaryColor } from "../lib/constants.js";
import { useIPFS } from "../hooks/useIpfs.js";
import { uploadMetadata } from "../axios/ipfsUpload.js";

export const BreakTheSilenceContext = createContext();

export function BreakTheSilenceContextProvider({ children }) {
	const [currentAccount, setCurrentAccount] = useState("");
	const [formattedAccount, setFormattedAccount] = useState("");
	const [isLoading, setIsLoading] = useState();
	const [userAlbums, setUserAlbums] = useState([]);
	const [playList, setPlayList] = useState();
	const [song, setSong] = useState();
	const [songSinger, setSongSinger] = useState();
	const [songImg, setSongImg] = useState();
	const [songName, setSongName] = useState();
	const [progress, setProgress] = useState();
	const [isPlaying, setIsPlaying] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [volume, setVolume] = useState(false);
	const [timestamp, setTimestamp] = useState();
	const [duration, setDuration] = useState();
	const [loop, setLoop] = useState(true);

	const contractProcessor = useWeb3ExecuteFunction();
	const { save } = useNewMoralisObject("albums");
	const { token } = useMoralisWeb3Api();

	const weiToEth = (wei) => {
		return Moralis.Units.FromWei(wei);
	};

	useEffect(() => {
		if (isPlaying) {
			let audio = document.querySelector("#audio-element");
			audio.addEventListener(
				"timeUpdate",
				() => {
					setTimestamp(secsToMins(audio.currentTime));
					setProgress(audio.currentTime);
					console.log(progress);
				},
				false
			);
		}
	}, [isPlaying]);

	useEffect(() => {
		if (song) {
			setSongName(song.name);
			setSongSinger(song.singer);
			setSongImg(useIPFS(song.image));
			document.querySelector("#audio-element").src = useIPFS(
				song.animation_url
			);
			const newDuration =
				document.querySelector("#audio-element").currentTime;
			const newVolume = document.querySelector("#audio-element").volume;
			setVolume(newVolume);
			document.querySelector("#audio-element").play();
			setDuration(newDuration);
			console.log(newDuration);
			setIsPlaying(true);
		}
	}, [song]);

	const createAlbum = (dta) => {
		save(dta, {
			onSuccess: (albm) => {
				alert("Your Album is Created " + albm.id);
			},
			onError: (error) => {
				alert(
					"Failed to create new object, with error code: " +
						error.message
				);
			},
		});
	};

	const updateProgress = (e) => {
		const _progress = e.target.currentTime / e.target.duration;
		setProgress(_progress.toFixed(2) * 100);
	};

	useEffect(() => {
		const newAudio = document.querySelector("#audio-element");
		const updateSong = () => {
			if (song) {
				setDuration(newAudio.currentTime.duration);
			}
		};
		updateSong();
	}, [song]);

	const PausePlay = () => {
		if (isPlaying) {
			document.querySelector("#audio-element").pause();
		} else {
			document.querySelector("#audio-element").play();
		}
		console.log(isPlaying);
		setIsPlaying((prev) => !prev);
	};

	const playSong = (newSong, newPlayList) => {
		try {
			setSong(newSong);

			if (newPlayList) {
				setPlayList(newPlayList);
			}
		} catch (e) {
			console.log(e);
		}
	};
	const playPlayList = (newPlayList) => {
		try {
			playSong(newPlayList[0], newPlayList);
		} catch (e) {
			console.log(e);
		}
	};

	const secondsToMinSec = (value) => {
		const minute = Math.round(value / 60);
		let second = Math.round(value % 60);
		second = second >= 10 ? second : "0" + second;
		return minute + ":" + second;
	};

	const minToSecs = (value) => {
		const minsec = value.split(":");
		const min = minsec.length == 2 ? parseInt(minsec[0]) : 0;
		const sec =
			minsec.length == 2 ? parseInt(minsec[1]) : parseInt(minsec[0]);
		return min * 60 + sec;
	};

	const fetchSongs = async (ids) => {
		const tokens = await token.getAllTokenIds({
			address: process.env.NEXT_PUBLIC_CONTRACT,
			chain: "mumbai",
		});
		if (ids) {
			let tokensFilteredByIds = tokens.result.filter((t) =>
				ids.includes(parseInt(t.token_id))
			);
			const dta = tokensFilteredByIds.map((d) => JSON.parse(d.metadata));
			console.log(dta);
			return dta;
		} else {
			return null;
		}
	};

	const fetchLatestSong = async () => {
		const tokens = await token.getAllTokenIds({
			address: process.env.NEXT_PUBLIC_CONTRACT,
			chain: "mumbai",
		});

		let latestToken = tokens.result
			.sort((a, b) => b.token_id - a.token_id)
			.slice(0, 8);
		const tokenResult = latestToken.map((t) => {
			const tid = t.token_id;
			const addr = t.token_address;
			const metadta = JSON.parse(t.metadata);
			return { id: tid, metadata: metadta, address: addr };
		});
		return tokenResult;
	};

	const setToken = async (id, tokenid) => {
		const query = new Moralis.Query("albums");
		query.equalTo("objectId", id);
		const result = await query.first();
		const prevToken = result.get("tokenId");
		const tokens = prevToken ? [...prevToken, tokenid] : [tokenid];
		result.set("tokenId", tokens);
		return result.save();
	};
	const favouriteAlbum = async (id) => {
		const query = new Moralis.Query("albums");
		query.equalTo("objectId", id);
		const result = await query.first();
		const prevToken = result.get("favourites");
		const tokens = prevToken
			? [...prevToken, currentAccount]
			: [currentAccount];
		result.set("favourites", tokens);
		result.save();
	};

	const isFavouriteAlbum = async (id) => {
		const query = new Moralis.Query("albums");
		query.equalTo("objectId", id);
		const result = await query.first();
		const prevToken = result.get("favourites");
		const favouriteResult = prevToken
			? prevToken.includes(currentAccount)
			: false;
		return favouriteResult;
	};

	const isCreator = async (id) => {
		const query = new Moralis.Query("albums");
		query.equalTo("objectId", id);
		const result = await query.first();
		const creatorAccount = result.get("account");
		console.log(creatorAccount, currentAccount);
		return creatorAccount === currentAccount;
	};

	const removeFavouriteAlbum = async (id) => {
		const query = new Moralis.Query("albums");
		query.equalTo("objectId", id);
		const result = await query.first();
		const prevToken = result.get("favourites");
		const tokens = prevToken.filter((item) => item !== currentAccount);
		result.set("favourites", tokens);
		result.save();
	};

	const mintToken = async (metaDta, objectId) => {
		const URI = await uploadMetadata(metaDta);
		console.log(URI);
		let options = {
			contractAddress: process.env.NEXT_PUBLIC_CONTRACT,
			functionName: "createToken",
			abi: [
				{
					inputs: [
						{
							internalType: "string",
							name: "tokenURI",
							type: "string",
						},
					],
					name: "createToken",
					outputs: [
						{ internalType: "uint256", name: "", type: "uint256" },
					],
					stateMutability: "payable",
					type: "function",
				},
			],
			params: {
				tokenURI: URI,
			},
			msgValue: 0,
		};
		const transaction = await contractProcessor.fetch({
			params: options,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
		});

		const receipt = await transaction.wait();
		let tokenid = parseInt(receipt.events[0].topics[3], 16);
		console.log(tokenid);
		setToken(objectId, tokenid);
	};

	const secondsToHourSec = (sec) => {
		let totalSeconds = sec;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		return hours ? hours + "h " + minutes + "m" : minutes + "m";
	};
	const onProgressChange = (e) => {
		const _progress = e.target.value / 100;
		document.querySelector("#audio-element").currentTime =
			_progress * document.querySelector("#audio-element").duration;
		setProgress(e.target.value);
		console.log(e.target.value);
	};

	const updateVolume = (e) => {
		try {
			setVolume(e.target.value);
			document.querySelector("#audio-element").volume = e.target.value;
		} catch (e) {}
	};

	const onVolumeChange = (e) => {
		const _volume = e.target.value / 100;
		document.querySelector("#audio-element").volume = _volume;
	};

	const PlayNext = () => {
		console.log("loop", loop);
		if (loop) {
			const id = playList.findIndex((value) => value === song);
			if (playList.length === id + 1) {
				playSong(playList[0]);
				return;
			}
			const nextSong = playList[id + 1];
			playSong(nextSong);
		} else {
			const randId = Math.floor(Math.random() * playList.length);
			playSong(playList[randId]);
		}
	};

	const playPrevious = () => {
		const id = playList.findIndex((value) => value === song);
		if (id === 0) {
			playSong(playList[playList.length - 1]);
		} else {
			const previousSong = playList[id - 1];
			playSong(previousSong);
		}
	};

	const {
		authenticate,
		isAuthenticated,
		enableWeb3,
		Moralis,
		user,
		isWeb3Enabled,
	} = useMoralis();

	const setAll = async () => {
		if (!isWeb3Enabled) {
			await enableWeb3();
		}
		if (isAuthenticated) {
			const currentUserAccount = await user?.get("ethAddress");
			const album = await user?.get("albums");
			const currentFormattedAccount =
				currentUserAccount.slice(0, 4) +
				"..." +
				currentUserAccount.slice(-4);
			setCurrentAccount(currentUserAccount);
			setFormattedAccount(currentFormattedAccount);
		}
	};

	const getUserAlbum = async () => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("albums");
		const query = new Moralis.Query(results);
		query.equalTo("account", currentAccount);

		const result = await query.find();
		const albums = result.map((a) => a.attributes);
		return result;
	};

	const getFeaturedAlbum = async () => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("albums");
		const query = new Moralis.Query(results);
		query.equalTo("featured", true);
		const result = await query.find();
		return result;
	};
	const getLatestAlbum = async () => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("albums");
		const query = new Moralis.Query(results);
		query.equalTo("created", true);
		query.descending("createdAt");
		const result = await query.find();
		console.log();
		return result.slice(0, 6);
	};

	const getAlbumByNameOrSinger = async (src) => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("albums");
		const query = new Moralis.Query(results);
		query.equalTo("created", true);
		query.descending("createdAt");
		const result = await query.find();
		const resultByName = result.filter((a) =>
			a.attributes.title.toLowerCase().includes(src.toLowerCase())
		);

		const resultBySinger = result.filter((a) =>
			a.attributes.singer.toLowerCase().includes(src.toLowerCase())
		);
		const totalResult = resultByName.concat(resultBySinger);
		return totalResult;
	};

	const getDuration = (src) => {
		var au = document.createElement("audio");
		au.src = `https://ipfs.io/ipfs/${src}`;
		au.addEventListener(
			"loadedmetadata",
			function () {
				var duration = au.duration;
				console.log(
					"The duration of the song is of: " + duration + " seconds"
				);
			},
			false
		);
	};

	const fetchAlbum = async (id) => {
		if (id) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("albums");
			const query = new Moralis.Query(results);
			query.equalTo("objectId", id);

			const result = await query.find();
			const newAlbum = result.map((r) => r.attributes);
			console.log(newAlbum, id);
			return newAlbum;
		} else {
			return false;
		}
	};

	useEffect(() => {
		const fetchUserAlbums = async () => {
			if (currentAccount) {
				const newAlbums = await getUserAlbum();
				console.log(newAlbums);
				setUserAlbums(newAlbums);
			} else {
				console.log({ currentAccount: currentAccount });
			}
		};
		fetchUserAlbums();
	}, [currentAccount]);

	const Looping = (tf) => {
		setLoop(tf);
		console.log(tf, loop);
	};

	useEffect(() => {
		if (user) {
			setAll();
		}
	}, [user]);

	const setAlbum = async (albm) => {
		if (!isWeb3Enabled) {
			await enableWeb3();
		}
		if (isAuthenticated) {
			if (albm) {
				console.log(isAuthenticated, isWeb3Enabled);
				const prevAlbm = await user?.get("albums");
				console.log(prevAlbm);
				user.set("albums", [...prevAlbm, albm]);
				user.save();
				const newAlbm = user.get("albums");
				console.log(newAlbm);
			} else {
				console.log(albm);
			}
		} else {
			console.log("No User");
		}
	};

	const {
		data: userData,
		error: userDataError,
		isLoading: userDataIsLoading,
	} = useMoralisQuery("_User");

	const logOut = async () => {
		await Moralis.User.logOut();
		console.log("logged Out");
	};

	const connectWallet = async () => {
		await enableWeb3();
		await Moralis.authenticate({
			signingMessage: "Break The Silence Authentication",
		}).then(console.log("login complete"));
	};

	return (
		<BreakTheSilenceContext.Provider
			value={{
				formattedAccount,
				isAuthenticated,
				isLoading,
				setIsLoading,
				currentAccount,
				logOut,
				connectWallet,
				weiToEth,
				userAlbums,
				setAlbum,
				playList,
				setPlayList,
				song,
				setSong,
				isPlaying,
				PlayNext,
				playPrevious,
				timestamp,
				updateVolume,
				volume,
				onVolumeChange,
				PausePlay,
				playSong,
				playPlayList,
				songSinger,
				songImg,
				songName,
				duration,
				onProgressChange,
				Looping,
				updateProgress,
				createAlbum,
				fetchAlbum,
				getDuration,
				isModalOpen,
				setIsModalOpen,
				secondsToMinSec,
				mintToken,
				setToken,
				fetchSongs,
				minToSecs,
				secondsToHourSec,
				favouriteAlbum,
				isFavouriteAlbum,
				isCreator,
				removeFavouriteAlbum,
				currentAccount,
				progress,
				setProgress,
				getFeaturedAlbum,
				fetchLatestSong,
				getAlbumByNameOrSinger,
				getLatestAlbum,
			}}
		>
			{children}
		</BreakTheSilenceContext.Provider>
	);
}
