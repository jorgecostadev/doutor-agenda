import { Eye, EyeOff } from "lucide-react";

interface ShowPasswordProps {
	isVisible: boolean;
	toggleVisibility: () => void;
}

export default function ShowPassword({
	isVisible,
	toggleVisibility,
}: ShowPasswordProps) {
	return (
		<button
			type="button"
			className="top-1/2 right-3 absolute -translate-y-1/2 cursor-pointer transform"
			onClick={toggleVisibility}
		>
			{isVisible ? (
				<EyeOff className="w-5 h-5 text-gray-500" />
			) : (
				<Eye className="w-5 h-5 text-gray-500" />
			)}
		</button>
	);
}
