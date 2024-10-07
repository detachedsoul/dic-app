"use client";

import Header from "@/components/Header";
import Index from "@/components/Index";
import useAuth from "@/hooks/useAuth";

export default function Home() {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="grid place-content-center h-screen text-2xl text-center font-semibold animate-pulse">Loading...</div>
        );
    }

	return (
		<>
			<Header />

			<Index />
		</>
	);
}
