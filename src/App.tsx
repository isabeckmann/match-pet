import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import RegisterPet from "./pages/RegisterPet";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/cadastrar" element={<RegisterPet />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
