import * as React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { pingSearch, searchCovers } from "../../utils/librarySearch";
import type { BookResult } from "../../types/bookResult";


const Search = () => {
    const { user, getToken } = useAuth();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);
    const [resultsLoading, setResultsLoading] = useState(false);

    useEffect(() => {
        pingSearch()
            .then(() => {
                console.log("Library search ping complete");
            });
    }, []);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setResultsLoading(true);
        const token = user !== null ? await getToken() : null;
        const response = await searchCovers(query, token);

        setResults(response);
        setResultsLoading(false);
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

            <ResultsShelf
                results={results}
                setResults={setResults}
                loading={resultsLoading}
                expectedCount={10}
            />
        </>
    )
}

export default Search;
