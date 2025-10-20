import arrow from "../assets/arrow.png";
import heroimage from "../assets/heroimage.svg";
import textslide from "../assets/textslide.png";
import "../index.css";
import key from "../assets/key.png";
import { useContext } from "react";
import { ClientContext } from "../layouts/MainLayout";
import {Link} from "react-router-dom";


export default function Hero(){
  const clientData = useContext(ClientContext);
    return(
    <div 
    id="home"
    className="min-h-screen flex flex-col">
      {/* profile */}
      
      <Link to="/Profile"
      className="absolute top-0 right-0 mt-3 mr-10 z-50">
        <img 
         src={textslide} alt="profile" className=" border-5 border-purple-800 bg-white rounded-full w-[60px] px-1 py-1 transition-opacity duration-300 select-none"/>  
      </Link>
      <div className="flex items-center gap-2 mt-6 ml-19  z-20">
        <img src={clientData.companylogo} style={{ height: "60px",width : "60px", objectFit: "cover" }}className="w-7 h-7 pt-1 rounded-full select-none"/><h1 className="text-2xl">{clientData.name}</h1>
      </div>
      
      {/* hero */}
      <div className="flex flex-col justify-center items-center pt-25 pb-24  ">
        <h1 className="relative inline-block px-6 bg-white  py-2 rounded-full text-gray-800">
            <span className="relative bg-white  z-10">Trusted by 1,000,000+ professionals</span>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ overflow: 'visible' }}>
        <defs>
        <linearGradient id="shooting-star-gradient">
        <stop offset="0%" stopColor="rgba(168,85,247,0)" />
        <stop offset="30%" stopColor="rgba(219,39,119,0.4)" />
        <stop offset="50%" stopColor="rgba(219,39,119,1)" />
        <stop offset="70%" stopColor="rgba(168,85,247,0.4)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
        </linearGradient>
        </defs>
        <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="9999"
        fill="none"
        stroke="url(#shooting-star-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.15 0.85"
        className="animate-border-trace" />
           </svg>
           <span className="absolute inset-0 rounded-full border border-gray-200"></span>
        </h1>

          <h1 className="font-black text-6xl pb-22 scale-x-150 scale-y-150 pt-5">
          Digital <span className="relative inline-block ">
            <div className="relative z-10 w-[100px] h-[100px] pt-9"><img src={key}  alt = "image"/></div>
          </span> For
        </h1>
        <h1 className="font-black text-6xl pb-15 scale-x-150 scale-y-150">
          <span className="relative inline-block">
            <span className="relative z-10">Real-World</span>
            <span className="absolute inset-0 bg-[#A78BFA] opacity-70 blur-sm -z-10"></span>
          </span> Doors
        </h1>
        <h1 className="text-xl font-light">A hiring platform that works the way you do.</h1>
        <div className="absolute left-20 top-[440px]">
          <img src={heroimage} alt="hero image" className="w-[220px] h-[220px]"/>
        </div>
      </div>
      <div className="flex justify-between pb-12 ">
        <div className="pl-[80px] ">
          <Link to="/Clients" className="flex  items-center gap-2 text-2xl bg-black text-white font-black border rounded-full px-14 py-4">
            CLIENTS<img src={arrow} className="w-6 "/></Link>
        </div>
        <div className="flex items-center justify-center mr-23">
          <p className=" w-[750px] text-2xl font-md border-t py-6">✺ Brave People is a strategic design partner to bold digital brands. We join your team, co-build your thing, and help bring it to the world.</p>
        </div>
      </div>      
    </div>
    );
}