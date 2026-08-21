import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";
import { useEffect, useState } from "react";


const UserDetails = () => {
    const { user, getUserAttributes, userLogout, error, loading } = useAuth();

    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        if (loading) {
            return;
        }

        getUserAttributes()
            .then((attributes) => {
                setUserName(attributes?.username ?? null);
            });
    }, [user, loading]);

    return (
        <>
            <p>Welcome, {userName || "User"}!</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user === null ?
                <Link to={"/login"}>
                    Login
                </Link> :
                <button onClick={userLogout} disabled={loading}>
                    {loading ? "Logging out..." : "Logout"}
                </button>
            }
        </>
    )
};

export default UserDetails;
