import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import { ResultsShelf } from "../../components/ResultsShelf.tsx";
import { getRatings } from "../../utils/suggest.ts";
import type { BookResult } from "../../types/bookResult.ts";


const Ratings = () => {
    const { user, getToken, loading } = useAuth();

    const [results, setResults] = useState<BookResult[]>([]);
    const [resultsLoading, setResultsLoading] = useState(true);

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
                setResultsLoading(false);
            });
    }, [user, loading, getToken]);

    return (
        <>
            <h1>Ratings</h1>

            <ResultsShelf
                results={results}
                setResults={setResults}
                loading={resultsLoading}
                expectedCount={10}
            />
        </>
    )
}

export default Ratings;
