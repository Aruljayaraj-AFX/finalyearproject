import mail from "../assets/mail.svg"
import mailcontact from "../assets/mailcontact.png"
import arrow from "../assets/arrow.png"
import textslide from "../assets/textslide.png"
import heroimage from "../assets/heroimage.svg"
import profile from "../assets/profile.png"
import "../index.css";

export default function Hero(){
    return(
    <div className="min-h-screen flex flex-col">
      {/* profile */}
      <div className="absolute top-0 right-0 mt-4 mr-10 z-20">
        <img src={profile} alt="profile" className="border border-[#7C5AC5] rounded-full w-[60px] px-1 py-1 transition-opacity duration-300"/>  
      </div>
      
      {/* hero */}
      <div className="flex flex-col justify-center items-center pt-54 pb-32 tracking-wide">
        <h1 className="font-black text-7xl pb-2">
          Digital <span className="relative inline-block px-6">
            <span className="relative z-10">Key</span>
            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path d="M 20,50 Q 20,15 60,10 T 140,10 Q 180,15 180,50 Q 180,85 140,90 T 60,90 Q 20,85 20,50 Z" 
                    fill="none" 
                    stroke="#A78BFA" 
                    strokeWidth="8"
                    strokeLinecap="round"/>
            </svg>
          </span> For
        </h1>
        <h1 className="font-black text-7xl pb-5">
          <span className="relative inline-block">
            <span className="relative z-10">Real World</span>
            <span className="absolute inset-0 bg-[#A78BFA] opacity-70 blur-sm -z-10"></span>
          </span> Doors
        </h1>
        <div className="absolute left-50 top-[250px]">
          <img scr={heroimage} alt="hero image" className="w-[240px] h-[100px]"/>
        </div>
      </div>
      <div className="flex justify-between pb-12">
        <div className="pl-[150px] ">
          <button className="flex  items-center gap-2 text-2xl bg-black text-white font-black border rounded-full px-14 py-4">
            CLIENTS<img src={arrow} className="w-6 "/></button>
        </div>
        <div className="flex items-center justify-center mr-23">
          <p className=" w-[750px] text-2xl font-semibold border-t py-6">✺ Brave People is a strategic design partner to bold digital brands. We join your team, co-build your thing, and help bring it to the world.</p>
        </div>
      </div>
      
      {/* text slide */}
      <div className="flex justify-between items-center bg-black/90 overflow-hidden whitespace-nowrap h-[100px] w-full">
        <div className="animate-textslide inline-flex">
          <p className="text-white text-5xl font-black inline-flex items-center tracking-widest">
            <img src={textslide} className="inline-block h-10 mx-2"/>AKASH
            <img src={textslide} className="inline-block h-10 mx-2"/>ARULJAYARAJ 
            <img src={textslide} className="inline-block h-10 mx-2"/>ABRAHAM
            <img src={textslide} className="inline-block h-10 mx-2"/>ANBU
            <img src={textslide} className="inline-block h-10 mx-2"/>ARAVINDH
            <img src={textslide} className="inline-block h-10 mx-2"/>ANANTHA KUMAR
          </p>
          <p className="text-white text-5xl font-black inline-flex items-center ml-60 tracking-widest">
            <img src={textslide} className="inline-block h-10 mx-2"/>AKASH
            <img src={textslide} className="inline-block h-10 mx-2"/>ARULJAYARAJ 
            <img src={textslide} className="inline-block h-10 mx-2"/>ABRAHAM
            <img src={textslide} className="inline-block h-10 mx-2"/>ANBU
            <img src={textslide} className="inline-block h-10 mx-2"/>ARAVINDH
            <img src={textslide} className="inline-block h-10 mx-2"/>ANANTHA KUMAR
          </p>  
        </div>
      </div>

      {/* contact section */}
      <div className="flex-grow relative w-full flex flex-col items-center justify-center border-t-2 border-gray-800 p-8">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center top, #1a1a2e 0%, #16213e 30%, #4a47a3 60%, #7b68ee 100%)',
          }}/>
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 40%, rgba(123,104,238,0.3) 100%)',
          }}/>
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(106,90,205,0.4) 0%, transparent 70%)',
          }}/>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(181, 56, 235, 0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(181, 56, 235, 0.14) 1px, transparent 1px)`,  
            backgroundSize: "40px 40px",
          }}/>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={mail} className="pt-[2px]" alt="mail icon"/></span>
              CONTACT
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
          
          <div className="mt-6 mb-6">
            <h1 className="text-6xl font-[900] text-white text-center mt-2">
              Let's talk,<br/>we're here.
            </h1>
            <p className="flex items-center gap-3 mx-8  text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] pl-2  mt-6 text-md">
              <span><img src={mailcontact} className="w-6" alt="email"/></span>
              <span>growspirit@gmail.com</span>
              <button className="border px-2 py-1 h-8 rounded-full bg-white overflow-hidden transition-colors duration-300 group">
                <img src={arrow} className="w-4 group-hover:translate-x-8 transition-transform duration-300" alt="arrow"/>             
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
}