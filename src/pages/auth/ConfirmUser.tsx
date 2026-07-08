import * as React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";


interface ConfirmUserProps {
    dashboardPath: string;
}

const ConfirmUser = (
    { dashboardPath = "/" }: Partial<ConfirmUserProps>
) => {
    const { userConfirm, error, setError } = useAuth();

    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const handleConfirm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await userConfirm(username, code);
            navigate(dashboardPath);
        } catch (err) {
            let errorMessage = "Failed to confirm signup";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="form-container">
            <h2>Confirm Signup</h2>
            <form onSubmit={handleConfirm}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Confirmation Code"
                    required
                />
                <button type="submit">Confirm</button>
            </form>
            {error && <p>{error}</p>}
            <Link to="/login">Back to Login</Link>
        </div>
    );
}

export default ConfirmUser;
