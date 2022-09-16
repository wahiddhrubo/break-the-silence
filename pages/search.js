import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Card from "../components/card.js";

export default function MyAlbum() {
	const router = useRouter();
	const [albums, setAlbums] = useState();
	const { getAlbumByNameOrSinger } = useContext(BreakTheSilenceContext);
	const { id } = router.query;
	useEffect(() => {
		const getAlbum = async () => {
			if (id) {
				const newAlbums = await getAlbumByNameOrSinger(id);
				setAlbums(newAlbums);
			}
		};
		getAlbum();
	}, [id]);
	return (
		<div className="min-h-screen p-20 text-center font-semibold lg:pl-[50px] ">
			<div className="text-center text-5xl leading-normal font-semibold">
				Your Searched Albums
			</div>
			<div className="lg:mr-auto lg:ml-[50px] text-center text-lg font-normal mx-auto h-min-screen lg:w-full flex flex-wrap gap-20 mx-auto w-[250px] mt-[80px] ">
				{albums &&
					albums.map((a) => (
						<div key={a.attributes.ipfs}>
							<Card
								img={a.attributes.image}
								title={a.attributes.title}
								singer={a.attributes.singer}
								year={a.attributes.year}
								id={a.id}
							/>
						</div>
					))}
			</div>
		</div>
	);
}
