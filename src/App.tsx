import { Route, Routes } from "react-router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from "./components/AuthProvider.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import PublicRoutes from "./routes/PublicRoutes.tsx";
import NavBar from "./routes/NavBar.tsx";
import Search from "./pages/search/Search.tsx";
import Ratings from "./pages/ratings/Ratings.tsx";
import Recommend from "./pages/recommend/Recommend.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import ConfirmUser from "./pages/auth/ConfirmUser.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
      <AuthProvider>
          <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Routes>
                  <Route element={<NavBar />}>
                      <Route element={<ProtectedRoutes />}>
                          <Route path="/ratings" element={<Ratings />} />
                      </Route>
                  </Route>

                  <Route element={<PublicRoutes />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/confirm" element={<ConfirmUser />} />
                  </Route>

                  <Route element={<NavBar />}>
                      <Route index element={<Recommend />} />
                      <Route path="/search" element={<Search />} />
                  </Route>

                  <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Routes>
          </ThemeProvider>
      </AuthProvider>
  )
}

export default App
