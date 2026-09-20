import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material';
import { UserCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.ts";


const ConfirmUser = () => {
    const { userConfirm, error } = useAuth();

    const [code, setCode] = useState("");

    const handleConfirm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await userConfirm(code);
    };

    return (
        <Grid className="auth-grid">
            <Paper elevation={10} className="form-container">
                <Grid className="avatar">
                    <Avatar><UserCheck/></Avatar>
                    <h2>Confirm Signup</h2>
                </Grid>
                <form className="auth-form" onSubmit={handleConfirm}>
                    <TextField
                        type="text"
                        label="Confirmation Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Confirmation Code"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <Button type="submit">Confirm</Button>
                </form>
                {error !== null && <Typography>
                    {error}
                </Typography>}
                <Typography>
                    Back to <Link to="/login" className="signup-link">Login</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default ConfirmUser;
