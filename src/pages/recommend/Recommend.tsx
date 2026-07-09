import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

const Recommend = () => {
    const { attributes, userLogout, error, loading } = useAuth();

    return (
        <>
            <Link to={"/search"}>
                Search Page
            </Link>
            <p>Welcome, {attributes?.username || "User"} with email {attributes?.email || "Email"} and id {attributes?.uid || "ID"}!</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={userLogout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
            </button>
            <h1>Recommendation Page</h1>
            <p>Under Construction</p>
        </>
    )
}

export default Recommend;
