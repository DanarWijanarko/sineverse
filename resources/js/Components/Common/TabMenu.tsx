import React, { PropsWithChildren, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { classNames } from "primereact/utils";

interface TabMenuProps {
	rootClassName?: string;
	headerClassName?: string;
	contentClassName?: string;
	activeIndex?: number;
}

interface TabMenuItem {
	className?: string;
	name: string;
}

const TabMenu: React.FC<PropsWithChildren<TabMenuProps>> = ({
	rootClassName,
	headerClassName,
	contentClassName,
	children,
	activeIndex = 0,
}) => {
	const [tabHeader, setTabHeader] = useState<string[]>([]);
	const [childContent, setChildConent] = useState<{ [key: string]: React.ReactNode }>({});
	const [active, setActive] = useState<string>("");

	useEffect(() => {
		const headers: string[] = [];
		const childCnt: { [key: string]: React.ReactNode } = {};
		React.Children.forEach(children, (element) => {
			if (!React.isValidElement<PropsWithChildren<TabMenuItem>>(element)) return;
			const { name, children } = element.props;
			headers.push(name);
			childCnt[name] = children;
		});
		setTabHeader(headers);
		setActive(active ? active : headers[activeIndex]);
		setChildConent({ ...childCnt });
	}, [children, activeIndex, active]);

	const changeTab = (name: string) => {
		setActive(name);
	};

	return (
		<section className={classNames("flex w-full flex-col gap-7", rootClassName)}>
			{/* Headers */}
			<div className={classNames("flex flex-row gap-5", headerClassName)}>
				{tabHeader.map((item, index) => (
					<button
						key={index}
						onClick={(e) => {
							e.preventDefault();
							changeTab(item);
						}}
						className="relative"
					>
						<h1
							className={classNames(
								"transition-all duration-500 hover:text-white",
								"font-semibold tracking-wide text-gray",
								{ "text-white": item === active },
							)}
						>
							{item}
						</h1>
						<span
							className={classNames(
								"origin-left scale-x-0 opacity-0 transition-all duration-700",
								"absolute left-0 right-0 top-full mt-1.5 h-0.5 rounded-full bg-green",
								{ "scale-x-100 opacity-100": item === active },
							)}
						/>
					</button>
				))}
			</div>

			{/* Content */}
			<div className={`relative`}>
				{Object.keys(childContent).map((key, index) => (
					<Transition
						key={index}
						show={key === active}
						enter="origin-top-left transition-all duration-500"
						enterFrom="opacity-0 scale-0"
						enterTo="opacity-100 scale-100"
						leave="origin-top-right transition-all duration-500"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-0"
					>
						<div className={`absolute h-full w-full ${contentClassName}`}>
							{childContent[key]}
						</div>
					</Transition>
				))}
			</div>
		</section>
	);
};

const TabItem = ({ className, name, children }: PropsWithChildren<TabMenuItem>) => {
	return <div className={className}>{children}</div>;
};

export { TabMenu, TabItem };
