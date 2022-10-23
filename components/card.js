import Image from "next/image";
import Link from "next/link";
import { BiPlay } from "react-icons/bi";
export default function Card({ img, title, singer, year, id }) {
	const styles = {
		wrapper:
			"lg:w-[210px] md:w-[150px] w-[150px] text-sm rounded-[10px] transition-all bg-[#181818] hover:bg-[#282828] p-[15px] cursor-pointer group shadow-2xl ",
		img: "!w-[150px]  rounded-[5px] shadow-xl my-5",
		title: "font-bold",
		singer: "my-2",
		iconWrapper:
			" opacity-0 z-10 p-1 hidden lg:block md:block transition-all shadow-2xl group-hover:opacity-100 hover:bg-green-light text-black rounded-full bg-green-dark ml-auto bottom-[50px] left-[130px] relative",
		icon: "w-[25px] h-[25px]",
	};
	return (
		<Link
			href={{
				pathname: `/album/${id}`,
			}}
		>
			<div className={styles.wrapper}>
				<Image
					src={img}
					width={350}
					className={styles.img}
					height={350}
				/>
				<div className="relative top-0 left-0">
					<div className="absolute">
						<div className={styles.iconWrapper}>
							<BiPlay className={styles.icon} />
						</div>
					</div>
				</div>
				<div className={styles.title}>{title}</div>
				<div className={styles.singer}>
					{singer}
					<br /> ({year})
				</div>
			</div>
		</Link>
	);
}
