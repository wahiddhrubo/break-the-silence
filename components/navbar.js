import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Button from "../components/button.js";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import Hamburger from "../components/hamburger.js";

export default function Sidebar() {
	const [srch, setSrch] = useState();
	const {
		formattedAccount,
		isAuthenticated,
		currentAccount,
		logOut,
		connectWallet,
	} = useContext(BreakTheSilenceContext);

	return (
		<div className="lg:hidden h-[85px] content-center bg-black  justify-center gap-5 flex ">
			<div className="text-gray-100 w-[100px] text-xl">
				<Link
					href={{
						pathname: "/",
					}}
				>
					<div className="h-10 mt-[30px]">
						<h1 className="font-bold text-gray-200 text-[15px] ml-3">
							TailwindCSS
						</h1>
						<i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
					</div>
				</Link>{" "}
			</div>
			<div className="px-2.5 h-[45px] my-auto flex items-center content-center w-[180px] rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
				<input
					type="text"
					placeholder="Search"
					onChange={(e) => setSrch(e.target.value)}
					className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
				/>
				<Link
					href={{
						pathname: "/search",
						query: { id: srch },
					}}
				>
					<AiOutlineSearch />
				</Link>
			</div>
			<div className="w-[50px] mr-[1.5rem]">
				{!isAuthenticated ? <Hamburger /> : <Hamburger />}
			</div>
		</div>
	);
}
