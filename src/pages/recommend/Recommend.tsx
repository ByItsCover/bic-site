import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { JWT } from "aws-amplify/auth";
import { useAuth } from "../../hooks/useAuth.ts";
import { ResultsShelf } from "../../components/ResultsShelf.tsx";
import { callSuggestApi } from "../../utils/suggestBooks.ts";
import type { BookResult } from "../../types/bookResult.ts";


const Recommend = () => {
    const { user, attributes, getToken, userLogout, error, loading } = useAuth();

    const [results, setResults] = useState<BookResult[]>([]);

    useEffect(() => {
        getToken()
            .then(async (token) => {
                let currentToken: JWT | null = null;
                if (user !== null && token !== null) {
                    currentToken = token;
                }

                const response = await callSuggestApi(currentToken);
                setResults(response);
            })
    }, [user, getToken]);

    return (
        <>
            <Link to={"/search"}>
                Search Page
            </Link>
            <p>Welcome, {attributes?.username || "User"} with email {attributes?.email || "Email"} and id {attributes?.uid || "ID"}!</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user === null ?
                <Link to={"/login"}>
                    Login
                </Link> :
                <button onClick={userLogout} disabled={loading}>
                    {loading ? "Logging out..." : "Logout"}
                </button>
            }
            <h1>Recommendation Page</h1>

            <ResultsShelf results={results} />

            <p>Under Construction</p>
        </>
    )
}

export default Recommend;
