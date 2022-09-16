import { BiPlay } from "react-icons/bi";
import { useContext } from "react";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";

export default function Song({
	id,
	title,
	index,
	singer,
	audio,
	playlst,
	dateAdded,
}) {
	const { playSong } = useContext(BreakTheSilenceContext);
	const styles = {
		Wrapper:
			"text-left cursor-pointer shadow-3xl mx-auto border-1 h-[80px] bg-[#121212] lg:w-[950px]  md:w-[750px] w-[350px] my-10 flex gap-5 relative transition-all font-normal text-base text-[#b3b3b3]  group",
		index: "w-[20px]",
		title: "w-[300px] font-semibold my-auto h-[28px] text-lg text-white",
		singer: "w-1/4 my-auto group-hover:text-white h-[28px] ",
		date: "w-[10%] my-auto h-[28px] group-hover:text-white",
		link: "p-2 px-5 border-white border-[1px] hover:bg-green-900  my-auto",
		icon: "text-white  w-[35px] h-[35px] invisible transition-all group-hover:visible ",
		iconDiv: "absolute left-2 top-[24px] ",
		iconWrapper:
			"absolute top-[26px] left-5 visible group-hover:invisible  ",
	};

	return (
		<div
			onClick={() => {
				playSong(audio);
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
				<div className={styles.link}>See On Openseas</div>
			</div>
		</div>
	);
}
