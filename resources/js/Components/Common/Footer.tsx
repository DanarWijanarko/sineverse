import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="mt-24 sticky top-[100vh] flex flex-row justify-between px-20 pt-20 pb-12 w-full h-96 border-t border-black-700">
            {/* Left Section */}
            <div className="flex flex-col justify-between items-start">
                {/* Image Logo's */}
                <div className="flex flex-col gap-5 items-center">
                    <Link href={route("main.home.index")}>
                        <img
                            src="/images/sineverse-logo.png"
                            alt="SineVerse Logo"
                            className="w-56"
                        />
                    </Link>
                    <a href="https://www.themoviedb.org/" target="_blank">
                        <img
                            src="/images/tmdb.png"
                            alt="TMDB Logo"
                            className="w-56"
                        />
                    </a>
                </div>

                {/* Nav Left */}
                <div className="flex flex-row gap-4">
                    <Link
                        href="#"
                        className="text-base text-gray font-medium transition-all hover:text-white"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        className="text-base text-gray font-medium transition-all hover:text-white"
                    >
                        Term of Service
                    </Link>
                    <Link
                        href="#"
                        className="text-base text-gray font-medium transition-all hover:text-white"
                    >
                        Languages
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between items-end">
                <div className="flex flex-row gap-24">
                    {/* SineVerse */}
                    <div className="flex flex-col gap-3">
                        {/* Title */}
                        <h1 className="text-lg text-white uppercase font-bold">
                            SineVerse
                        </h1>

                        {/* Values */}
                        <div className="flex flex-col gap-1.5">
                            <Link
                                href={route("main.home.index")}
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Home
                            </Link>
                            <Link
                                href={route("main.movies.index")}
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Movies
                            </Link>
                            <Link
                                href={route("main.coming.index")}
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Coming Soon
                            </Link>
                            <Link
                                href={route("main.series.index")}
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Series
                            </Link>
                            <Link
                                href={route("main.forum.index")}
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Forum
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-3">
                        {/* Title */}
                        <h1 className="text-lg text-white uppercase font-bold">
                            Resources
                        </h1>

                        {/* Values */}
                        <div className="flex flex-col gap-1.5">
                            <a
                                href="https://tailwindcss.com/"
                                target="_blank"
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Tailwind CSS
                            </a>
                            <a
                                href="https://primereact.org/"
                                target="_blank"
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Prime React
                            </a>
                            <a
                                href="https://headlessui.com/"
                                target="_blank"
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                HeadlessUI
                            </a>
                            <a
                                href="https://react.dev/"
                                target="_blank"
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                React JS
                            </a>
                            <a
                                href="https://laravel.com/"
                                target="_blank"
                                className="text-base text-gray font-medium transition-all hover:text-white"
                            >
                                Laravel
                            </a>
                        </div>
                    </div>

                    {/* Connect with Us */}
                    <div className="flex flex-col gap-3">
                        {/* Title */}
                        <h1 className="text-lg text-white uppercase font-bold">
                            Connect with Us
                        </h1>

                        {/* Values */}
                        <div className="flex flex-row gap-2">
                            {/* Twitter */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                className="text-white w-fit h-fit p-1 rounded-md bg-black-700 transition-all hover:opacity-80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com/danar.wi"
                                target="_blank"
                                className="text-white w-fit h-fit p-1 rounded-md bg-black-700 transition-all hover:opacity-80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M16.5 7.5l0 .01" />
                                </svg>
                            </a>

                            {/* Github */}
                            <a
                                href="https://github.com/DanarWijanarko"
                                target="_blank"
                                className="text-white w-fit h-fit p-1 rounded-md bg-black-700 transition-all hover:opacity-80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="text-white w-fit h-fit p-1 rounded-md bg-black-700 transition-all hover:opacity-80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Text */}
                <p className="text-base text-gray font-medium transition-all">
                    © 2024{" "}
                    <Link
                        href={route("main.home.index")}
                        className="transition-all hover:text-white"
                    >
                        SineVerse™.
                    </Link>{" "}
                    All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
