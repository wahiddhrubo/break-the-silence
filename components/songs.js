import { BiPlay } from "react-icons/bi";
import { useContext } from "react";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";

export default function Song({
	title,
	index,
	singer,
	duration,
	audio,
	playlst,
	dateAdded,
}) {
	const { playSong } = useContext(BreakTheSilenceContext);
	const styles = {
		Wrapper:
			"text-left cursor-pointer mx-auto shadow-2xl mx-auto border-1 lg:w-[850px] md:w-[750px] w-[350px] my-10 flex gap-5 relative transition-all font-normal text-sm text-[#b3b3b3] hover:text-white group",
		index: "w-[20px]",
		title: "grow font-semibold text-lg text-white w-[250px]",
		singer: "w-1/4",
		date: "w-[10%]",
		duration: "w-[10%]",
		icon: "text-white  w-[35px] h-[35px] invisible transition-all group-hover:visible ",
		iconDiv: "absolute left-0 ",
		iconWrapper:
			"absolute top-[15%] left-2 visible group-hover:invisible  ",
	};

	return (
		<div
			onClick={() => {
				playSong(audio, playlst);
			}}
		>
			<div className={styles.Wrapper}>
				<div className={styles.index}>
					<div className={styles.iconWrapper}>{index}</div>
					<div className={styles.iconDiv}>
						<BiPlay className={styles.icon} />
					</div>
				</div>
				<div className={styles.title}>{title}</div>
				<div className={styles.singer}>{singer}</div>
				<div className={styles.date}>{dateAdded}</div>
				<div className={styles.duration}>{duration}</div>
			</div>
		</div>
	);
}
