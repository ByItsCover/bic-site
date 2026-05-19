import { useState } from "react";
import { getTensorFromText } from "../../utils/tokenHelper";
import { embedTokens, extractNER } from "../../utils/modelHelper";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { callLibrarySearch } from "../../utils/librarySearch";
import type { BookResult } from "../../types/bookResult";
import type { NerResult } from "../../types/nerResult.ts";
import {NER_SEARCH_LABELS} from "../../constants.ts";

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const rawNer = await extractNER(query);
        const nerResults: NerResult[] = rawNer[0].filter(res => NER_SEARCH_LABELS.includes(res.label))
            .map((res) => ({
                label: res.label,
                text: res.spanText,
                score: res.score,
            }));
        console.log("NER Results:", nerResults);
        
        const tokens = await getTensorFromText(query);
        console.log("Tokens:", tokens);
        const embedResult = await embedTokens(tokens);
        console.log("Embeddings:", embedResult);

        const embeddings = embedResult["embeddings"];
        const vector = Array.prototype.slice.call(embeddings.data);
        console.log("Vector:", vector);

        const response = await callLibrarySearch(vector, nerResults);

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
