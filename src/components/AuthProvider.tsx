import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    type AuthUser,
    type JWT,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    getCurrentUser,
    autoSignIn,
    fetchUserAttributes,
    fetchAuthSession,
} from "aws-amplify/auth";
import { v4 as uuidv4 } from "uuid";
import type { UserAttributes } from "../types/userAttributes.ts";


interface AuthContextType {
    user: AuthUser | null;
    attributes: UserAttributes | null;
    getToken: () => Promise<JWT | null>;
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
    const [attributes, setAttributes] = useState<UserAttributes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((currentUser) => setUser(currentUser))
            .catch((err) => {
                let errorMessage = "Get User failed";
                if (err instanceof Error) {
                    errorMessage += ": " + err.message;
                }
                console.error(errorMessage, err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchUserAttributes()
            .then((currentUserAttributes) => {
                if (user !== null) {
                    setAttributes({
                        username: user.username,
                        email: currentUserAttributes.email!,
                        uid: currentUserAttributes["custom:uid"]!,
                    });
                } else {
                    setAttributes(null);
                }
            })
            .catch((err) => {
                let errorMessage = "User attributes fetch failed";
                if (err instanceof Error) {
                    errorMessage += ": " + err.message;
                }
                console.error(errorMessage, err);
                setAttributes(null);
            })
            .finally(() => setLoading(false));
    }, [user]);

    const userLogin = async (username: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            await signIn({ username, password });
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            navigate(dashboardPath);
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
            setError(null);
            setLoading(true);
            const uid = uuidv4();
            await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email: email,
                        "custom:uid": uid,
                    },
                    autoSignIn: { enabled: true },
                },
            });
            navigate("/confirm");
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
            setError(null);
            setLoading(true);
            await confirmSignUp({ username, confirmationCode: code });
            await autoSignIn();
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            navigate(dashboardPath);
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
            setError(null);
            setLoading(true);
            await signOut();
            setUser(null);
            navigate("/login");
        } catch (err) {
            let errorMessage = "Failed to log out";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
        }
    };

    const getToken = async () => {
        const session = await fetchAuthSession();
        return session.tokens?.idToken ?? null
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                attributes,
                getToken,
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
