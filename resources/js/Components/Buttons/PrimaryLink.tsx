import { InertiaLinkProps, Link } from "@inertiajs/react";
import { classNames } from "primereact/utils";
import React, { LinkHTMLAttributes } from "react";

const PrimaryLink = ({ className = "", href, onClick, ...props }: InertiaLinkProps) => {
	return (
		<Link
			{...props}
			href={href}
			onClick={onClick}
			className={classNames(
				className,
				"flex flex-row items-center justify-center gap-1.5 rounded-lg bg-green px-4 py-2 font-bold transition-all duration-300 hover:bg-green/80",
			)}
		></Link>
	);
};

export default PrimaryLink;
