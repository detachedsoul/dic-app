import WordSearch from "@/components/WordSearch";

const Word = ({params}: {params: {word: string}}) => {
    return <WordSearch word={params.word} />;
};

export default Word;
