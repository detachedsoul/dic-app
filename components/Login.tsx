"use client";

import { useRouter, redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

const Login = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { replace } = useRouter();

    const validateForm = (name: string, email: string) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const isNameValid = name.trim() !== "";

		return isValidEmail && isNameValid;
	};

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => {
			const updatedValues = { ...prevValues, [name]: value };

			setIsButtonDisabled(
				!validateForm(updatedValues.name, updatedValues.email),
			);

			return updatedValues;
		});
    };

    const login = (e: FormEvent) => {
		e.preventDefault();
        setIsLoading(true);

        const userDetails = {
            name: formValues.name,
            email: formValues.email
        };

        try {
            localStorage.setItem("user-details", JSON.stringify(userDetails));

            setIsLoading(false);

            replace("/");
        } catch (error: unknown) {
            console.error("An error occured", error);
        }
	};

    useEffect(() => {
		if (typeof window !== "undefined") {
			const getUserDetails = localStorage.getItem("user-details");

			if (getUserDetails) {
				redirect("/");
			}
		}
	}, []);

	return (
		<form
			className="grid place-content-center gap-4 px-4 h-screen"
			onSubmit={login}
		>
			<h1 className="text-2xl text-center mb-4 font-semibold">
				Login to continue
			</h1>

			<label htmlFor="name">
				<input
					className="py-2.5 px-4 border border-slate-500 focus:outline-none rounded w-full"
					type="text"
					name="name"
					id="name"
					placeholder="Enter your name"
					onChange={handleChange}
				/>
			</label>

			<label htmlFor="email">
				<input
					className="py-2.5 px-4 border border-slate-500 focus:outline-none rounded w-full"
					type="email"
					name="email"
					id="email"
					placeholder="Enter your email"
					onChange={handleChange}
				/>
			</label>

			<button
				className={`bg-blue-500 text-white rounded py-3 hover:bg-blue-500/70 px-4 font-semibold ${
					isButtonDisabled ? "cursor-not-allowed bg-red-500/50" : ""
				}`}
				type="submit"
				disabled={isButtonDisabled || isLoading}
			>
				{isLoading ? "Logging in..." : "Login"}
			</button>
		</form>
	);
};

export default Login;
