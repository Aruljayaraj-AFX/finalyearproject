// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect,useState,createContext } from "react";
import {useNavigate} from "react-router-dom"

export const ClientContext = createContext(null);

export default function MainLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [client_logo, setCompanyLogo] = useState(null);
  const [client_name, setName] = useState(null);
  const [clientcompanyname, setCompanyName] = useState(null);
  const [client_description , setDescription] = useState(null);
  const [client_slogan , setSlogan] = useState(null);
  const [client_phoneno, setPhone] = useState(null);
  const [client_country, setCountry] = useState(null);
  const [client_state, setState] = useState(null);
  const [client_district, setDistrict] = useState(null);
  const checkload = 0;
  const navigate = useNavigate();
  const activeToken = localStorage.getItem("token");
  const [clientLoaded, setClientLoaded] = useState(false);
useEffect(() => {
  let interval;
  const checkUser = async () => {
    try {
      
      if (!clientLoaded) {
        const detailRes = await fetch(
          "https://finalyearproject-alpha.vercel.app/Growspire/v1/users/client_info_detail",
          { headers: { Authorization: `Bearer ${activeToken}` } }
        );
        const detailData = detailRes.ok ? await detailRes.json() : {};

        setCompanyLogo(detailData.client_logo);
        setName(detailData.client_name);
        setCompanyName(detailData.client_company_name);
        setDescription(detailData.client_description);
        setSlogan(detailData.client_slogan);
        setPhone(detailData.client_phoneno);
        setCountry(detailData.client_country);
        setState(detailData.client_state);
        setDistrict(detailData.client_district);

        setClientLoaded(true);
      }

      
      setIsLoaded(true);
    } catch (error) {
      console.error("Failed:", error);
      setIsLoaded(false);
    }
  };

  checkUser(); 
}, []);

const clientData = { companylogo: client_logo, name: clientcompanyname };

    if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
      </div>
    );
  }
  return (
    <ClientContext.Provider value={clientData}>
    <div className="min-h-screen flex flex-col">
      <Navbar CompanyLogo={client_logo}/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer clientcompanyname={clientcompanyname} client_slogan={client_slogan} />
    </div>
    </ClientContext.Provider>
  );
}