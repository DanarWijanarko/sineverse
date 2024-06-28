import { Link, useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import Dropdown from "../Common/Dropdown";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { PageProps } from "@/Types";
import Modal from "../Common/Modal";
import SearchIcon from "../Icons/SearchIcon";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryLink from "../Buttons/PrimaryLink";
import ChevronIcon from "../Icons/ChevronIcon";

const Navbar = () => {
	const { auth } = usePage<PageProps>().props;

	const loginModal = useRef<{ open: () => void; close: () => void }>({
		open,
		close,
	});
	const registerModal = useRef<{ open: () => void; close: () => void }>({
		open,
		close,
	});
	const logoutModal = useRef<{ open: () => void; close: () => void }>({
		open,
		close,
	});

	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = (): void => {
		const position: number = window.scrollY;
		setScrollPosition(position);
	};

	const { data, setData, get } = useForm<{ query: string | undefined }>({ query: "" });

	const handleSearchFormSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		get(route("browse.search"));
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.addEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className="fixed top-0 z-50 flex w-full items-center justify-between px-20 pb-6 pt-8 transition-all duration-300">
			{/* Gradient Background */}
			<div
				className={`absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-black-800 from-10% to-black-800/0 transition-all duration-200 ${
					scrollPosition > 50 ? "opacity-100" : "opacity-0"
				}`}
			/>

			{/* Logo */}
			<div>
				<Link href={route("main.home.index")}>
					<img src="/images/sineverse-logo.png" alt="Logo" className="h-8" />
				</Link>
			</div>

			{/* Nav Links */}
			<div className="flex gap-10">
				<NavLink href="main.home.index">Home</NavLink>
				<NavLink href="main.movies.index">Movies</NavLink>
				<NavLink href="main.coming.index">Coming Soon</NavLink>
				<NavLink href="main.series.index">Series</NavLink>
				<NavLink href="main.forum.index">Forum</NavLink>
			</div>

			{/* Searching, Profile, Sign In & Sign Up Buttons */}
			<div className="flex items-center gap-3">
				{/* Search Button */}
				{!route().current("browse.search") && (
					<Dropdown>
						<Dropdown.Trigger className="flex items-center justify-center hover:opacity-85">
							<SearchIcon className="h-5 w-5" />
						</Dropdown.Trigger>

						<Dropdown.Content className="h-10 w-72" spaceContent="2">
							<form onSubmit={handleSearchFormSubmit}>
								<input
									type="text"
									id="search"
									value={data.query}
									onChange={(e) => setData("query", e.target.value)}
									className="h-full w-full rounded-md border border-black-700 bg-black-900 pb-2.5 text-sm text-white shadow-none transition-all duration-300 placeholder:font-light placeholder:text-gray focus:border-white focus:ring-[0.5px] focus:ring-white"
								/>
								<button
									type="submit"
									className="absolute right-3 top-1/2 -translate-y-1/2"
								>
									<SearchIcon className="h-4 w-4" />
								</button>
							</form>
						</Dropdown.Content>
					</Dropdown>
				)}

				{auth.user ? (
					// * Already Signed In
					<Dropdown>
						<Dropdown.Trigger className="flex items-center gap-0.5 hover:opacity-85">
							<img
								src="images/profile/sakura.jpg"
								alt="Profile"
								className="h-8 w-8 rounded-full"
							/>
							<ChevronIcon type="down" className="mt-0.5 h-5 w-5" />
						</Dropdown.Trigger>

						<Dropdown.Content className="w-48 bg-black-900 pb-2 shadow-md shadow-black-900">
							{/* Profile Picture & Username */}
							<div className="flex w-full items-center gap-3 border-b border-black-700 px-4 py-2.5">
								<img
									src="images/profile/sakura.jpg"
									alt="Profile"
									className="h-8 w-8 rounded-full"
								/>
								<p className="text-sm font-bold text-white">
									{ucFirst(auth.user.username)}
								</p>
							</div>

							{/* Profile Link */}
							<Dropdown.Link
								href="#"
								className="flex flex-row items-center justify-between gap-2.5 hover:bg-black-700"
							>
								Profile
								<ChevronIcon type="right" className="-mr-1 h-5 w-5" />
							</Dropdown.Link>

							{/* Sign Out Button */}
							<Dropdown.Button
								type="button"
								className="flex w-full flex-row items-center justify-between gap-2.5 px-5 py-2 text-start text-sm font-medium tracking-wide hover:bg-black-700"
								onClick={() => logoutModal.current.open()}
							>
								Sign Out
								<ChevronIcon type="right" className="-mr-1 h-5 w-5" />
							</Dropdown.Button>
						</Dropdown.Content>
					</Dropdown>
				) : (
					// * Not Signed In
					<>
						{/* Sign In Button */}
						<button
							onClick={() => loginModal.current.open()}
							className="h-8 rounded-lg border border-green bg-green px-2.5 text-center text-sm font-bold transition-all hover:opacity-80"
						>
							Sign In
						</button>

						{/* Sign Up Button */}
						<button
							onClick={() => registerModal.current.open()}
							className="h-8 rounded-lg border border-gray px-2.5 text-center text-sm font-bold transition-all hover:opacity-80"
						>
							Sign Up
						</button>
					</>
				)}
			</div>

			<Login ref={loginModal} />
			<Register ref={registerModal} />

			{/* Logout Modal Confirmation */}
			<Modal
				ref={logoutModal}
				defaultIsOpen={false}
				rootClassName="bg-opacity-50"
				contentClassName="bg-black-800 px-5 py-4 rounded-xl w-[400px]"
			>
				{/* Headers */}
				<h1 className="text-xl font-bold">Are you Sure?</h1>

				{/* Content */}
				<div className="mb-5 mt-6 flex flex-row gap-2">
					<div className="h-14 w-14">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="2 2 20 20"
							fill="currentColor"
							className="h-14 w-14 text-error-500"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
						</svg>
					</div>
					<p className="text-xs text-gray">
						Attention! You are about to log out of your account. Logging out will end
						your current session. If you need to continue using the platform, please log
						in again.
					</p>
				</div>

				{/* Button */}
				<div className="flex flex-row items-center justify-end gap-3">
					<SecondaryButton
						onClick={() => logoutModal.current.close()}
						className="text-xs"
					>
						Cancel
					</SecondaryButton>
					<PrimaryLink
						as="button"
						method="post"
						href={route("auth.logout")}
						onClick={() => logoutModal.current.close()}
						className="bg-red text-xs hover:bg-red/80"
					>
						Yes, of Course
					</PrimaryLink>
				</div>
			</Modal>
		</nav>
	);
};

export default Navbar;
