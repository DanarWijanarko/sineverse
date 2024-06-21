import {
    Dropdown,
    DropdownChangeEvent,
    DropdownPassThroughMethodOptions,
    DropdownPassThroughOptions,
    DropdownProps,
} from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";
import React from "react";

interface InputProps {
    value: any;
    onChange: (event: DropdownChangeEvent) => void;
    options: Array<any> | undefined;
    optionLabel: string;
    placeholder?: string | undefined;
    filter?: boolean;
    showClear?: boolean;
    isLoading: boolean;
    valueTemplate:
        | React.ReactNode
        | ((option: any, props: DropdownProps) => React.ReactNode);
    itemTemplate: React.ReactNode | ((option: any) => React.ReactNode);
    className?: string | undefined;
}

const InputDropdown = ({
    value,
    onChange,
    options,
    optionLabel,
    placeholder,
    filter = true,
    showClear = false,
    isLoading,
    valueTemplate,
    itemTemplate,
    className,
}: InputProps) => {
    const passThroughOptions = {
        root: {
            className: classNames(
                "cursor-pointer inline-flex relative select-none h-10",
                "bg-black-900 border border-black-700 transition-colors duration-200 ease-in-out rounded-lg",
                "hover:border-white focus:outline-none focus:outline-offset-0"
            ),
        },
        input: {
            className: classNames(
                "cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative",
                "border-0",
                "px-4 py-2 transition duration-200 bg-transparent rounded appearance-nones",
                "focus:outline-none focus:shadow-none"
            ),
        },
        trigger: ({ props }: DropdownPassThroughMethodOptions) => ({
            className: classNames(
                "flex items-center justify-center",
                "text-gray w-12 rounded-tr-lg rounded-br-lg",
                {
                    hidden: props.showClear ? value : false,
                }
            ),
        }),
        header: {
            className: classNames(
                "p-2 border-t border-x border-black-700 bg-black-900 mt-2 rounded-t-lg"
            ),
        },
        // wrapper: {
        //     className: classNames(
        //         "h-[200px] w-full overflow-auto",
        //         "bg-black-900 text-white border border-black-700 rounded-b-lg shadow-lg"
        //     ),
        // },
        list: {
            className: "py-2 list-none m-0",
        },
        item: ({ context }: DropdownPassThroughMethodOptions) => ({
            className: classNames(
                "cursor-pointer font-normal overflow-hidden relative whitespace-nowrap",
                "m-0 px-3.5 py-1.5 border-0 transition-shadow duration-200 rounded-none",
                "hover:bg-black-700",
                {
                    "text-gray-700": !context.focused && !context.selected,
                    "bg-gray": context.focused && !context.selected,
                    "bg-red": context.focused && context.selected,
                    "bg-black-700": !context.focused && context.selected,
                }
            ),
        }),
        itemgroup: {
            className: classNames(
                "m-0 p-1 text-gray-800 bg-red font-bold",
                "cursor-auto"
            ),
        },
        filtercontainer: "relative",
        filterinput: {
            className: classNames(
                "pr-7 pl-3 -mr-7",
                "w-full",
                "text-base text-white bg-black-900 p-1.5 border border-black-700 transition duration-200 rounded-lg appearance-none",
                "hover:border-gray focus:border-gray focus:ring-0 focus:outline-none focus:outline-offset-0"
            ),
        },
        filtericon: "absolute right-4",
        clearIcon: {
            className:
                "absolute right-4 text-gray -mt-2 hover:text-white transition-all",
        },
        // transition: {
        //     enterFromClass: "opacity-0 scale-75",
        //     enterActiveClass:
        //         "transition-transform transition-opacity duration-150 ease-in",
        //     leaveActiveClass:
        //         "transition-transform transition-opacity duration-150 ease-linear",
        //     leaveToClass: "opacity-0 scale-75",
        // },
    };

    const virtualScrollerOptions = {
        itemSize: 35,
        autoSize: false,
        scrollHeight: "200px",
        className: classNames(
            "h-[200px] w-full overflow-auto",
            "bg-black-900 border border-black-700 rounded-b-lg"
        ),
    };

    return (
        <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            optionLabel={optionLabel}
            placeholder={placeholder}
            name={placeholder}
            inputId={placeholder}
            filter={filter}
            showClear={showClear}
            loading={isLoading}
            valueTemplate={valueTemplate}
            itemTemplate={itemTemplate}
            className={className}
            pt={passThroughOptions}
            virtualScrollerOptions={virtualScrollerOptions}
        />
    );
};

export default InputDropdown;
