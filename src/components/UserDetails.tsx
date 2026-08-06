import {Link} from "react-router";
import type {AuthUser} from "aws-amplify/auth";


interface UserDetailsProps {
    user: AuthUser | null;
    logoutCall: () => Promise<void>;
    loadingStatus: boolean;
    errorMessage: string | null;
}

const UserDetails = (
    { user, logoutCall, loadingStatus, errorMessage }: UserDetailsProps
) => {
    return (
        <>
            <p>Welcome, {user?.username || "User"}!</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {user === null ?
                <Link to={"/login"}>
                    Login
                </Link> :
                <button onClick={logoutCall} disabled={loadingStatus}>
                    {loadingStatus ? "Logging out..." : "Logout"}
                </button>
            }
        </>
    )
};

export default UserDetails;
