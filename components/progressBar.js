export default function ProgressBar({ progress }) {
	const circumference = 2 * 120 * Math.PI;

	const ofst = circumference - (progress / 100) * circumference;
	return (
		<div className=" sticky z-10 ml-[-300px] inset-0  w-screen h-screen bg-[#121212]">
			<div className="absolute w-[285px] h-[285px] inset-0 m-auto">
				<svg className="transform w-72 h-72 -rotate-90">
					<circle
						className="text-black "
						strokeWidth="5"
						stroke="currentColor"
						fill="transparent"
						cx="145"
						cy="145"
						r="120"
					/>
					<circle
						className="text-green-dark "
						strokeWidth="5"
						strokeDasharray={circumference}
						strokeDashoffset={ofst}
						strokeLinecap="round"
						stroke="currentColor"
						fill="transparent"
						cx="145"
						cy="145"
						r="120"
					/>
				</svg>
				<span className="absolute inset-0 m-auto w-[75px] h-[50px] text-5xl text-white">
					{progress}%
				</span>
			</div>
		</div>
	);
}
