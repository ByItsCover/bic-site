import { Route, Routes } from "react-router-dom"
import Search from "./pages/search/Search.tsx";
import Recommend from "./pages/recommend/Recommend.tsx";

function App() {
  return (
      <Routes>
          <Route index element={<Search />} />
          <Route path="recommend" element={<Recommend />} />
      </Routes>
  )
}

export default App
