import { classNames } from "primereact/utils";
import React from "react";

interface ISkeletonProps {
	className: string | undefined;
}

const Skeleton: React.FC<ISkeletonProps> = ({ className }) => {
	return (
		<div
			className={classNames(
				className,
				"relative overflow-hidden",
				"isolate animate-pulse",
				"bg-black-700 shadow-xl shadow-black-800/5",
				"before:border-t before:border-white/5",
				"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
			)}
		/>
	);
};

export default Skeleton;
