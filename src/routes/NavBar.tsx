import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
    AppBar, Box, Divider, Drawer,
    IconButton, List, ListItem, Skeleton, Toolbar, Typography
} from "@mui/material";
import { Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth.ts";
import type { RouteInfo } from "../types/routeInfo.ts";
import "./navigation.css";


const navItems: RouteInfo[] = [
    {name: "Recommend", route: "/", protected: false},
    {name: "Search", route: "/search", protected: false},
    {name: "Ratings", route: "/ratings", protected: true},
];

const NavBar = () => {
    const { user, getUserAttributes, userLogout, loading } = useAuth();

    const [userName, setUserName] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }

        getUserAttributes()
            .then((attributes) => {
                setUserName(attributes?.username ?? null);
            });
    }, [user, loading]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const location = useLocation();
    const currentPath = location.pathname;

    const drawer = (
        <Box className="drawer-content" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            {loading ? <Skeleton className="text-load drawer-heading" variant="text" />
                : <Typography
                    variant="h6"
                    component="div"
                    className="drawer-heading"
                >
                    Welcome{userName !== null && `, ${userName}`}!
                </Typography>
            }
            <Divider />
            <List>
                {navItems
                    .filter(info => {
                        if (info.protected && user === null) {
                            return false;
                        }
                        return info.route !== currentPath;
                    })
                    .map(info => {
                        return <ListItem key={info.name} disablePadding>
                            <Link className="drawer-center" to={info.route}>
                                {info.name}
                            </Link>
                        </ListItem>
                    })}
                <Box className="drawer-center">
                    {user === null ?
                        <Link to={"/login"}>
                            Login
                        </Link> :
                        <button onClick={userLogout} disabled={loading} color="inherit">
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    }
                </Box>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar component="nav">
                <Toolbar className="menu-bar">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className="hamburger menu-right"
                    >
                        <Menu />
                    </IconButton>

                    <Box className="outside-drawer menu-left">
                        {navItems
                            .filter(info => {
                                if (info.protected && user === null) {
                                    return false;
                                }
                                return info.route !== currentPath;
                            })
                            .map(info => (
                                <Link key={info.name} to={info.route}>
                                    {info.name}
                                </Link>
                            ))}
                    </Box>

                    {loading ? <Skeleton className="outside-drawer text-load" variant="text" />
                        : <Typography
                            variant="h6"
                            component="div"
                            className="outside-drawer"
                        >
                            Welcome{userName !== null && `, ${userName}`}!
                        </Typography>
                    }

                    <Box className="outside-drawer menu-right">
                        {user === null ?
                            <Link to={"/login"}>
                                Login
                            </Link> :
                            <button onClick={userLogout} disabled={loading} color="inherit">
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    className="inside-drawer"
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar />
            <Outlet />
        </>
    );
}

export default NavBar;
