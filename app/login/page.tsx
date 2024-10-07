import Login from "@/components/Login";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to continue",
};

const LoginPage = () => {
    return (
        <Login />
    );
};

export default LoginPage;
