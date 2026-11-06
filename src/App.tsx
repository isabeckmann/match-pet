import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./contexts/AuthProvider";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Matches from "./pages/Matches";
import RegisterPet from "./pages/RegisterPet";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<Signup />} />
            <Route path="/redefinir-senha" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Discover />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/cadastrar" element={<RegisterPet />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
