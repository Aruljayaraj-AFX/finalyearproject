import mail from "../assets/mail.svg";
import mailcontact from "../assets/mailcontact.png";
import textslide from "../assets/textslide.png";
import "../index.css";

import arrow from "../assets/arrow.png";

export default function Contact() {
    return (
        <div 
        id="contact"
        className=" flex flex-col">
          <div className="flex justify-between items-center bg-black/90 overflow-hidden whitespace-nowrap h-[100px] w-full">
  <div className="animate-textslide inline-flex">
    <p className="text-white text-5xl font-black inline-flex items-center tracking-widest">
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>AKASH
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ARULJAYARAJ 
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ABRAHAM
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ANBU
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ARAVINDH
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ANANTHA KUMAR
    </p>
    <p className="text-white text-5xl font-black inline-flex items-center ml-60 tracking-widest">
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>AKASH
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ARULJAYARAJ 
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ABRAHAM
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ANBU
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ARAVINDH
      <img src={textslide} className="inline-block h-10 mx-2" alt="star"/>ANANTHA KUMAR
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