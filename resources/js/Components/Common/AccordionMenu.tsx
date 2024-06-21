import { Accordion, AccordionTabPassThroughMethodOptions } from "primereact/accordion";
import { classNames } from "primereact/utils";
import React, { PropsWithChildren } from "react";

interface IAccordionMenu {
	multiple: boolean;
	activeIndex: number;
	contentClassName?: string | undefined;
}

const AccordionMenu = ({
	multiple = true,
	activeIndex = 1,
	contentClassName = " pyw-4",
	children,
}: PropsWithChildren<IAccordionMenu>) => {
	const passThroughOptions = {
		accordiontab: {
			headerAction: ({ context }: AccordionTabPassThroughMethodOptions) => ({
				className: classNames(
					"flex items-center cursor-pointer relative no-underline select-none",
					"px-5 py-4 transition-all duration-300 ease-in-out rounded-t-lg font-bold text-lg",
					"border border-black-700 bg-black-900 text-gray",
					"hover:border-white hover:text-white",
					{
						"rounded-br-lg rounded-bl-lg": !context.selected,
						"rounded-br-0 rounded-bl-0 text-white": context.selected,
					}, // Condition
				),
			}),
			headerIcon: "inline-block absolute right-5",
			headerTitle: "leading-none tracking-wider",
			content: {
				className: classNames(
					"border border-black-700 bg-black-900 text-white border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg py-2.5",
				),
			},
			transition: {
				enterFromClass: "max-h-0",
				enterActiveClass: "overflow-hidden transition-all duration-500 ease-in-out",
				enterToClass: "max-h-40	",
				leaveFromClass: "max-h-40",
				leaveActiveClass: "overflow-hidden transition-all duration-500 ease-in",
				leaveToClass: "max-h-0",
			},
		},
	};

	return (
		<Accordion
			multiple={multiple}
			activeIndex={[activeIndex]}
			className={classNames(contentClassName, "flex flex-col gap-2.5")}
			pt={passThroughOptions}
		>
			{children}
		</Accordion>
	);
};

export default AccordionMenu;
