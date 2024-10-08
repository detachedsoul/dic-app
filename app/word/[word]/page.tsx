import WordSearch from "@/components/WordSearch";
import fetchData from "@/actions/fetch-data";

const Word = async ({params}: {params: {word: string}}) => {
    const {data, isLoading, error} = await fetchData(params.word);

    return <WordSearch data={data} fetchIsLoading={isLoading} word={params.word} error={error} />;
};

export default Word;

export const dynamic = "force-dynamic";
