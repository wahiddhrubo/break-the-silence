import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Card from "../components/card.js";

export default function MyAlbum() {
	const { userAlbums } = useContext(BreakTheSilenceContext);
	return (
		<div className="min-h-screen p-20 text-center font-semibold lg:pl-[50px] ">
			<div className="text-center text-5xl leading-normal font-semibold">
				Your Albums
			</div>
			<div className="lg:mr-auto lg:ml-[50px] text-center text-lg font-normal mx-auto h-min-screen lg:w-full flex flex-wrap gap-20 mx-auto w-[250px] mt-[80px] ">
				{userAlbums
					? userAlbums.map((a) => (
							<div key={a.attributes.ipfs}>
								<Card
									img={a.attributes.image}
									title={a.attributes.title}
									singer={a.attributes.singer}
									year={a.attributes.year}
									id={a.id}
								/>
							</div>
					  ))
					: "No Albums Added Yet"}
			</div>
		</div>
	);
}
