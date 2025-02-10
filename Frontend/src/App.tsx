import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import Login_success from "./pages/Login_success"
import SharedContent from "./pages/SharedContent"
import Home from "./pages/Home"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/login-success" element={<Login_success />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/share/:hash" element={<SharedContent />} />
    </Routes>
  </BrowserRouter>
}

export default App
