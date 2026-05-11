import {Route, Routes } from "react-router-dom"
import Search from "./pages/search/Search.tsx";

function App() {
  return (
      <Routes>
          <Route index element={<Search />} />
      </Routes>
  )
}

export default App
