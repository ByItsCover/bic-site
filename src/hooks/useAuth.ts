import { useContext } from 'react';
import { AuthContext } from "../components/AuthProvider.tsx";


export const useAuth = () => useContext(AuthContext);
