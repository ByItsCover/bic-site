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
        console.log("Current environment:", import.meta.env.VITE_ENVIRONMENT);
        
        const tokens = await getTensorFromText(query);
        const embedResult = await embedTokens(tokens);
        console.log(embedResult);

        const embeddings = embedResult["embeddings"];

        const response = await callLibrarySearch(embeddings);


        // const fakeResponse: BookResult = {
        //     id: 2n,
        //     image: "https://media1.tenor.com/m/sF-65FzDeFIAAAAC/cat-pondering-cat.gif"
        // };
        setResults(response);
    };

    return (
        <>
            <h1>Howdy</h1>
            <p>Do</p>

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
