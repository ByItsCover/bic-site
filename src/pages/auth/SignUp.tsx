import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

const SignUp = () => {
    const { userSignup, error } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userSignup(email, password, email);
    };

    return (
        <div className="form-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Signup</button>
            </form>
            {error && <p>{error}</p>}
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default SignUp;
