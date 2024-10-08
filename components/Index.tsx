"use client";

import { ChangeEvent, useState } from "react";

const Index = () => {
    const [word, setWord] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setWord(value);
    };

    return (
		<form className="grid place-content-center gap-4 px-4 -translate-y-[15%] h-screen lg:translate-y-0">
			<h1 className="text-2xl text-center mb-4 font-semibold">
				Enter any word
			</h1>

			<label htmlFor="name">
				<input
					className="py-2.5 px-4 border border-slate-500 focus:outline-none rounded w-full"
					type="text"
					name="word"
					id="word"
					placeholder="Enter word"
					onChange={handleChange}
				/>
			</label>

			<button
                className={`text-white rounded py-3 px-4 font-semibold ${word === "" ? "cursor-not-allowed bg-red-500/50 pointer-events-none" : "bg-blue-500"}`}
                type="button"
                onClick={() => {
                    window.location.href = `/word/${word.toLowerCase()}`;
                }}
                disabled={word === ""}
            >
                Search
            </button>
		</form>
	);
};

export default Index;
