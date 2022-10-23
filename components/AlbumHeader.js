import Image from "next/image";

export default function AlbumHeader({ album, totalDuration, songNo }) {
	const styles = {
		Header: `  `,
		flexWrap:
			"lg:flex flex-grow text-left lg:w-[850px] mx-auto gap-10 py-20 font-bold  capitalize",

		image: "!w-[200px] !h-[200px] shadow-2xl mr-auto ml-[50px] ",
		HeaderWrapper: `h-full w-full bg-gradient-to-b from-transparent to-[#00000099]  `,
		imageWrapper: "lg:mr-auto mx-auto lg:ml-[50px] w-[200px]",
		title: "font-black tracking-normal leading-tight md:text-[45px] text-[30px] lg:text-[76px] ",
	};

	return (
		<div style={{ backgroundColor: album.color }} className={styles.Header}>
			<div className={styles.HeaderWrapper}>
				<div className={styles.flexWrap}>
					<div className={styles.imageWrapper}>
						<Image
							src={album.image}
							alt={album.title}
							height={200}
							width={200}
						/>
					</div>
					<div className="mr-auto my-auto  text-center lg:text-left lg:h-[150px] text-sm lg:w-2/3">
						Album
						<div className={styles.title}>{album.title}</div>
						{album.singer} • {songNo} Songs{" "}
						{totalDuration ? " • Duration " + totalDuration : ""}
					</div>
				</div>
			</div>
		</div>
	);
}
