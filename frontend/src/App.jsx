import Login from "./pages/Login.jsx";
import Form from "./components/Form.jsx";
import Home from "./pages/Home.jsx";
import Clients from "./pages/Clients.jsx";
import Adduser from "./pages/Adduser.jsx";
import Profile from "./pages/Profile.jsx";
import Userinfo from "./pages/Userinfo.jsx";
import Appshandle from "./pages/Appshandle.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Form" element={<Form />} />
        <Route path="/Clients/Adduser" element={<Adduser/>} />
        <Route path="/Clients/Userinfo" element={<Userinfo/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home/>} />
          <Route path="/Clients" element={<Clients/>} />
          <Route path="/Appshandle" element={<Appshandle/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
