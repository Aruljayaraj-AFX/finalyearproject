import ap from "../assets/ap.jpg";
import user from "../assets/user.png";
import searchuser from "../assets/searchuser.png";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import eye from "../assets/eye.png";
import apps from "../assets/apps.png";

export default function Clients() {

  const [users] = useState([
    { name: "AK", role: "User",  email: "akash0018ak@gmail.com" },
    { name: "Abra", role: "Admin",  email: "abra@gmail.com" },
    { name: "Arul", role: "User",  email: "afx001@gmail.com" },
    { name: "Anbu", role: "Admin", email: "anbulucks143@gmail.com" },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
useEffect(()=>{
  try {
      const response = await fetch(
        "https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/user_info?pagination",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
}})
  return (
    <div 
    id="clients"
    className="min-h-screen flex relative flex-col ">
      
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
      {/* Header */}
      <div className="flex gap-2 mt-26 ml-10 items-center z-20 bg-white/30 w-[250px]">
        <img src={ap} className="w-10 h-10 rounded-full" alt="Profile" />
        <h1 className="text-2xl font-black">Good Morning, AK!</h1>
      </div>

      {/* Search box */}
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

      {/* Table-like layout */}
      <div className="flex flex-col flex-grow z-20 px-5">
        {/* Header row */}
        <div className="grid grid-cols-5 py-5 px-5 rounded-lg mt-10 bg-white shadow-sm my-3 font-semibold">
          <button onClick={handleSort} className="flex items-center gap-2 text-xl pl-5">
            USER {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <h1 className="text-xl">G-MAIL</h1>
          <h1 className="text-xl pl-50">ROLE</h1>
          <h1 className="text-xl pl-50">APPS</h1>
          <h1 className="text-xl pl-40">ACTIONS</h1>
          
        </div>

        {/* User rows */}
        {filteredUsers.map((user, index) => (
          <div
            className="grid grid-cols-5 items-center py-5 px-5 rounded-lg bg-white shadow-sm hover:bg-gray-200 "
            key={index}
          ><>
            
            <h1 className="text-xl font-medium pl-5 text-gray-800">{user.name}</h1>
            <h1 className="text-xl font-medium text-gray-800">{user.email}</h1>
            <h1 className="text-xl font-medium text-gray-800 pl-50">{user.role}</h1>
            <Link to="/Appshandle" className="pl-52 cursor-pointer"><img src={apps} alt="apps"className="w-5 h-5"/></Link>
            <Link to="Userinfo" className="pl-48 cursor-pointer"><img src={eye} alt="open" className="w-5 h-5"/></Link>
          </>
          </div>
        ))}
      </div>
    </div>
  );
}
