interface IChevron {
    type: "left" | "right" | "up" | "down";
    className: string | undefined;
}

const ChevronIcon = ({ type, className }: IChevron) => {
    const Icons = {
        right: <path d="M9 6l6 6l-6 6" />,
        left: <path d="M15 6l-6 6l6 6" />,
        up: <path d="M6 15l6 -6l6 6" />,
        down: <path d="M6 9l6 6l6 -6" />,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            {Icons[type]}
        </svg>
    );
};

export default ChevronIcon;
