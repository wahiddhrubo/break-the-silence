import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function FavouriteIcon({
	isLoggedIn,
	isFavourited,
	removeFavourite,
	addFavourite,
}) {
	const styles = {
		icons: `w-10 h-10 cursor-pointer text-green-dark `,
		disabled: `w-10 h-10  text-grey-500`,
	};
	return (
		<span>
			{isLoggedIn ? (
				<span>
					{isFavourited ? (
						<span onClick={removeFavourite}>
							<AiFillHeart className={styles.icons} />
						</span>
					) : (
						<span onClick={addFavourite}>
							<AiOutlineHeart
								className={styles.icons + "animate-pulse"}
							/>
						</span>
					)}
				</span>
			) : (
				<span>
					<AiFillHeart className={styles.disabled} />
				</span>
			)}
		</span>
	);
}
