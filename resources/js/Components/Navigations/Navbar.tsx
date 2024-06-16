import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import Dropdown from "../Common/Dropdown";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { PageProps } from "@/Types";
import LogoutIcon from "../Icons/LogoutIcon";
import Modal from "../Common/Modal";
import SearchIcon from "../Icons/SearchIcon";

const Navbar = () => {
    const { auth } = usePage<PageProps>().props;

    const loginModal = useRef(null);
    const registerModal = useRef(null);
    const logoutModal = useRef<{ open: () => void; close: () => void }>({
        open,
        close,
    });

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (): void => {
        const position: number = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.addEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="px-20 pt-8 pb-6 flex fixed top-0 z-50 w-full justify-between items-center duration-300 transition-all">
            {/* Gradient Background */}
            <div
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-10% from-black-800 to-black-800/0 duration-200 transition-all ${
                    scrollPosition > 50 ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Logo */}
            <div>
                <Link href={route("main.home.index")}>
                    <img
                        src="/images/sineverse-logo.png"
                        alt="Logo"
                        className="h-8"
                    />
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
                <Dropdown>
                    <Dropdown.Trigger className="flex justify-center items-center hover:opacity-85">
                        <SearchIcon className="w-5 h-5" />
                    </Dropdown.Trigger>

                    <Dropdown.Content className="w-72 h-10" spaceContent="2">
                        <input
                            type="text"
                            id="search"
                            className="w-full h-full bg-black-900 border border-black-700 pb-2.5 rounded-md text-sm text-white transition-all duration-300 shadow-none placeholder:text-gray placeholder:font-light focus:ring-[0.5px] focus:ring-white focus:border-white"
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-3">
                            <SearchIcon className="w-4 h-4" />
                        </button>
                    </Dropdown.Content>
                </Dropdown>

                {auth?.user ? (
                    // * Already Signed In
                    <Dropdown>
                        <Dropdown.Trigger className="flex gap-0.5 items-center hover:opacity-85">
                            <img
                                src="images/profile/sakura.jpg"
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 mt-1"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M6 9l6 6l6 -6" />
                            </svg>
                        </Dropdown.Trigger>

                        <Dropdown.Content className="w-48 bg-black-900 pb-2 shadow-md shadow-black-900">
                            {/* Profile Picture & Username */}
                            <div className="flex items-center w-full px-4 py-2.5 gap-3 border-b border-black-700">
                                <img
                                    src="images/profile/sakura.jpg"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className="text-white text-sm font-bold">
                                    {ucFirst(auth.user.username)}
                                </p>
                            </div>

                            {/* Profile Link */}
                            <Dropdown.Link
                                href="#"
                                className="flex flex-row gap-2.5 items-center justify-between hover:bg-black-700"
                            >
                                Profile
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 -mr-1"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </Dropdown.Link>

                            {/* Sign Out Button */}
                            <Dropdown.Button
                                type="button"
                                className="flex flex-row gap-2.5 items-center justify-between hover:bg-black-700"
                                onClick={() => logoutModal.current.open()}
                            >
                                Sign Out
                                <LogoutIcon className="w-5 h-5 -mr-1" />
                            </Dropdown.Button>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    // * Not Signed In
                    <>
                        {/* Sign In Button */}
                        <button
                            // onClick={() => loginModal.current.open()}
                            className="px-2.5 h-8 border border-green bg-green text-center rounded-lg font-bold text-sm transition-all hover:opacity-80"
                        >
                            Sign In
                        </button>

                        {/* Sign Up Button */}
                        <button
                            // onClick={() => registerModal.current.open()}
                            className="px-2.5 h-8 border border-gray text-center rounded-lg font-bold text-sm transition-all hover:opacity-80"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>

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
                <div className="flex flex-row gap-2 mt-6 mb-5">
                    <div className="w-14 h-14">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="2 2 20 20"
                            fill="currentColor"
                            className="w-14 h-14 text-error-500"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
                        </svg>
                    </div>
                    <p className="text-xs text-gray">
                        Attention! You are about to log out of your account.
                        Logging out will end your current session. If you need
                        to continue using the platform, please log in again.
                    </p>
                </div>

                {/* Button */}
                <div className="flex flex-row justify-end items-center gap-3">
                    <button
                        // onClick={() => logoutModal.current.close()}
                        className="px-3 py-1.5 border border-gray flex items-center justify-center gap-1.5 rounded-md font-bold text-xs hover:bg-gray/80 transition-all"
                    >
                        Cancel
                    </button>
                    <Link
                        as="button"
                        method="post"
                        // href={route("auth.logout")}
                        href="#"
                        // onClick={() => logoutModal.current.close()}
                        className="px-3 py-1.5 bg-red flex items-center justify-center gap-1.5 rounded-md font-bold text-xs hover:bg-red/80 transition-all"
                    >
                        Yes, of Course
                    </Link>
                </div>
            </Modal>
        </nav>
    );
};

export default Navbar;
