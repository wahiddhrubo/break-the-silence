import SideBar from "./sidebar.js";
import Player from "./playerComp.js";
import ProgressBar from "./progressBar.js";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Loader from "./loader.js";
import Navbar from "./navbar.js";

export default function Wrapper({ children }) {
	const { isLoading, uploadProgress } = useContext(BreakTheSilenceContext);
	return (
		<>
			<>
				<Navbar />
				<div className="h-min-screen ">
					<div className=" flex text-white  bg-[#000b0d]">
						<SideBar />
						<div className="w-full mx-auto text-center">
							{children}
						</div>
					</div>
				</div>
				<Player />
			</>
		</>
	);
}
