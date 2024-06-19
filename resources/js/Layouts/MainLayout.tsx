import { PropsWithChildren } from "react";

import Navbar from "@/Components/Navigations/Navbar";
import CustomToast from "@/Components/Common/Toast";
import { ScrollTop } from "primereact/scrolltop";
import Footer from "@/Components/Common/Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CustomToast />
            <ScrollTop
                target="window"
                threshold={50}
                className="w-10 h-10 bg-black-700 rounded-full"
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
                            className="w-5 h-5"
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
