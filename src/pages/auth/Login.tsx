import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material';
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.ts";


const Login = () => {
    const { userLogin, error } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userLogin(username, password);
    };

    return (
        <Grid className="auth-grid">
            <Paper elevation={10} className="form-container">
                <Grid className="avatar">
                    <Avatar><LogIn/></Avatar>
                    <h2>Login</h2>
                </Grid>
                <form className="auth-form" onSubmit={handleLogin}>
                    <TextField
                        type="text"
                        label="Username or Email"
                        placeholder="Username or Email"
                        variant="outlined"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        placeholder="Password"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        className="auth-button"
                        type="submit"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                {error !== null && <Typography>
                    {error}
                </Typography>}
                <Typography>
                    Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
