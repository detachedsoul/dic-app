/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

const WordSearch = ({
	data,
	fetchIsLoading,
	word,
	error,
}: {
	data: any;
	fetchIsLoading: boolean;
	word: string;
	error: boolean;
}) => {
	const { isLoading, isAuthenticated } = useAuth();

	const { replace } = useRouter();

	useEffect(() => {
		if (!isLoading && !fetchIsLoading && !isAuthenticated) {
			setTimeout(() => {
				replace("/login");
			}, 3000);
		}
	}, [isLoading, fetchIsLoading, isAuthenticated, replace]);

	// Check if the fetch is still in progress or if page is loading
	if (isLoading || fetchIsLoading) {
		return (
			<div className="grid place-content-center -translate-y-[10%] h-screen lg:translate-y-0 text-2xl text-center font-semibold animate-pulse">
				Fetching details of the word{" "}
				<span className="text-3xl">{word}</span>
			</div>
		);
	}

	// Show warning before redirecting unauthenticated users
	if (!isLoading && !fetchIsLoading && !isAuthenticated) {
		return (
			<div className="grid place-content-center gap-4 px-4 -translate-y-[10%] h-screen lg:translate-y-0 text-2xl text-red-500 font-semibold">
				You need to login to continue. You would be redirected to the
				login page in 3 seconds...
			</div>
		);
	}

	// Show 404 page if no result was found
	if (error && !isLoading && !fetchIsLoading) {
		notFound();
	}

	return (
		<>
			<Header />

			<div
				className={`flex flex-col gap-4 place-content-center min-h-screen my-8 px-4 lg:grid lg:items-start lg:px-[10%] ${
					data?.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
				}`}
			>
				<h2 className="text-3xl font-semibold lg:col-span-2">
					Word: {word}
				</h2>

				{data?.map((word: any) => (
					<div
						className={`grid gap-4 bg-gray-300 items-start p-4 ${
							data?.length > 1
								? "lg:grid-cols-1"
								: "lg:grid-cols-2"
						}`}
						key={crypto.randomUUID()}
					>
						<div className="space-y-2 bg-gray-200 p-2">
							<h2 className="text-lg">License:</h2>

							<div className="space-y-2">
								<div className="flex items-center flex-wrap gap-4">
									<span className="font-semibold">Name:</span>

									<span className="font-medium">
										{word.license.name}
									</span>
								</div>
							</div>
						</div>

						{word.phonetic && (
							<div className="space-y-2 bg-gray-200 p-2">
								<h2 className="text-lg">Phonetic:</h2>

								<div className="space-y-2">
									<div className="flex items-center flex-wrap gap-4">
										<span className="font-semibold">
											Phonetic:
										</span>

										<span className="font-medium">
											{word.phonetic}
										</span>
									</div>
								</div>
							</div>
						)}

						{word?.phonetics?.length > 0 && (
							<div className="space-y-3 bg-gray-200 p-2">
								<h2 className="text-lg">Phonetics:</h2>

								{word.phonetics.map(
									(details: any, index: number) => (
										<>
											{details?.license?.name &&
												details?.license?.url && (
													<div
														className="space-y-2 border-b border-slate-500 pb-4 last:border-transparent last:pb-0"
														key={index}
													>
														<div className="space-y-2">
															<h3 className="font-semobold">
																License:
															</h3>

															<div className="space-y-2">
																{details
																	?.license
																	?.name && (
																	<div className="flex items-center flex-wrap gap-4">
																		<span className="font-semibold">
																			Name:
																		</span>

																		<span className="font-medium">
																			{
																				details
																					.license
																					.name
																			}
																		</span>
																	</div>
																)}

																{details
																	?.license
																	?.url && (
																	<div className="flex items-center flex-wrap gap-4">
																		<span className="font-semibold">
																			URL:
																		</span>

																		<span className="font-medium">
																			{
																				details
																					.license
																					?.url
																			}
																		</span>
																	</div>
																)}
															</div>
														</div>
													</div>
												)}

											{details.sourceUrl !== "" && (
												<div className="space-y-2">
													<div className="flex items-center flex-wrap gap-4">
														<span className="font-semibold">
															Source URL:
														</span>

														<span className="font-medium">
															{details.sourceUrl}
														</span>
													</div>
												</div>
											)}

											{details.audio !== "" && (
												<div className="space-y-2">
													<div className="flex items-center flex-wrap gap-4">
														<span className="font-semibold">
															Audio:
														</span>

														<audio controls>
															<source
																src={
																	details.audio
																}
															/>
														</audio>
													</div>
												</div>
											)}
										</>
									),
								)}
							</div>
						)}

						{word?.meanings?.length > 0 && (
							<div className="space-y-3 bg-gray-200 p-2">
								<h2 className="text-lg">Meanings:</h2>

								{word.meanings.map((meaning: any) => (
									<>
										<div className="space-y-2">
											<div className="flex items-center gap-4">
												<span className="font-semibold">
													Part of Speech:
												</span>

												<span className="font-medium">
													{meaning.partOfSpeech}
												</span>
											</div>
										</div>

										{meaning.definitions.map(
											(definition: any) => (
												<>
													<div
														className="space-y-2 border-b border-slate-500 pb-4 last:border-transparent last:pb-0"
														key={
															definition.definition
														}
													>
														<div className="space-y-2">
															<div className="flex items-center flex-wrap gap-4">
																<span className="font-semibold">
																	Definition:
																</span>

																<span className="font-medium">
																	{
																		definition.definition
																	}
																</span>
															</div>
														</div>
													</div>
												</>
											),
										)}
									</>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default WordSearch;

export const dynamic = "force-dynamic";
