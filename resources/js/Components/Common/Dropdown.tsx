import { Transition } from "@headlessui/react";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { classNames } from "primereact/utils";
import React, {
	ButtonHTMLAttributes,
	Dispatch,
	Fragment,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const DropDownContext = createContext<{
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	toggleIsOpen: () => void;
}>({ isOpen: false, setIsOpen: () => {}, toggleIsOpen: () => {} });

const Dropdown = ({ children }: PropsWithChildren) => {
	const contentRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		// * Close on Click Outside
		document.addEventListener("click", (e) => {
			if (isOpen && !contentRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		});
		// * Close on Scroll
		document.addEventListener("scroll", () => {
			if (isOpen) setIsOpen(false);
		});
	}, [isOpen]);

	return (
		<DropDownContext.Provider value={{ isOpen, setIsOpen, toggleIsOpen }}>
			<div ref={contentRef} className="relative">
				{children}
			</div>
		</DropDownContext.Provider>
	);
};

const Trigger = ({ className, children }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { isOpen, toggleIsOpen } = useContext(DropDownContext);

	return (
		<button
			className={classNames("z-0 transition-all", { "opacity-85": isOpen }, className)}
			onClick={toggleIsOpen}
		>
			{children}
		</button>
	);
};

const Content = ({
	align = "right",
	spaceContent = "2",
	className,
	children,
}: PropsWithChildren<{
	align?: "left" | "right" | "endRight";
	spaceContent?: string;
	className?: string;
}>) => {
	const { isOpen } = useContext(DropDownContext);

	let alignmentClasses = "origin-top";

	if (align === "left") {
		alignmentClasses = "origin-top-left start-1";
	} else if (align === "right") {
		alignmentClasses = "origin-top-right end-0";
	} else if (align === "endRight") {
		alignmentClasses = "origin-top-right -top-[50%] start-[102%]";
	}

	return (
		<Transition
			as={Fragment}
			show={isOpen}
			enter="transition ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div
				className={classNames(
					`mt-${spaceContent}`,
					"absolute z-50 rounded-md",
					alignmentClasses,
				)}
			>
				<div
					className={classNames(
						"flex flex-col rounded-md border border-black-700",
						className,
					)}
				>
					{children}
				</div>
			</div>
		</Transition>
	);
};

const DropdownLink = ({ className, children, ...props }: InertiaLinkProps) => {
	const { setIsOpen } = useContext(DropDownContext);

	return (
		<div onClick={() => setIsOpen(false)}>
			<Link
				{...props}
				className={classNames(
					"w-full px-5 py-2 text-start text-sm font-medium tracking-wide text-white transition-all",
					className,
				)}
			>
				{children}
			</Link>
		</div>
	);
};

const DropdownButton = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { setIsOpen } = useContext(DropDownContext);

	return (
		<div onClick={() => setIsOpen(false)}>
			<button {...props}>{children}</button>
		</div>
	);
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;
