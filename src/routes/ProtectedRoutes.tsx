import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";
import * as React from "react";


interface ProtectedRouteProps extends React.PropsWithChildren {
    redirectPath: string;
}

const ProtectedRoutes = (
    { children, redirectPath = "/" }: Partial<ProtectedRouteProps>
) => {
    const { user } = useAuth(); // Get current user from context

    // If user is logged in, redirect to dashboard
    if (user === null) {
        return <Navigate to={redirectPath} replace />
    }

    // If children were passed, render them
    // Otherwise, use <Outlet /> to render nested routes
    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
