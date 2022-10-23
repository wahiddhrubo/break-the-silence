import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Button from "../components/button.js";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/hamburger.module.css";

export default function Hamburger() {
	const [srch, setSrch] = useState();
	const {
		formattedAccount,
		isAuthenticated,
		currentAccount,
		logOut,
		connectWallet,
	} = useContext(BreakTheSilenceContext);

	return (
		<div className={styles.navigation}>
			<input
				type="checkbox"
				className={styles.navigation__checkbox}
				id="nav-toggle"
			/>
			<label htmlFor="nav-toggle" className={styles.navigation__button}>
				<span
					className={styles.navigation__icon}
					aria-label="toggle navigation menu"
				></span>
			</label>
			<div className={styles.navigation__background}></div>

			<nav className={styles.navigation__nav} role="navigation">
				<ul className={styles.navigation__list}>
					<li className={styles.navigation__item}>
						<a href="#" className={styles.navigation__link}>
							<Link
								href={{
									pathname: "/",
								}}
							>
								<span className="">Home</span>
							</Link>
						</a>
					</li>

					{isAuthenticated && (
						<li className={styles.navigation__item}>
							<a href="#" className={styles.navigation__link}>
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
							</a>
						</li>
					)}
					<li className={styles.navigation__item}>
						<a href="#" className={styles.navigation__link}>
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
						</a>
					</li>

					<div className="p-2.5 mt-3  items-center rounded-md px-4 duration-300 cursor-pointer text-white">
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
				</ul>
			</nav>
		</div>
	);
}
