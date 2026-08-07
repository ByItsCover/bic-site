import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { JWT } from "aws-amplify/auth";
import { useAuth } from "../../hooks/useAuth.ts";
import UserDetails from "../../components/UserDetails.tsx";
import { ResultsShelf } from "../../components/ResultsShelf.tsx";
import callSuggestApi from "../../utils/suggestBooks.ts";
import type { BookResult } from "../../types/bookResult.ts";


const Recommend = () => {
    const { user, getToken, userLogout, error, loading } = useAuth();

    const [results, setResults] = useState<BookResult[]>([]);

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

                const response = await callSuggestApi(currentToken);
                setResults(response);
            });
    }, [user, loading, getToken]);

    return (
        <>
            <Link to={"/search"}>
                Search Page
            </Link>
            <UserDetails
                user={user}
                logoutCall={userLogout}
                loadingStatus={loading}
                errorMessage={error}
            />
            <h1>Recommendation Page</h1>

            <ResultsShelf results={results} setResults={setResults} />

            <p>Under Construction</p>
        </>
    )
}

export default Recommend;
