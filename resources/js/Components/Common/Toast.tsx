import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { IFlashMessage, PageProps } from "@/Types";
import { usePage } from "@inertiajs/react";
import {
	Toast,
	ToastMessage,
	ToastPassThroughMethodOptions,
	ToastPassThroughOptions,
} from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef } from "react";

interface CustomToastPassThroughMethodOptions extends ToastPassThroughMethodOptions {
	index: number;
}

const CustomToast = () => {
	const { flash_message } = usePage<PageProps>().props;

	const toastRef = useRef<Toast>(null);

	const Icons: { error: React.ReactNode; success: React.ReactNode } = {
		error: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-full w-full"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4" />
			</svg>
		),
		success: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-full w-full"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
			</svg>
		),
	};

	const ToastContent: React.FC<ToastMessage> = (props) => (
		<div className="flex w-full flex-row items-center gap-1.5">
			<div className="w-14">{Icons[flash_message.type]}</div>
			<div className="flex w-full flex-col gap-0.5">
				<h1 className="text-sm font-bold">{ucFirst(flash_message.type)}</h1>
				<p className="line-clamp-2 text-xs font-semibold">{flash_message.message}</p>
			</div>
		</div>
	);

	const passT: ToastPassThroughOptions = {
		message: ({ state, index }: CustomToastPassThroughMethodOptions) => ({
			className: classNames("mb-4 opacity-80 backdrop-blur rounded-md w-full", {
				"bg-blue-100 border-solid border-0 border-l-8 border-blue-500 text-blue-700":
					state.messages[index] && state.messages[index].message.severity == "info",
				"bg-success-300 border-solid border-0 border-l-8 border-success-500 text-success-700":
					state.messages[index] && state.messages[index].message.severity == "success",
				"bg-orange-100 border-solid border-0 border-l-8 border-orange-500 text-orange-700":
					state.messages[index] && state.messages[index].message.severity == "warn",
				"bg-error-300 border-solid border-0 border-l-8 border-error-500 text-error-700":
					state.messages[index] && state.messages[index].message.severity == "error",
			}),
		}),
		content: () => ({
			className: classNames("flex justify-between items-center py-3 pl-4 pr-3.5"),
		}),
		closeButton: ({ state, index }: CustomToastPassThroughMethodOptions) => ({
			className: classNames("p-2 rounded-full transition-all", {
				"hover:bg-success-500/20":
					state.messages[index] && state.messages[index].message.severity == "success",
			}),
		}),
		// transition: {
		//     enterFromClass:
		//         "opacity-0 translate-x-0 translate-y-2/4 translate-z-0",
		//     enterActiveClass:
		//         "transition-transform transition-opacity duration-300",
		//     leaveFromClass: "max-h-40",
		//     leaveActiveClass: "transition-all duration-500 ease-in",
		//     leaveToClass: "max-h-0 opacity-0 mb-0 overflow-hidden",
		// },
	};

	useEffect(() => {
		if (flash_message != null) {
			toastRef.current?.show({
				severity: flash_message.type,
				summary: flash_message.type,
				detail: flash_message.message,
				life: 3000,
				content: <ToastContent />,
			});
		}
	}, [flash_message]);

	return <Toast ref={toastRef} baseZIndex={999999999} pt={passT} />;
};

export default CustomToast;
