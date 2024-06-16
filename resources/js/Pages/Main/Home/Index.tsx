import React from "react";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/Types";

const Index = ({ auth, flash_message }: PageProps) => {
    return (
        <MainLayout>
            <Head title="Home" />
            <div className="">Index</div>
            <PrimaryButton className="text-sm" onClick={() => alert("www")}>
                Watch Trailer
            </PrimaryButton>
        </MainLayout>
    );
};

export default Index;
