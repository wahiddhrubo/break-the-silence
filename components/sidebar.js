import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Button from "../components/button.js";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

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
		<div className="hidden md:block lg:block">
			{" "}
			<span className="absolute text-white text-4xl top-5 left-4 cursor-pointer"></span>
			<div className="sidebar relative top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-black">
				<div className="fixed">
					<div className="text-gray-100 text-xl">
						<Link
							href={{
								pathname: "/",
							}}
						>
							<div className="p-2.5 mt-1 flex items-center">
								<h1 className="font-bold text-gray-200 text-[15px] ml-3">
									TailwindCSS
								</h1>
								<i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
							</div>
						</Link>{" "}
						<hr className="my-2 bg-gray-600 h-[1px] w-full" />
					</div>
					<div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
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
					<Link
						href={{
							pathname: "/",
						}}
					>
						<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-900 text-white">
							<span className="text-[15px] ml-4 text-gray-200 font-bold">
								Home
							</span>
						</div>
					</Link>
					{isAuthenticated && (
						<Link
							href={{
								pathname: "/my-album",
							}}
						>
							<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-900 text-white">
								<span className="text-[15px] ml-4 text-gray-200 font-bold">
									Your Albums
								</span>
							</div>
						</Link>
					)}
					<div className="my-4 bg-gray-600 h-[1px]"></div>
					<div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white">
						{isAuthenticated ? (
							<Button
								type="DefaultButton"
								onClick={logOut}
								text="Log Out"
							/>
						) : (
							<Button
								type="DefaultButton"
								onClick={connectWallet}
								text="Log In"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
