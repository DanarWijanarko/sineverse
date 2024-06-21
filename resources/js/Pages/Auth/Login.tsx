import { FormEventHandler, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";

import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Checkbox from "@/Components/Forms/Checkbox";
import Modal from "@/Components/Common/Modal";
import Input from "@/Components/Forms/Input";

const Login = forwardRef<IModalRef>(function Login(_, ref) {
	const modalRef = useRef<IModalRef>({
		open,
		close,
	});

	const { data, setData, post, errors, clearErrors, reset, wasSuccessful } = useForm<ILoginForm>({
		email: "",
		password: "",
		remember: false,
	});

	const handleSubmitForm: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("auth.login"), {
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
			<div className="flex flex-row items-start justify-between">
				<div className="flex flex-col gap-1">
					<img src="/images/sineverse-logo.png" alt="Logo" className="w-36" />
					<p className="text-xs font-medium text-gray">Sign In to your Account</p>
				</div>
				<button
					onClick={() => modalRef.current.close()}
					className="rounded-xl border border-black-700 px-5 py-2.5 text-gray transition-all hover:opacity-70"
				>
					Close
				</button>
			</div>

			{/* Content */}
			<form onSubmit={handleSubmitForm} className="mt-6">
				{/* Input Email */}
				<Input
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

				{/* Remember me & forgot Password? */}
				<div className="mt-5 flex flex-row justify-between">
					{/* Remember me */}
					<Checkbox
						name="remember"
						label="Remember Me"
						value={data.remember}
						checked={data.remember}
						onChange={(e) => setData("remember", e.target.checked)}
						position="right"
					/>

					{/* Forgot Password */}
					<Link
						href="#"
						className="text-xs font-light text-white transition-all hover:opacity-80"
					>
						Forgot Password?
					</Link>
				</div>

				{/* Sign In Button */}
				<PrimaryButton type="submit" className="mt-5 w-full">
					Sign In
				</PrimaryButton>
			</form>
		</Modal>
	);
});

export default Login;
