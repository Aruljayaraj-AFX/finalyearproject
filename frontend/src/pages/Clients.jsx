import ap from "../assets/ap.jpg";
import user from "../assets/user.png";
import searchuser from "../assets/searchuser.png";
import { useEffect, useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import eye from "../assets/eye.png";
import apps from "../assets/apps.png";
import forward_arrow from "../assets/forward_arrow.png";
import backword_arrow from "../assets/backend_arrow.png";

export default function Clients() {
  const navigate = useNavigate();
  const [totalPages,settotalpages]=useState();
  const[currentPage,setcurrentpage]=useState(1);
  const [loading, setLoading] = useState(true);
  const [users,setusers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = () => {setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));};
  const [search, setSearch] = useState("");
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  const fetchWithTimeout = (url, options, timeout = 8000) =>
    Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      ),
    ]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        navigate("/");
        return;
      }
      const headers = { Authorization: `Bearer ${activeToken}` };

      const [pag_info,table_info] = await Promise.allSettled([
        fetchWithTimeout(
          "https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/pag_info",
          { method: "GET", headers }
        ),fetchWithTimeout(
          `https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/user_info?pagination=${currentPage}`,
          { method: "GET", headers }
        )
      ]);

      if (pag_info.status === "fulfilled") {
        const data = await pag_info.value.json();
        const totalPagesRaw = data["totalpages"];
        const pages = Number.isInteger(totalPagesRaw)? totalPagesRaw: Math.ceil(totalPagesRaw);
        settotalpages(pages);
      } 
      else 
      {
        console.error("Pagination fetch failed:", pag_info.reason);
        navigate("/");
      }
      if (table_info.status === "fulfilled") {
        const userData = await table_info.value.json();
        console.log(userData);
        if(userData.data === "No Data"){
          console.log("no data");
        }
        else{
        setusers(userData.data)
        console.log("User Data:", userData.data);
        }
      } else {
        console.error("User info fetch failed:", table_info.reason);
        navigate("/");
      }
    } catch (err) {
      console.error("fetchClientInfo error:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
    finally {
      setLoading(false);
    }
  };

  fetchData();
}, [currentPage,navigate]);

  return (
    <div id="clients" className="min-h-screen flex relative flex-col ">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,  
          backgroundSize: "40px 40px",
        }}
      />
      <div className="flex gap-2 mt-26 ml-10 items-center z-20 bg-white/30 w-[250px]">
        <img src={ap} className="w-10 h-10 rounded-full" alt="Profile" />
        <h1 className="text-2xl font-black">Good Morning, AK!</h1>
      </div>
      <div className="z-20 px-5 -mt-10  flex justify-end items-center ">
        <div className="flex items-center px-3 shadow-sm rounded-lg mr-10 bg-white">
          <img src={searchuser} alt="User" className="w-5 h-5"/>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-80 px-4 py-2  focus:outline-none focus:ring-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="Adduser" className="flex justify-between px-3 py-2 bg-white w-30 rounded-lg hover:font-black shadow-sm font-light"><img src={user} alt="User" className="w-5 h-5"/>Add User</Link>
      </div>
      <div className="flex flex-col flex-grow z-20 px-5">
        <div className="grid grid-cols-5 py-5 px-5 rounded-lg mt-10 bg-white shadow-sm my-3 font-semibold">
          <button onClick={handleSort} className="flex items-center gap-2 text-xl pl-5">
            USER {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <h1 className="text-xl">G-MAIL</h1>
          <h1 className="text-xl pl-50">ROLE</h1>
          <h1 className="text-xl pl-50">APPS</h1>
          <h1 className="text-xl pl-40">ACTIONS</h1>  
        </div>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center py-5 px-5 rounded-lg bg-white shadow-sm animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 ml-5"></div>
              <div className="h-6 bg-gray-300 rounded w-5/6"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="h-6 bg-gray-300 rounded w-10 ml-40"></div>
              <div className="h-6 bg-gray-300 rounded w-10 ml-40"></div>
            </div>
          ))
        ) : (
          filteredUsers.map((user, index) => (
            <div
              className="grid grid-cols-5 items-center py-5 px-5 rounded-lg bg-white shadow-sm hover:bg-gray-200"
              key={index}
            >
              <h1 className="text-xl font-medium pl-5 text-gray-800">{user.name}</h1>
              <h1 className="text-xl font-medium text-gray-800">{user.email}</h1>
              <h1 className="text-xl font-medium text-gray-800 pl-50">{user.role}</h1>
              <Link to="/Appshandle" className="pl-52 cursor-pointer">
                <img src={apps} alt="apps" className="w-5 h-5" />
              </Link>
              <Link to="Userinfo" className="pl-48 cursor-pointer">
                <img src={eye} alt="open" className="w-5 h-5" />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center z-1 gap-2 m-5">
        <button
          className="p-2 disabled:opacity-50"
          onClick={() => setcurrentpage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <img src={backword_arrow} alt="backward_arrow" className="w-6 h-6" />
        </button>
        <div className="hidden sm:flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 border rounded-lg hover:bg-gray-200 transition ${
                currentPage === i + 1 ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => setcurrentpage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="sm:hidden text-sm font-medium">
          {currentPage} / {totalPages}
        </div>
        <button
          className="p-2 disabled:opacity-50"
          onClick={() => setcurrentpage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <img src={forward_arrow} alt="forward_arrow" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
