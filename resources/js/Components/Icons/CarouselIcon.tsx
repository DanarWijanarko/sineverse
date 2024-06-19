import React from "react";

const CarouselIcon = (type: "prev" | "next") => {
    return (
        <div
            className={`w-8 h-8 flex justify-center items-center rounded-full py-1.5 bg-black-700 ${
                type == "prev" ? "pr-0.5" : "pl-0.5"
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className=" w-full h-full"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                {type == "prev" ? (
                    <path d="M15 6l-6 6l6 6" />
                ) : (
                    <path d="M9 6l6 6l-6 6" />
                )}
            </svg>
        </div>
    );
};

export default CarouselIcon;
