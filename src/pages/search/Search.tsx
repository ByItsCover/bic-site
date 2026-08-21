import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth.ts";
import UserDetails from "../../components/UserDetails.tsx";
import { SearchBar } from "../../components/SearchBar";
import { ResultsShelf } from "../../components/ResultsShelf";
import { searchCovers } from "../../utils/librarySearch";
import type { BookResult } from "../../types/bookResult";


const Search = () => {
    const { user, getToken, userLogout, error, loading } = useAuth();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);

    const handleSearch = async (event: React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        const token = user !== null ? await getToken() : null;
        const response = await searchCovers(query, token);

        setResults(response);
    };

    return (
        <>
            <Link to={"/"}>
                Recommend Page
            </Link>
            {user !== null && <Link to={"/ratings"}>
                Ratings Page
            </Link>}
            <UserDetails
                user={user}
                logoutCall={userLogout}
                loadingStatus={loading}
                errorMessage={error}
            />
            <h1>Covers Library Search</h1>
            <p>Find books by vague descriptions</p>
            <hr/>

            <SearchBar 
                query={query} 
                setQuery={setQuery}
                searchSubmit={handleSearch}
            />

            <ResultsShelf results={results} setResults={setResults} />
        </>
    )
}

export default Search;
