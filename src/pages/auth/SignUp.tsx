import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import ReactPasswordChecklist from "react-password-checklist";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material';
import { X, Check, UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.ts";
import "./auth.css";


const SignUp = () => {
    const { userSignup, error } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notValid, setNotValid] = useState(true);

    const customIcons = {
        ValidIcon: <Check className="success" />,
        InvalidIcon: <X className="failure" />
    };

    const handleSignup = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userSignup(username, password, email);
    };

    return (
        <Grid className="auth-grid">
            <Paper elevation={10} className="form-container">
                <Grid className="avatar">
                    <Avatar><UserPlus/></Avatar>
                    <h2>Signup</h2>
                </Grid>
                <form className="auth-form" onSubmit={handleSignup}>
                    <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <Button
                        className="auth-button"
                        disabled={notValid}
                        type="submit"
                        color="primary"
                        fullWidth
                    >
                        Signup
                    </Button>
                </form>
                {error !== null && <Typography>
                    {error}
                </Typography>}
                <Typography>
                    Already have an account? <Link to="/login" className="signup-link">Login</Link>
                </Typography>
            </Paper>

            <Paper elevation={10} className="checklist-container">
                {/* Pull Requirements from Infra outputs */}
                <ReactPasswordChecklist
                    rules={["minLength","number","capital"]}
                    minLength={8}
                    value={password}
                    onChange={(valid) => {setNotValid(!valid)}}
                    iconComponents={customIcons}
                />
            </Paper>
        </Grid>
    );
}

export default SignUp;
