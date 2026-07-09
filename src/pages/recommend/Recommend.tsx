import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

const Recommend = () => {
    const { user, userLogout, error, loading } = useAuth();

    return (
        <>
            <Link to={"/"}>
                Search Page
            </Link>
            <p>Welcome, {user?.username || "User"}!</p>
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
