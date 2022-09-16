import SideBar from "./sidebar.js";
import Player from "./playerComp.js";
import ProgressBar from "./progressBar.js";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Loader from "./loader.js";

export default function ({ children }) {
	const { isLoading, uploadProgress } = useContext(BreakTheSilenceContext);
	return (
		<>
			<>
				<div className="h-min-screen ">
					<div className=" flex text-white  bg-[#161616]">
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
