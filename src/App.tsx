import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import PublicRoutes from "./routes/PublicRoutes.tsx";
import Search from "./pages/search/Search.tsx";
import Recommend from "./pages/recommend/Recommend.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import ConfirmUser from "./pages/auth/ConfirmUser.tsx";

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route element={<ProtectedRoutes />}>
              </Route>
              <Route element={<PublicRoutes />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/confirm" element={<ConfirmUser />} />
              </Route>

              <Route index element={<Recommend />} />
              <Route path="/search" element={<Search />} />

              <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
      </AuthProvider>
  )
}

export default App
