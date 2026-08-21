import { useEffect, useState } from "react";
import type { JWT } from "aws-amplify/auth";
import { useAuth } from "../../hooks/useAuth.ts";
import { ResultsShelf } from "../../components/ResultsShelf.tsx";
import { suggestCovers } from "../../utils/suggest.ts";
import type { BookResult } from "../../types/bookResult.ts";


const Recommend = () => {
    const { user, getToken, loading } = useAuth();

    const [results, setResults] = useState<BookResult[]>([]);
    const [resultsLoading, setResultsLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            return;
        }

        getToken()
            .then(async (token) => {
                let currentToken: JWT | null = null;
                if (user !== null && token !== null) {
                    currentToken = token;
                }

                const response = await suggestCovers(currentToken);
                setResults(response);
                setResultsLoading(false);
            });
    }, [user, loading, getToken]);

    return (
        <>
            <h1>By-Its-Cover</h1>

            <ResultsShelf
                results={results}
                setResults={setResults}
                loading={resultsLoading}
                expectedCount={20}
            />
        </>
    )
}

export default Recommend;
