import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    type AuthUser,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    getCurrentUser,
    autoSignIn,
} from "aws-amplify/auth";


interface AuthContextType {
    user: AuthUser | null;
    error: string | null;
    setError:  React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
    userLogin: (username: string, password: string) => Promise<void>;
    userSignup: (username: string, password: string, email: string) => Promise<void>;
    userConfirm: (username: string, code: string) => Promise<void>;
    userLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps extends React.PropsWithChildren {
    dashboardPath: string;
}

const AuthProvider = (
    { children, dashboardPath = "/" }: Partial<AuthProviderProps>
) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((currentUser) => setUser(currentUser))
            .catch((err) => {
                console.error(err);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const userLogin = async (username: string, password: string) => {
        try {
            setError(null); // Reset error state
            await signIn({ username, password }); // AWS Amplify sign-in
            const currentUser = await getCurrentUser();
            setUser(currentUser); // Update user state
            navigate(dashboardPath); // Redirect after login
        } catch (err) {
            let errorMessage = "User login failed";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const userSignup = async (username: string, password: string, email: string) => {
        try {
            setError(null); // Reset errors
            await signUp({
                username,
                password,
                options: {
                    userAttributes: { email }, // Attach email to user
                    autoSignIn: { enabled: true }, // Enable automatic login after signup
                },
            });
            navigate("/confirm"); // Go to confirmation page
        } catch (err) {
            let errorMessage = "User signup failed";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
        }
    };

    const userConfirm = async (username: string, code: string) => {
        try {
            setError(null); // Reset errors
            await confirmSignUp({ username, confirmationCode: code });
            await autoSignIn(); // Automatically log in after confirmation
            const currentUser = await getCurrentUser();
            setUser(currentUser); // Update user state
            navigate(dashboardPath); // Redirect
        } catch (err) {
            let errorMessage = "Failed to confirm signup";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const userLogout = async () => {
        try {
            setError(null); // Reset errors
            await signOut();
            setUser(null); // Clear user state
            navigate("/login"); // Redirect to login page
        } catch (err) {
            let errorMessage = "Failed to log out";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                setError,
                loading,
                setLoading,
                userLogin,
                userSignup,
                userConfirm,
                userLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
