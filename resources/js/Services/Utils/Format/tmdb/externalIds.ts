import React from "react";

export const externalIds = (media: string): React.ReactNode => {
    switch (media) {
        case "instagram":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        stroke: "none",
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    }),
                    React.createElement("path", {
                        key: "path2",
                        d: "M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z",
                    }),
                    React.createElement("path", {
                        key: "path3",
                        d: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
                    }),
                    React.createElement("path", {
                        key: "path4",
                        d: "M16.5 7.5l0 .01",
                    }),
                ]
            );
        case "facebook":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        stroke: "none",
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    }),
                    React.createElement("path", {
                        key: "path2",
                        d: "M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3",
                    }),
                ]
            );
        case "tiktok":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        stroke: "none",
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    }),
                    React.createElement("path", {
                        key: "path2",
                        d: "M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z",
                    }),
                ]
            );
        case "twitter":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        stroke: "none",
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    }),
                    React.createElement("path", {
                        key: "path2",
                        d: "M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z",
                    }),
                ]
            );
        case "youtube":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        stroke: "none",
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    }),
                    React.createElement("path", {
                        key: "path2",
                        d: "M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z",
                    }),
                    React.createElement("path", {
                        key: "path3",
                        d: "M10 9l5 3l-5 3z",
                    }),
                ]
            );
        case "imdb":
            return React.createElement(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 448 512",
                    className: "w-7 h-7 text-white",
                },
                [
                    React.createElement("path", {
                        key: "path1",
                        fill: "#ffffff",
                        d: "M89.5 323.6H53.9V186.2H89.5V323.6zM156.1 250.5L165.2 186.2H211.5V323.6H180.5V230.9L167.1 323.6H145.8L132.8 232.9L132.7 323.6H101.5V186.2H147.6C148.1 194.5 150.4 204.3 151.9 215.6L156.1 250.5zM223.7 323.6V186.2H250.3C267.3 186.2 277.3 187.1 283.3 188.6C289.4 190.3 294 192.8 297.2 196.5C300.3 199.8 302.3 203.1 303 208.5C303.9 212.9 304.4 221.6 304.4 234.7V282.9C304.4 295.2 303.7 303.4 302.5 307.6C301.4 311.7 299.4 315 296.5 317.3C293.7 319.7 290.1 321.4 285.8 322.3C281.6 323.1 275.2 323.6 266.7 323.6H223.7zM259.2 209.7V299.1C264.3 299.1 267.5 298.1 268.6 296.8C269.7 294.8 270.4 289.2 270.4 280.1V226.8C270.4 220.6 270.3 216.6 269.7 214.8C269.4 213 268.5 211.8 267.1 210.1C265.7 210.1 263 209.7 259.2 209.7V209.7zM316.5 323.6V186.2H350.6V230.1C353.5 227.7 356.7 225.2 360.1 223.5C363.7 222 368.9 221.1 372.9 221.1C377.7 221.1 381.8 221.9 385.2 223.3C388.6 224.8 391.2 226.8 393.2 229.5C394.9 232.1 395.9 234.8 396.3 237.3C396.7 239.9 396.1 245.3 396.1 253.5V292.1C396.1 300.3 396.3 306.4 395.3 310.5C394.2 314.5 391.5 318.1 387.5 320.1C383.4 324 378.6 325.4 372.9 325.4C368.9 325.4 363.7 324.5 360.2 322.9C356.7 321.1 353.5 318.4 350.6 314.9L348.5 323.6L316.5 323.6zM361.6 302.9C362.3 301.1 362.6 296.9 362.6 290.4V255C362.6 249.4 362.3 245.5 361.5 243.8C360.8 241.9 357.8 241.1 355.7 241.1C353.7 241.1 352.3 241.9 351.6 243.4C351 244.9 350.6 248.8 350.6 255V291.4C350.6 297.5 351 301.4 351.8 303C352.4 304.7 353.9 305.5 355.9 305.5C358.1 305.5 360.1 304.7 361.6 302.9L361.6 302.9zM418.4 32C434.1 33.3 447.1 47.3 447.1 63.9V448.1C447.1 464.5 435.2 478.5 418.9 479.1C418.6 479.1 418.4 480 418.1 480H29.9C29.6 480 29.3 479.1 29 479.9C13.3 478.5 1.1 466.1 0 449.7L0 61.8C1.1 45.9 13.8 33.1 30.3 31.1H417.7C417.9 31.1 418.2 32 418.4 32L418.4 32zM30.3 41.3C19 42 10 51 9.3 62.4V449.7C9.6 455.1 11.9 460.2 15.7 464C19.5 467.9 24.5 470.3 29.9 470.7H418.1C429.6 469.7 438.7 459.1 438.7 448.1V63.9C438.7 58.2 436.6 52.7 432.7 48.5C428.8 44.2 423.4 41.7 417.7 41.3L30.3 41.3z",
                    }),
                ]
            );
        default:
            return null;
    }
};
