import Navbar from "@/Components/Navigations/Navbar";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full min-h-screen">
            <Navbar />
            <main>{children}</main>
        </section>
    );
};

export default MainLayout;
