import {
    FormEventHandler,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Common/Modal";
import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

const Register = forwardRef<IModalRef>(function Register(_, ref) {
    const modalRef = useRef<IModalRef>({
        open,
        close,
    });

    const { data, setData, post, errors, clearErrors, reset, wasSuccessful } =
        useForm<IRegisterForm>({
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

    const handleSubmitForm: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("auth.register"), {
            preserveScroll: (page) => Object.keys(page.props.errors).length > 0,
        });
    };

    const handleCloseFormModal = (data: boolean) => {
        if (!data) {
            clearErrors();
            reset();
        }
    };

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.open();
        },
        close: () => {
            modalRef.current.close();
        },
    }));

    useEffect(() => {
        if (wasSuccessful) modalRef.current.close();
    }, [wasSuccessful]);

    return (
        <Modal
            ref={modalRef}
            defaultIsOpen={false}
            rootClassName="bg-opacity-95"
            getIsOpenState={handleCloseFormModal}
            contentClassName="bg-black-800 border border-black-700 p-7 rounded-xl w-[400px]"
        >
            {/* Headers */}
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-1">
                    <img
                        src="/images/sineverse-logo.png"
                        alt="Logo"
                        className="w-36"
                    />
                    <p className="text-gray text-xs font-medium">
                        Sign Up to your Account
                    </p>
                </div>
                <button
                    onClick={() => modalRef.current.close()}
                    className="border border-black-700 px-5 py-2.5 rounded-xl text-gray transition-all hover:opacity-70"
                >
                    Close
                </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmitForm} className="mt-6">
                {/* Input Username */}
                <Input
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    onChange={(e) => setData("username", e.target.value)}
                    error={errors.username}
                />

                {/* Input Email */}
                <Input
                    className="mt-5"
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                />

                {/* Input Password */}
                <Input
                    className="mt-5"
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                    autoComplete={"off"}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                />

                {/* Input Password Confirmation */}
                <Input
                    className="mt-5"
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    placeholder="Enter your password confirmation"
                    autoComplete={"off"}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    error={errors.password_confirmation}
                />

                {/* Sign Up Button */}
                <PrimaryButton type="submit" className="mt-8 w-full">
                    Sign Up
                </PrimaryButton>
            </form>
        </Modal>
    );
});

export default Register;
