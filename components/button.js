import { primaryColor } from "../lib/constants.js";

export default function DefaultButton({
	onClick,
	color,
	text,
	type,
	className,
}) {
	if (type == "DefaultButton") {
		return (
			<div className={className ? className : ""}>
				<div className="h-[20px]">
					<a
						href="#_"
						onClick={onClick}
						className={`relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group`}
					>
						<span
							className={`absolute w-0 h-0 transition-all duration-500 ease-out bg-green-dark rounded-2 group-hover:w-56 group-hover:h-56`}
						></span>
						<span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent"></span>
						<span className="relative">{text}</span>
					</a>
				</div>
			</div>
		);
	} else if (type == "SubmitButton") {
		return (
			<div className={className ? className : ""}>
				<div className="h-[20px]">
					<a
						href="#_"
						onClick={onClick}
						className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-green-dark border-2 border-green-dark rounded-md hover:text-white group hover:bg-gray-50"
					>
						<span className="absolute left-0 block w-full h-0 transition-all bg-green-dark opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
						<span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								></path>
							</svg>
						</span>
						<span className="relative">{text}</span>
					</a>
				</div>
			</div>
		);
	} else if (type == "SearchButton") {
		return (
			<div className={className ? className : ""}>
				<div className="h-[20px]">
					<a
						href="#_"
						onClick={onClick}
						className="relative inline-flex items-center w-[50px] h-[50px] rounded-full overflow-hidden text-lg font-medium text-green-dark border-2 border-green-dark rounded-md hover:text-white group hover:bg-gray-50"
					>
						<span className="absolute left-0 block w-full h-0 transition-all bg-green-dark opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

						<span className="relative mx-auto">{text}</span>
					</a>
				</div>
			</div>
		);
	} else if (type == "DisabledSearchButton") {
		return (
			<div className={className ? className : ""}>
				<div className="h-[20px]  ">
					<a
						href="#_"
						onClick={onClick}
						className="relative cursor-default inline-flex items-center w-[150px] h-[50px] bg-gray-900 rounded-full overflow-hidden text-lg font-medium text-[white] border-2 rounded-md"
					>
						<span className="relative mx-auto ">{text}</span>
					</a>
				</div>
			</div>
		);
	}
}
