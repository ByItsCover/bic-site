import * as React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";


interface LoginProps {
    dashboardPath: string;
}

const Login = (
    { dashboardPath = "/" }: Partial<LoginProps>
) => {
    const { userLogin, error, setError } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await userLogin(email, password);
            navigate(dashboardPath);
        } catch (err) {
            let errorMessage: string | null = null;
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage || JSON.stringify(err));
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
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
