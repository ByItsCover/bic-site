import { useState } from "react";
import { getTensorFromText } from "../../utils/tokenHelper";
import { embedTokens } from "../../utils/modelHelper";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { callLibrarySearch } from "../../utils/librarySearch";
import type { BookResult } from "../../types/bookResult";

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const tokens = await getTensorFromText(query);
        console.log("Tokens:", tokens);
        const embedResult = await embedTokens(tokens);
        console.log("Embeddings:", embedResult);

        const embeddings = embedResult["embeddings"];
        const vector = Array.prototype.slice.call(embeddings.data);
        console.log("Vector:", vector);

        const response = await callLibrarySearch(vector);

        setResults(response);
    };

    return (
        <>
            <h1>Covers Library Search</h1>
            <p>Find books by vague descriptions</p>

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
