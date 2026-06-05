import { useState, useEffect } from "react";
import { getTensorFromText } from "../../utils/tokenHelper";
import { loadClip, loadGliner, embedTokens, extractNER } from "../../utils/modelHelper";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { callLibrarySearch } from "../../utils/librarySearch";
import type { BookResult } from "../../types/bookResult";
import type { NerResult } from "../../types/nerResult.ts";
import { NER_SEARCH_LABELS } from "../../constants.ts";
import "./search.css"

const getSemanticResults = async (query: string) => {
    const tokens = await getTensorFromText(query);
    console.log("Tokens:", tokens);
    const embedResult = await embedTokens(tokens);
    console.log("Embeddings:", embedResult);

    const embeddings = embedResult["embeddings"];
    return Array.prototype.slice.call(embeddings.data);
};

const getKeywordResults = async (query: string) => {
    const rawNer = await extractNER(query);
    const nerResults: NerResult[] = rawNer[0].filter(res => NER_SEARCH_LABELS.includes(res.label))
        .map((res) => ({
            label: res.label,
            text: res.spanText,
            score: res.score,
        }));
    return nerResults;
};

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([
        {cover_id: 1, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=640"},
        {cover_id: 2, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=240"},
        {cover_id: 3, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=640"},
        {cover_id: 4, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=240"},
        {cover_id: 5, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=640"},
        {cover_id: 6, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=340"},
        {cover_id: 7, cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1468196828i/30985381.jpg"},
        {cover_id: 8, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=640"},
        {cover_id: 9, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=740"},
        {cover_id: 10, cover_url: "https://www.hachettebookgroup.com/wp-content/uploads/2023/10/9780316554909.jpg?w=140"},

    ]);

    useEffect(() => {
        loadClip();
        loadGliner();
    }, []);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const [vectorResults, nerResults] = await Promise.all([
            getSemanticResults(query),
            getKeywordResults(query),
        ]);

        console.log("Vector:", vectorResults);
        console.log("NER Results:", nerResults);

        const response = await callLibrarySearch(vectorResults, nerResults);

        setResults(response);
    };

    return (
        <>
            <h1>Covers Library Search</h1>
            <p>Find books by vague descriptions</p>
            <hr/>

            <SearchBar 
                query={query} 
                setQuery={setQuery}
                searchSubmit={handleSearch}
            />

            <ResultsShelf results={results} />
        </>
    )
}

export default Search;
