import Modal from "react-modal";
import { useState, useEffect, useContext, useRef } from "react";
import { uploadToIpfs, uploadMetadata } from "../axios/ipfsUpload.js";
import Button from "../components/button.js";
import Loader from "../components/loader.js";
import ProgressBar from "../components/progressBar.js";
import { AiOutlineClose } from "react-icons/ai";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import {
	checkEmptyField,
	getInputFileDuration,
} from "../components/formvalidation.js";

export default function UploadModal({ image, color, albumName, objectId }) {
	const [name, setName] = useState();
	const [progress, setProgress] = useState();
	const [loading, setIsLoading] = useState();
	const [singer, setSinger] = useState();
	const [year, setYear] = useState();
	const [duration, setDuration] = useState();
	const [audioIpfs, setAudioIpfs] = useState();

	const { isModalOpen, setIsModalOpen, secondsToMinSec, mintToken } =
		useContext(BreakTheSilenceContext);

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const fileUploader = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			let media = new Audio(reader.result);
			media.onloadedmetadata = function () {
				const newDuration = secondsToMinSec(media.duration);
				setDuration(newDuration);
			};
		};
		reader.readAsDataURL(file);
		const hash = await uploadToIpfs(file, setProgress);
		setAudioIpfs(hash);
	};

	const metaData = {
		name: name,
		image: image,
		album: albumName,
		singer: singer,
		year: year,
		duration: duration,
		animation_url: `ipfs://${audioIpfs}`,
	};

	const formdta = [
		{ name: name },
		{ image: image },
		{ album: albumName },
		{ singer: singer },
		{ duration: duration },
		{ year: year },
		{ animation_url: audioIpfs },
	];
	const error = checkEmptyField(formdta);
	const mintAudio = () => {
		if (!error) {
			setIsLoading(true);
			mintToken(metaData, objectId);
			setIsLoading(false);
			setIsModalOpen(false);
		} else {
			console.log(error.join(" "));
		}
	};
	const style = {
		title: "text-3xl font-semibold",
		close: "relative left-full bottom-[20%] w-[30px] cursor-pointer",
		closeIcon: "w-[25px] h-[25px] ",
		Modal: "bg-black absolute inset-0   p-20 text-center text-white w-[850px] h-[600px] m-auto",
		NameInput:
			"!border-[2px] border-white w-[60%] px-5 !outline-0 text-[18px] m-3 w-[250px] my-5 cursor-pointer h-[50px] placeholder:text-white placeholder:font-semibold capital bg-transparent ",
		disabledInput:
			"!border-[2px] border-grey !outline-0 w-[20%] text-[18px] text-center m-3  my-5 h-[50px] placeholder:text-grey placeholder:font-semibold capital bg-transparent ",
		subInput:
			"!border-[1px] h-[45px] px-5 m-3 !outline-0 text-xl cursor-pointer placeholder:text-white placeholder:font-semibold my-[2px] bg-transparent ",
		FileInput: ` bg-white pt-1 block hover:!border-black hover:border-green-dark text-black font-semibold cursor-pointer m-auto w-[250px] hover:text-black text-center text-lg h-[45px] hover:bg-white !transition-all hover:border-2 hover:border-green-dark rounded-full border-2 border-white`,
	};
	return (
		<>
			{progress ? (
				<ProgressBar progress={progress} />
			) : loading ? (
				<Loader />
			) : (
				""
			)}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				className={style.Modal}
			>
				<h2 className={style.title}>Upload Audio</h2>
				<div onClick={closeModal} className={style.close}>
					<AiOutlineClose className={style.closeIcon} />
				</div>
				<div className="mt-[-10px] mb-10">Add A New file To Album</div>

				<div className="text-center ">
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						placeholder="Song Name"
						className={style.NameInput}
					/>
					<input
						type="text"
						disabled
						value={duration}
						placeholder="Duration"
						className={style.disabledInput}
					/>
					<br />
					<input
						type="text"
						onChange={(e) => setSinger(e.target.value)}
						placeholder="Singer"
						className={style.subInput}
					/>

					<input
						type="text"
						onChange={(e) => setYear(e.target.value)}
						placeholder="Year"
						className={style.subInput}
					/>
				</div>

				<hr className="text-white border-t-2 mx-auto w-[300px] my-10" />
				{audioIpfs && `Your IPFS Url : ${metaData.animation_url} `}
				<label htmlFor="input" className={style.FileInput}>
					Upload Audio
					<input
						id="input"
						type="file"
						className="hidden"
						onChange={(e) => fileUploader(e)}
					/>
				</label>

				<div className="text-right my-10">
					{error ? (
						<Button
							type="DisabledSearchButton"
							text="Mint Audio"
							onClick={mintAudio}
						/>
					) : (
						<Button
							type="DefaultButton"
							text="Mint Audio"
							onClick={mintAudio}
						/>
					)}
				</div>
			</Modal>
		</>
	);
}
