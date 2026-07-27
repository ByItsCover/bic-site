import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth.ts";


const Login = () => {
    const { userLogin, error } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userLogin(email, password);
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error !== null && <p>{error}</p>}
            <Link to="/signup" className="signup-link">
                Don't have an account? Sign up
            </Link>
        </div>
    );
}

export default Login;
