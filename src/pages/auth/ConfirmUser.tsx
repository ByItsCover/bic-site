import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth.ts";


const ConfirmUser = () => {
    const { userConfirm, error } = useAuth();

    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const handleConfirm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userConfirm(username, code);
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
