import ap from "../assets/ap.jpg";
import searchuser from "../assets/searchuser.png";
import { useState } from "react";


export default function Appshandle() {

  const [users] = useState([
    { name: "AK", role: "User", status: "Active", email: "akash0018ak@gmail.com" },
    { name: "Abra", role: "Admin", status: "Active", email: "abra@gmail.com" },
    { name: "Arul", role: "User", status: "Active", email: "afx001@gmail.com" },
    { name: "Anbu", role: "Admin", status: "Pending", email: "anbulucks143@gmail.com" },
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

  return (
    <div className="min-h-screen flex relative flex-col ">
      
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
        <h1 className="text-2xl font-black">Apps!</h1>
      </div>

      {/* Search box */}
      <div className="z-20 px-5 -mt-10  flex justify-end items-center ">
        <div className="flex items-center px-3 shadow-sm rounded-lg  bg-white">
        <img src={searchuser} alt="User" className="w-5 h-5"/>
        <input
          type="text"
          placeholder="Search by app name..."
          className="w-80 px-4 py-2  focus:outline-none focus:ring-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        </div>

      {/* Table-like layout */}
      <div className="flex m-8 flex-col flex-grow z-20 px-5 ">
      <div className="flex justify-center bg-gray-100 w-[400px] h-[400px] rounded-xl  relative">
        <div
         className="flex items-center justify-center w-[400px] h-[200px] mt-3  rounded-full overflow-hidden relative"
         style={{
         backgroundImage:
          "linear-gradient(to right, rgba(87,87,87,0.25) 1px, transparent 1px)",
         backgroundSize: "12px 100%",
         maskImage:
          "radial-gradient(ellipse 120% 100% at 50% 50%, black 6%, transparent 50%)",
         WebkitMaskImage:
          "radial-gradient(ellipse 120% 120% at 50% 50%, black 20%, transparent 40%)",
         maskComposite: "intersect",
         WebkitMaskComposite: "destination-in",
         backgroundColor: "rgba(87,87,87,0.05)", // add subtle base tone
      }}>
      <div className="flex items-center justify-center bg-white  z-100 w-[150px] h-[50px] rounded-xl shadow-sm">
  <div className="flex -ml-5 my-2 mx-2 w-[45px] h-[45px] border-1 border-[#5E3CBD] bg-[#8B5CF4] rounded-xl shadow-lg"></div>
  <div className="flex items-center">
    <h1 className="text-xs flex pl-3 ">App Name</h1>
  </div>
</div>
    </div>
  </div>
</div>


    </div>
  );
}
