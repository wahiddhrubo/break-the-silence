import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { primaryColor } from "../lib/constants.js";
import { uploadToIpfs } from "../axios/ipfsUpload.js";
import AlbumCover from "../components/profileimage.js";
import Button from "../components/button.js";
import { checkEmptyField } from "../components/formvalidation.js";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useRouter } from "next/router";

export default function MintAlbum() {
	const router = useRouter();

	const [ipfsHash, setIpfsHash] = useState();
	const [potraitImg, setPotraitImg] = useState();
	const [name, setName] = useState();
	const [singer, setSinger] = useState();
	const [color, setColor] = useState();
	const [year, setYear] = useState();

	const { createAlbum, currentAccount, setIsLoading } = useContext(
		BreakTheSilenceContext
	);
	const album = {
		title: name,
		image: `https://ipfs.io/ipfs/${ipfsHash}`,
		ipfs: `ipfs://${ipfsHash}`,
		color: color,
		singer: singer,
		year: year,
		potraitImg: potraitImg ? `https://ipfs.io/ipfs/${potraitImg}` : null,
		account: currentAccount,
		created: true,
	};
	const formData = [
		{ title: name },
		{ image: ipfsHash ? `https://ipfs.io/ipfs/${ipfsHash}` : "" },
		{ ipfs: ipfsHash ? `ipfs://${ipfsHash}` : "" },
		{ color: color },
		{ singer: singer },
		{ year: year },
	];

	const createAlbumHandler = () => {
		const errors = checkEmptyField(formData);
		if (!errors) {
			setIsLoading(true);
			createAlbum(album);
			setIsLoading(false);
			router.push("/");
		} else {
			console.log(errors.join(""));
		}
	};

	const style = {
		NameInput:
			"!border-0 !outline-0 text-[35px] w-[350px] cursor-pointer h-[70px] placeholder:text-white placeholder:font-semibold capital bg-transparent ",
		Singer: "!border-0 !outline-0 text-xl cursor-pointer placeholder:text-white placeholder:font-semibold my-[2px] bg-transparent ",
		Year: "!border-0 !outline-0 text-lg cursor-pointer placeholder:text-white font-normal bg-transparent ",
		Wrapper: "min-h-screen p-20 text-center font-semibold pl-[50px] ",
		Title: " mb-20 text-center text-[40px] ",
		FlexWrap: " my-[50px] mx-auto lg:w-[800px] flex gap-10 text-left",
		FileInput: ` pt-1 block hover:!border-black hover:border-green-dark cursor-pointer m-auto w-[500px] hover:text-black text-center text-lg h-[45px] hover:bg-white !transition-all hover:border-2 hover:border-[${primaryColor}] rounded-full border-2 border-white`,
	};

	const fileUploader = async (e) => {
		setIsLoading(true);
		const file = e.target.files[0];
		const hash = await uploadToIpfs(file);
		setPotraitImg(hash);
		setIsLoading(false);
	};
	return (
		<div className={style.Wrapper}>
			<div className={style.Title}>
				Create A New Album
				<div className={style.FlexWrap}>
					<div>
						<AlbumCover
							setIpfsHash={setIpfsHash}
							ipfsHash={ipfsHash}
							setColor={setColor}
							setIsLoading={setIsLoading}
						/>
					</div>
					<div className="my-auto text-left">
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
							placeholder="Album Name..."
							className={style.NameInput}
						/>
						<br />
						<input
							type="text"
							onChange={(e) => setSinger(e.target.value)}
							placeholder="Singer"
							className={style.Singer}
						/>

						<input
							type="text"
							onChange={(e) => setYear(e.target.value)}
							placeholder="Year"
							className={style.Year}
						/>
					</div>
				</div>
				<hr className="text-white border-t-2 mx-auto w-[300px] my-10" />
				<p className="text-lg font-normal block my-10">Optional</p>
				<label htmlFor="album-potrait" className={style.FileInput}>
					Choose Potrait Cover
					<input
						id="album-potrait"
						type="file"
						placeholder="Choose Potrait Cover"
						className="hidden"
						onChange={fileUploader}
					/>
				</label>
			</div>
			<div className="ml-auto">
				<Button
					type="DefaultButton"
					onClick={createAlbumHandler}
					text="Create Album"
				/>
				<p className="text-lg font-normal block my-10"></p>
			</div>
		</div>
	);
}
