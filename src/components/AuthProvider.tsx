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
    updateUserAttributes,
} from "aws-amplify/auth";
import { v4 as uuidv4 } from "uuid";
import type { UserAttributes } from "../types/userAttributes.ts";


interface AuthContextType {
    user: AuthUser | null;
    getUserAttributes: () => Promise<UserAttributes | null>;
    getToken: () => Promise<JWT | null>;
    error: string | null;
    setError:  React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
    userLogin: (username: string, password: string) => Promise<void>;
    userSignup: (username: string, password: string, email: string) => Promise<void>;
    userConfirm: (code: string) => Promise<void>;
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
    const [uid, setUid] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
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
            })
            .finally(() => setLoading(false));
    }, []);

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
            const new_uid = uuidv4();
            setUid(new_uid);
            await signUp({
                username: new_uid,
                password,
                options: {
                    userAttributes: {
                        email: email,
                        "custom:uid": new_uid,
                    },
                    autoSignIn: true,
                },
            });
            setUserName(username);
            navigate("/confirm");
        } catch (err) {
            let errorMessage = "User signup failed";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const userConfirm = async (code: string) => {
        try {
            setError(null);
            setLoading(true);
            await confirmSignUp({ username: uid!, confirmationCode: code });
            await autoSignIn();
            await updateUserAttributes({
                userAttributes: {
                    preferred_username: userName!
                }
            });
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
            navigate(dashboardPath);
        } catch (err) {
            let errorMessage = "Failed to log out";
            if (err instanceof Error) {
                errorMessage += ": " + err.message;
            }
            console.error(errorMessage, err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getUserAttributes = async () => {
        const fetchedAttributes = await fetchUserAttributes();

        const parsedAttributes: UserAttributes | null = user === null ? null : {
            username: fetchedAttributes.preferred_username!,
            email: fetchedAttributes.email!,
            uid: fetchedAttributes["custom:uid"]!,
        };
        return parsedAttributes;
    };

    const getToken = async () => {
        const session = await fetchAuthSession();
        return session.tokens?.accessToken ?? null
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                getUserAttributes,
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
