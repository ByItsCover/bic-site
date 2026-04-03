import {Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home.tsx";
import Search from "./pages/search/Search.tsx";

function App() {
  return (
      <Routes>
          <Route index element={<Search />} />
          <Route path="home" element={<Home />} />
      </Routes>
  )
}

export default App
