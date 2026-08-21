import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth.ts";
import UserDetails from "../../components/UserDetails.tsx";
import { ResultsShelf } from "../../components/ResultsShelf.tsx";
import { getRatings } from "../../utils/suggest.ts";
import type { BookResult } from "../../types/bookResult.ts";


const Ratings = () => {
    const { user, getToken, loading } = useAuth();

    const [results, setResults] = useState<BookResult[]>([]);

    useEffect(() => {
        if (loading) {
            return;
        }

        getToken()
            .then(async (token) => {
                if (user === null || token === null) {
                    console.error("Cannot fetch ratings as unauthenticated user");
                    return;
                }

                const response = await getRatings(token);
                setResults(response);
            });
    }, [user, loading, getToken]);

    return (
        <>
            <Link to={"/"}>
                Recommend Page
            </Link>
            <Link to={"/search"}>
                Search Page
            </Link>
            <UserDetails/>
            <h1>Ratings Page</h1>

            <ResultsShelf results={results} setResults={setResults} />
        </>
    )
}

export default Ratings;
