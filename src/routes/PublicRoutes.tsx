import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";
import * as React from "react";


type PublicRouteProps = React.PropsWithChildren;

const PublicRoutes = (
    { children }: PublicRouteProps
) => {
    const { user } = useAuth(); // Get current user from context

    // If user is logged in, redirect to dashboard
    if (user !== null) {
        return <Navigate to="/" replace />
    }

    // If children were passed, render them
    // Otherwise, use <Outlet /> to render nested routes
    return children ? <>{children}</> : <Outlet />;
};

export default PublicRoutes;
