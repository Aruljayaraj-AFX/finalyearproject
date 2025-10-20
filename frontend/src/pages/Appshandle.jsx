import ap from "../assets/ap.jpg";
import searchuser from "../assets/searchuser.png";
import apps1 from "../assets/apps1.png";
import button from "../assets/button.png";
import user1 from "../assets/user1.png";
import newapp from "../assets/newapp.png";
import mailcontact from "../assets/mailcontact.png";
import { useState } from "react";
import {Link} from "react-router-dom";


export default function Appshandle() {

  const [Addapp,setAddapp] = useState(false); 

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
    <div className="min-h-screen flex relative flex-col  ">
      
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
        <button 
        onClick={()=>setAddapp(true)}
        className="flex justify-between px-3 py-2 bg-white w-30 rounded-lg hover:font-black shadow-sm font-light"><img src={newapp} alt="User" className="w-5 h-5"/>New App</button>
      </div>

      {/* Table-like layout */}
      <div className="flex m-16 mt-15 gap-5 z-20 px-5 items-center justify-center">
      {Addapp===false && (
      <div className="flex justify-center bg-gray-100 w-[400px] h-[400px] rounded-xl  relative shadow-lg">
        <div className="flex flex-col ">
        <div
         className="flex items-center justify-center w-[400px] h-[200px] mt-3  rounded-full overflow-hidden relative"
         style={{
         backgroundImage:
          "linear-gradient(to right, rgba(87,87,87,0.25) 1px, transparent 1px)",
         backgroundSize: "12px 100%",
         maskImage:
          "radial-gradient(ellipse 100% 100% at 50% 50%, black 6%, transparent 50%)",
         WebkitMaskImage:
          "radial-gradient(ellipse 120% 120% at 50% 50%, black 20%, transparent 40%)",
         maskComposite: "intersect",
         WebkitMaskComposite: "destination-in",
         backgroundColor: "rgba(87,87,87,0.05)", // add subtle base tone
      }}>
        <Link to="Appsform">
      <div className="flex items-center justify-center bg-white  z-100 w-[150px] h-[50px] rounded-xl shadow-sm">
        <div className="flex -ml-5 my-2 mx-2 w-[45px] h-[45px] border-1 border-[#5E3CBD] bg-[#8B5CF4] rounded-xl shadow-lg"></div>
        <div className="flex items-center">
          <h1 className="text-xs flex pl-3 select-none ">App Name</h1>
        </div>
      </div></Link>
      </div>
    <div className="flex gap-8 justify-center mt-10">
       <div className="flex bg-white shadow-xl border border-gray-200 w-[80px] h-[80px] rounded-2xl relative"><img src={user1} alt="users" className="w-5 h-5 border border-gray-200 rounded-full m-2 "/></div>
       <div className="flex bg-white shadow-xl border border-gray-200 w-[80px] h-[80px] rounded-2xl relative "><img src={apps1} alt="apps" className="w-5 h-5 pb-0.5  border border-gray-200 rounded-full m-2 "/></div>
       <div className="flex bg-white shadow-xl border border-gray-200 w-[80px] h-[80px] rounded-2xl relative"><img src={button} alt="buttons" className="w-5 h-5 border border-gray-200 rounded-full m-2 "/></div>
    </div>
    </div>
  </div>)}
  {Addapp===true && (
    <div className="bg-purple-200  flex flex-col px-1 justify-center items-center pt-1 pb-1 rounded-xl shadow-lg ">
              <div className="flex bg-white p-4  flex-col  rounded-xl shadow-lg">
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition bg-gray-100 "
                >
                  <label className="flex items-center px-4 py-4">App Name</label>
                  <input
                    type="text"
                    placeholder=" " 
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                  />
                </div>
                <p className="flex items-center gap-3 mx-auto pr-2  text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] pl-2  mb-4 mt-4 text-md">
                              <span><img src={mailcontact} className="w-6" alt="email"/></span>
                              <span>growspirit@gmail.com</span></p>
                <div className="flex justify-center  gap-5 ">
                <button onClick={()=>setAddapp(false)} className="hover:bg-red-200 rounded-sm p-1 px-2 border border-gray-200">Cancel</button>
                <button onClick={() =>setAddapp(false)} className="hover:bg-green-200 rounded-sm p-1 px-2 border border-gray-200">Done</button>
                </div>
                </div>
                <h1 className="text-sm font-bold tracking-wide pt-1 text-purple-400">NEW APP</h1>
              </div>)}
</div>
    </div>
  );
}
