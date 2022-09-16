import Image from "next/image";
import { BiPlay } from "react-icons/bi";
import SongDiv from "../../components/songs.js";
import Loader from "../../components/loader.js";
import Favourite from "../../components/favouriteIcon.js";
import ProgressBar from "../../components/progressBar.js";
import UploadFile from "../../components/uploadModal.js";
import { useAlbum } from "../../hooks/useAlbum.js";
import AlbumHeader from "../../components/AlbumHeader.js";
import { BreakTheSilenceContext } from "../../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

export default function Album() {
	const router = useRouter();
	const { id } = router.query;

	const [loading, setLoading] = useState();
	const [songsDta, setSongsDta] = useState();
	const [isFavourite, setIsFavourite] = useState();
	const [progress, setProgress] = useState();
	const [album, setAlbum] = useState();
	const [userView, setUserView] = useState();
	const tokenIds = album ? album.tokenId : [];
	const {
		isCreator,
		playSong,
		playPlayList,
		fetchAlbum,
		minToSecs,
		setIsModalOpen,
		fetchSongs,
		favouriteAlbum,
		secondsToHourSec,
		isFavouriteAlbum,
		removeFavouriteAlbum,
		isAuthenticated,
		currentAccount,
	} = useContext(BreakTheSilenceContext);
	const durations = songsDta
		? songsDta.map((s) => minToSecs(s.duration))
		: null;
	const totalDuration = durations
		? secondsToHourSec(
				durations.reduce((partialSum, a) => partialSum + a, 0)
		  )
		: 0;

	useEffect(() => {
		const getAlbum = async () => {
			if (id) {
				setLoading(true);
				const newAlbum = await fetchAlbum(id);
				const isFavourited = await isFavouriteAlbum(id);
				setIsFavourite(isFavourited);
				const user = await isCreator(id);
				setUserView(user);
				setAlbum(newAlbum[0]);
				console.log(isFavourited);
				setLoading(false);
			}
		};
		getAlbum();
	}, [id, currentAccount]);

	useEffect(() => {
		const getSongs = async () => {
			if (album) {
				const newSong = await fetchSongs(album.tokenId);
				setSongsDta(newSong);
			}
		};
		getSongs();
	}, [album]);

	const favouriteHandler = () => {
		favouriteAlbum(id);
		setIsFavourite(true);
		alert("Added To Favourited");
	};
	const removeFavouriteHandler = () => {
		removeFavouriteAlbum(id);
		setIsFavourite(false);
		alert("Removed From Favourited");
	};

	const styles = {
		songDiv: "relative pb-10 isolate bg-[#121212] lg:min-h-[700px] ",
		songIsolation: `w-full blur-2xl opacity-20 absolute h-[250px] z-[-2] bg-gradient-to-b from-[${
			album ? album.color : "white"
		}] to-[#00000099]`,
		iconWrapper:
			"  p-2 transition-all cursor-pointer shadow-2xl hover:bg-white text-black rounded-full bg-green-dark  text-center ",
		icon: "w-[45px] h-[45px]  m-auto ",
		songButtons: "flex  mr-auto py-10 mx-auto w-[150px] gap-10",
		btn: "my-auto text-white w-[250px] h-[75px] bg-black hover:text-black hover:bg-white transition-all py-2 px-5 font-semibold rounded-md border-1 text-2xl pt-5 my-auto ",
	};

	return (
		<>
			{album && (
				<UploadFile
					albumName={album.title}
					image={album.ipfs}
					color={album.color}
					objectId={id}
				/>
			)}
			{album ? (
				<div>
					<AlbumHeader
						album={album}
						totalDuration={totalDuration}
						songNo={songsDta ? songsDta.length : 0}
					/>

					<div className={styles.songDiv}>
						<div
							className={styles.songIsolation}
							style={{
								backgroundImage: `linear-gradient(rgba(0,0,0,.6) ,${album.color} , rgba(0,0,0,0)  100% )`,
							}}
						></div>
						<div className={styles.songButtons}>
							<div
								onClick={() => {
									playPlayList(songsDta);
								}}
								className={styles.iconWrapper}
							>
								<BiPlay className={styles.icon} />
							</div>
							<div className="my-auto">
								{userView ? (
									<div
										className={styles.btn}
										onClick={() => setIsModalOpen(true)}
									>
										Add A Song
									</div>
								) : (
									<Favourite
										isLoggedIn={isAuthenticated}
										isFavourited={isFavourite}
										removeFavourite={removeFavouriteHandler}
										addFavourite={favouriteHandler}
									/>
								)}
							</div>
						</div>
						<div>
							{songsDta &&
								songsDta.map((s) => (
									<SongDiv
										title={s.name}
										index={songsDta.indexOf(s) + 1}
										singer={s.singer}
										duration={s.duration}
										dateAdded={s.year}
										audio={s}
										playlst={songsDta}
									/>
								))}
						</div>
					</div>
				</div>
			) : (
				<div className="h-screen">{album}</div>
			)}
		</>
	);
}
