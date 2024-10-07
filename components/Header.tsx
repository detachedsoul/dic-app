"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
    const { isAuthenticated, userDetails } = useAuth();
    const { replace } = useRouter();

    const logout = () => {
        localStorage.removeItem("user-details");
        replace("/login");
    };

    return (
		<header className="flex items-center justify-between p-4 sticky top-0 z-50 lg:px-[10%] bg-slate-100">
			<h1 className="font-semibold text-xl">
				Hello, {isAuthenticated ? userDetails.name : "there"}
			</h1>

			{isAuthenticated ? (
				<button
					className="bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-500/70 px-4 font-semibold"
					type="button"
					onClick={logout}
				>
					Logout
				</button>
			) : (
				<Link
					className="bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-500/70 px-4 font-semibold"
					href="/login"
				>
					Login
				</Link>
			)}
		</header>
	);
};

export default Header;
