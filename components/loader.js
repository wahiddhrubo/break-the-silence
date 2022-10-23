import HashLoader from "react-spinners/HashLoader";
import { primaryColor } from "../lib/constants.js";

export default function Loader() {
	return (
		<div
			className={` bg-[#181818] z-[20] sticky ml-[-300px] text-center h-screen  w-screen text-center text-3xl font-semibold text-[${primaryColor}]`}
		>
			{" "}
			<div className="absolute inset-0 m-auto w-[150px] h-[150px] ">
				<div>
					<HashLoader
						className="place-self-center"
						size={150}
						color={primaryColor}
					/>
				</div>
			</div>
		</div>
	);
}
