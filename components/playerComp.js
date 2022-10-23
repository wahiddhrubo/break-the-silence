import { useContext } from "react";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useIPFS } from "../hooks/useIpfs.js";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause, BiShuffle, BiVolumeFull } from "react-icons/bi";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { ImLoop } from "react-icons/im";

export default function PlayerComp() {
	const playing = true;
	const {
		song,
		isPlaying,
		loop,
		progress,
		PlayNext,
		playPrevious,
		updateVolume,
		timestamp,
		volume,
		onVolumeChange,
		PausePlay,
		songSinger,
		songImg,
		songName,
		duration,
		onProgressChange,
		Looping,
		updateProgress,
	} = useContext(BreakTheSilenceContext);

	console.log(timestamp);

	const newSong = {
		image: "ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6",

		name: "Head Shoulder",
		animation_url:
			"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/3",
		duration: "0:09",
		singer: "Snoop Jay",
		year: "2022",
	};
	const styles = {
		Wraper: "w-screen  p-2  lg:h-[120px] h-[85px] shadow-2xl bg-[#121212] absolute bottom-0 sticky ",
		flexWraper:
			"flex  lg:gap-10 w-[350px] gap-5  lg:w-[1050px] md:w-[650px]  mx-auto ",
		imgDiv: "flex gap-3  lg:p-5 p-2",
		image: "lg:w-[70px] lg:h-[70px] hidden lg:block w-[45px] h-[45px] text-[12px] text-[#b3b3b3] ",
		title: "text-[16px] whitespace-nowrap font-semibold text-white ",
		controlDiv: "lg:w-1/2 w-[175px]  my-auto",
		controls:
			"flex lg:gap-3 gap-1 text-center mx-auto lg:w-[215px] w-[150px] ",
		newSongProgress:
			"w-full  outline-0  cursor-pointer text-black form-range visited:bg-black bg-white h-[2px]",
		volmeDiv: "flex group gap-2 my-auto",
		volume: "w-[80%] outline-0 my-auto cursor-pointer text-black  bg-white h-[2px]",
		titleDiv: "text-[#b3b3b3] text-[12px] my-auto",
		icons: "block hover:text-green-dark lg:w-[32px] lg:h-[32px] w-[27px] h-[27px] text-[#b3b3b3]  ",
		volumeIcon:
			"block group-hover:text-green-dark w-[28px] h-[28px] text-[#b3b3b3]  ",
		play: "block p-[6px] lg:w-[38px] w-[28px] hover:scale-[1.1] transition-all h-[28px] lg:h-[38px] hover:bg-green-dark rounded-full text-black bg-white ",
	};
	const activeLoop = loop ? "green" : "";
	const activeShuffle = !loop ? "green" : "";

	return (
		<>
			{song ? (
				<div className={styles.Wraper}>
					<div className={styles.flexWraper}>
						<div className={styles.imgDiv}>
							<img
								src={songImg}
								height={150}
								width={150}
								className={styles.image}
							/>
							<div className={styles.titleDiv}>
								<div className={styles.title}>{songName}</div>
								{songSinger}
							</div>
						</div>
						<div className={styles.controlDiv}>
							<div className={styles.controls}>
								<div
									onClick={() => {
										Looping(false);
									}}
								>
									<BiShuffle
										className={styles.icons}
										color={activeShuffle}
									/>
								</div>
								<div
									onClick={() => {
										playPrevious();
									}}
								>
									<MdSkipPrevious className={styles.icons} />
								</div>
								<div
									onClick={() => {
										PausePlay();
									}}
								>
									{!isPlaying ? (
										<BsFillPlayFill
											className={styles.play}
										/>
									) : (
										<BiPause className={styles.play} />
									)}
								</div>
								<div
									onClick={() => {
										PlayNext();
									}}
								>
									<MdSkipNext className={styles.icons} />
								</div>
								<div
									onClick={() => {
										Looping(true);
									}}
									style={{
										color: loop ? "#1abc54 !important" : "",
									}}
								>
									<ImLoop
										className={styles.icons}
										color={activeLoop}
									/>
								</div>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								onChange={(e) => onProgressChange(e)}
								value={progress}
								className={styles.newSongProgress}
							/>
						</div>
						<div className={styles.volmeDiv}>
							{timestamp}
							<BiVolumeFull className={styles.volumeIcon} />
							<input
								type="range"
								min="1"
								max={duration}
								className={styles.volume}
								onChange={(e) => onVolumeChange(e)}
							/>
							{duration}
						</div>
					</div>
				</div>
			) : (
				""
			)}
			<audio
				id="audio-element"
				hidden
				onTimeUpdate={(e) => updateProgress(e)}
				onEnded={PlayNext}
			/>
		</>
	);
}
