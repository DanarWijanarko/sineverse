import { Image, ImagePassThroughOptions, ImageProps } from "primereact/image";
import { classNames } from "primereact/utils";

const CustomImage = ({
	src,
	alt,
	width,
	height,
	preview,
	className,
	imageClassName,
}: ImageProps) => {
	const passThroughOptions = {
		root: {
			className: "relative inline-block overflow-hidden ",
		},
		image: {
			className: classNames("rounded-lg object-cover overflow-hidden"),
		},
		button: {
			className: classNames(
				"absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
				"bg-black-900/0 text-gray",
				"hover:opacity-100 hover:cursor-pointer hover:bg-black-900/50",
			),
		},
		icon: {
			className: "w-6 h-6",
		},
		mask: {
			className: classNames(
				"fixed top-0 left-0 w-full h-full",
				"flex items-center justify-center",
				"bg-black-900 bg-opacity-80",
			),
		},
		preview: {
			className: "w-full h-[750px]",
		},
		toolbar: {
			className: classNames("absolute top-0 right-0 z-10 flex", "p-4"),
		},
		rotaterightbutton: {
			className: classNames(
				"flex justify-center items-center",
				"text-gray bg-black-900/0 w-12 h-12 rounded-full transition duration-300 ease-in-out mr-2",
				"hover:text-white hover:bg-white/10",
			),
		},
		rotaterighticon: {
			className: "w-6 h-6",
		},
		rotateleftbutton: {
			className: classNames(
				"flex justify-center items-center",
				"text-gray bg-black-900/0 w-12 h-12 rounded-full transition duration-300 ease-in-out mr-2",
				"hover:text-white hover:bg-white/10",
			),
		},
		rotatelefticon: {
			className: "w-6 h-6",
		},
		zoomoutbutton: {
			className: classNames(
				"flex justify-center items-center",
				"text-gray bg-black-900/0 w-12 h-12 rounded-full transition duration-300 ease-in-out mr-2",
				"hover:text-white hover:bg-white/10",
			),
		},
		zoomouticon: {
			className: "w-6 h-6",
		},
		zoominbutton: {
			className: classNames(
				"flex justify-center items-center",
				"text-gray bg-black-900/0 w-12 h-12 rounded-full transition duration-300 ease-in-out mr-2",
				"hover:text-white hover:bg-white/10",
			),
		},
		zoominicon: {
			className: "w-6 h-6",
		},
		closebutton: {
			className: classNames(
				"flex justify-center items-center",
				"text-gray bg-black-900/0 w-12 h-12 rounded-full transition duration-300 ease-in-out mr-2",
				"hover:text-white hover:bg-white/10",
			),
		},
		closeicon: {
			className: "w-6 h-6",
		},
	};

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			preview={preview}
			className={className}
			imageClassName={imageClassName}
			pt={passThroughOptions}
		/>
	);
};

export default CustomImage;
