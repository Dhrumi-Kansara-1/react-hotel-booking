import Home from "./Pages/Home"
import List from "./Pages/List"
import Hotel from "./Pages/Hotel"
import Navbar from "./components/Navbar"
import { Routes, Route, useLocation } from "react-router-dom"
import Login from "./Pages/Login"

function App() {
  const location = useLocation()
  const shouldShowNavbar = () => {
    const { pathname } = location
    return !["/login", "/signup"].includes(pathname)
  }

  return (
    <div>
      {shouldShowNavbar() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </div>
  )
}

export default App
