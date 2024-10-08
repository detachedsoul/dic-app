/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const fetchData = async (word: string) => {
    try {
		const req = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
		);

		const res = await req.json();

		if (req.status === 404) {
			return {
				isLoading: false,
				data: null,
                error: true
			};
		} else {
			return {
				isLoading: false,
				data: res,
                error: false
			};
		}
	} catch (error: any) {
		return {
			isLoading: false,
			data: error.message,
            error: true
		};
	}
};

export default fetchData;
