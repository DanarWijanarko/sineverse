import { classNames } from "primereact/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";

const NavLink = ({ href, children, ...props }: InertiaLinkProps) => {
	const link: Array<string> = href.split(".");
	const splitedRoute: Array<string> = [link[0], link[1]];
	const results: string = splitedRoute.join(".") + ".*";

	return (
		<Link
			href={route(href)}
			{...props}
			className={classNames(
				"text-base font-medium text-gray transition-all hover:text-white",
				{
					"text-base font-extrabold text-white": route().current(results),
				},
			)}
		>
			{children}
		</Link>
	);
};

export default NavLink;
