import Login from "./pages/Login.jsx";
import Form from "./components/Form.jsx";
import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Form" element={<Form />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
