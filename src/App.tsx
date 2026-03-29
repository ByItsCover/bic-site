import {Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home.tsx";
import Search from "./pages/search/Search.tsx";

function App() {
  return (
      <Routes>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
      </Routes>
  )
}

export default App
