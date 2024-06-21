import { PropsWithChildren } from "react";

import Navbar from "@/Components/Navigations/Navbar";
import CustomToast from "@/Components/Common/Toast";
import { ScrollTop } from "primereact/scrolltop";
import Footer from "@/Components/Common/Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<section className="min-h-screen w-full">
			<Navbar />
			<main>{children}</main>
			<Footer />
			<CustomToast />
			<ScrollTop
				target="window"
				threshold={50}
				className="h-10 w-10 rounded-full bg-black-700"
				icon={() => {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-5 w-5"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 5l0 14" />
							<path d="M18 11l-6 -6" />
							<path d="M6 11l6 -6" />
						</svg>
					);
				}}
			/>
		</section>
	);
};

export default MainLayout;
