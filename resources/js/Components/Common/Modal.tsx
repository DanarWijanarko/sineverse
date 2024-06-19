import {
    Fragment,
    PropsWithChildren,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { classNames } from "primereact/utils";
import { Transition, TransitionChild } from "@headlessui/react";

const modalElement = document.getElementById("modal-root");

const Modal = forwardRef(function Modal(
    {
        rootClassName,
        contentClassName,
        children,
        defaultIsOpen = false,
        getIsOpenState = () => {},
    }: PropsWithChildren<{
        rootClassName: string;
        contentClassName: string;
        defaultIsOpen: boolean;
        getIsOpenState?: (data: boolean) => void;
    }>,
    ref
) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
        setTimeout(() => {
            getIsOpenState(isOpen);
        }, 300);
    }, []);

    const handleKeyDown = useCallback(
        (event: any) => {
            if (event.keyCode === 27) handleClose();
        },
        [handleClose]
    );

    useImperativeHandle(
        ref,
        () => ({
            open: handleOpen,
            close: handleClose,
        }),
        [handleClose]
    );

    useEffect(() => {
        if (isOpen) document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown, isOpen]);

    return createPortal(
        <Transition show={isOpen} as={Fragment}>
            {/* Background Overlay */}
            <TransitionChild
                as={Fragment}
                enter="transition-opacity ease-linear duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    onClick={() => handleClose()}
                    className={classNames(
                        "fixed z-[9999] top-0 left-0 bottom-0 right-0 bg-black-900",
                        rootClassName
                    )}
                ></div>
            </TransitionChild>

            {/* Modal Content */}
            <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={classNames(
                        "fixed z-[99999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
                        contentClassName
                    )}
                >
                    {children}
                </div>
            </TransitionChild>
        </Transition>,
        modalElement as Element
    );
});

export default Modal;
