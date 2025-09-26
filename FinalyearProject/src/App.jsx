import Login from "./pages/Login.jsx";
import Form from "./pages/Form.jsx";
import Hero from "./pages/Hero.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Hero" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}
