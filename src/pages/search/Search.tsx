import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth.ts";
import { getTensorFromText } from "../../utils/tokenHelper";
import { loadClip, loadGliner, embedTokens, extractNER } from "../../utils/modelHelper";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { callLibrarySearch } from "../../utils/librarySearch";
import { rateBook } from "../../utils/rateBook.ts";
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
    const { user, getToken, getAccessToken } = useAuth();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);
    const [clipLoading, setClipLoading] = useState<boolean>(true);
    const [glinerLoading, setGlinerLoading] = useState<boolean>(true);

    useEffect(() => {
        loadClip().then(() => setClipLoading(false));
        loadGliner().then(() => setGlinerLoading(false));
    }, []);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        if (clipLoading || glinerLoading) {
            console.log("Models loading...");
        }

        const [vectorResults, nerResults] = await Promise.all([
            getSemanticResults(query),
            getKeywordResults(query),
        ]);

        console.log("Vector:", vectorResults);
        console.log("NER Results:", nerResults);

        const token = user !== null ? await getToken() : null;
        const response = await callLibrarySearch(vectorResults, nerResults, token);

        setResults(response);
    };

    const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        console.log("Calling rating API...");
        const token = user !== null ? await getToken() : null;
        const accessToken = user !== null ? await getAccessToken() : null;
        if (token === null || accessToken === null) {
            console.error("Cannot rate as unauthenticated user");
            return;
        }

        console.log("Trying with ID token...");
        await rateBook(token);
        console.log("Trying with Access token...");
        await rateBook(accessToken);
    };

    return (
        <>
            <Link to={"/"}>
                Recommend Page
            </Link>
            <h1>Covers Library Search</h1>
            <p>Find books by vague descriptions</p>
            <hr/>

            <SearchBar 
                query={query} 
                setQuery={setQuery}
                searchSubmit={handleSearch}
            />

            <button onClick={handleRating}>
                Rating Test
            </button>

            <ResultsShelf results={results} />
        </>
    )
}

export default Search;
