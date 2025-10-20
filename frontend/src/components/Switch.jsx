import torch from "../assets/torch.png";
import fan from "../assets/fan.png";
import switch1 from "../assets/switch.png";
import { useState,useEffect, useRef  } from "react";
import { motion } from "framer-motion";
import "../index.css";

export default function Switch() {
    const [torchOn, settorchOn] = useState(false);
      const [torchOff, settorchOff] = useState(true);
      const [fanOn, setfanOn] = useState(false);
      const [acon ,Setac]=useState(false);
      
    
      
    
      const handleClick = () => {
        Setac(!acon);
      };
      const AnimatedText = ({ text, isOn }) => {
      return (
        <span className="inline-flex">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="transition-colors duration-500"
              style={{ 
                transitionDelay: `${i * 100}ms`, 
                color: isOn ? 'gray' : 'black'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    };
    return(
        <div 
        id="switch"
        className="min-h-screen flex flex-col">
            <div className="relative z-10 flex flex-col pt-10 pb-20 items-center justify-center">
      <div className="flex items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={switch1} className="pt-[2px] w-[18px]  h-auto" alt="mail icon"/></span>
              Swtich
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
      </div>
<div className="px-30 flex items-start gap-12  pb-20">
  <div className="sticky top-18 space-y-4 flex-shrink-0">
    <h1 className="text-6xl font-black text-gray-900 tracking-tight w-[600px]">
      Handle complex workflows without the chaos.
    </h1>
    <p className="text-xl text-gray-600 tracking-tight w-[450px]">
      Adapts to shifting priorities and real workflows — keeping projects aligned, teams accountable, and decisions clear.
    </p>
  </div>

  <div className="space-y-4 flex-1">
    <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow  overflow-hidden">
      <div 
        className="absolute inset-0 " 
        style={{
          backgroundImage: `radial-gradient(circle, #00000043 1px, transparent 1px)`,
          backgroundSize: '7px 7px',
          opacity: 0.15
        }}
      >
      </div>
      <div className="flex flex-1 py-4  mx-8 shadow-md rounded-full bg-gray-100/80 overflow-hidden relative z-10">
        <div className="flex items-center justify-start z-10 -ml-4  overflow-hidden">
          <img src={torch} alt="torch "/>
        </div>
        {torchOn &&(
        <div
        className="absolute -left-1 top-1/2 -translate-y-1/2 
               w-[500px] h-[350px] 
               bg-gradient-to-r from-purple-300/80 to-transparent 
               blur-2xl overflow-hidden "
        style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}>
        </div>)}
        {torchOff &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{settorchOn(true);settorchOff(false)}}><AnimatedText text="OFF" color="black" /></button>)}
        {torchOn &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{settorchOff(true);settorchOn(false)}}><AnimatedText text="ON" color="gray" /></button>)}
      </div>
    </div>

    {/* Card 2 */}
    <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow  overflow-hidden">
      <div 
        className="absolute inset-0 " 
        style={{
          backgroundImage: `radial-gradient(circle, #00000043 1px, transparent 1px)`,
          backgroundSize: '7px 7px',
          opacity: 0.15
        }}
      >
      </div>
      <div className="flex flex-1 py-4  mx-8 shadow-md rounded-2xl bg-gray-100/80 overflow-hidden relative z-10">
        <div className="flex items-center justify-start ml-2 z-10 overflow-hidden">
          {fanOn &&(<motion.img src={fan} alt="fan"animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}/>)}
          {!fanOn &&(<img src={fan} alt="fan"/>)}
        </div>
    {fanOn && (
      <>
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            className="absolute"
            width="300"
            height="40"
            initial={{ x: 60, y: 2 + (i * 10), opacity: 0 }}
            animate={{ 
              x: [60, 350], 
              opacity: [0, 0.8, 0],
            }}
            transition={{ 
              duration: 5,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <motion.path
              d="M 0 20 Q 15 10, 30 20 T 60 20 T 90 20 T 120 20 T 150 20"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 0 20 Q 15 10, 30 20 T 60 20 T 90 20 T 120 20 T 150 20",
                  "M 0 20 Q 15 30, 30 20 T 60 20 T 90 20 T 120 20 T 150 20",
                  "M 0 20 Q 15 10, 30 20 T 60 20 T 90 20 T 120 20 T 150 20"
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
              </linearGradient>
            </defs>
          </motion.svg>
        ))}
      </>
    )}
        
        {!fanOn &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{setfanOn(true)}}>OFF</button>)}
        {fanOn &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{setfanOn(false)}}>ON</button>)}
      </div>
    </div>

    {/* Card 3 */}
    <div className="relative flex justify-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow  overflow-hidden">
      <div 
        className="absolute inset-0 " 
        style={{
          backgroundImage: `radial-gradient(circle, #00000043 1px, transparent 1px)`,
          backgroundSize: '7px 7px',
          opacity: 0.15
        }}
      >
      </div>
      <div className="flex flex-col items-center  mx-8 shadow-md rounded-lg bg-gray-100/80 h-[330px] w-[300px] overflow-hidden relative z-10">
        <div className="flex z-10 overflow-hidden border-b border-gray-200 h-[70px]">
         <div className="relative flex items-center w-[240px] h-[70px]">
          <h1 className="text-2xl mx-6 font-bold">OFF</h1>
          <div className="absolute right-15 mt-5 flex items-center shadow-xl w-[10px] h-[5px] rounded-lg bg-red-400 "></div>
          <div className="absolute right-4 mt-2 flex items-center shadow-xl w-[30px] h-[30px] border-b-2 border-gray-600 rounded-full bg-gray-400 "></div>
         </div>
         <div className="flex w-[60px] h-[70px] border border-gray-200 bg-gray-300 rounded-tr-lg"></div>
        </div>
        <div className="flex items-center justify-center mt-2 bg-gray-300 w-[200px] h-[200px] rounded-full">
          <div className="flex items-center justify-center bg-gray-500 w-[170px] h-[170px] rounded-full">
            <div className="flex items-center justify-center bg-gray-700 w-[140px] h-[140px] rounded-full"></div>
          </div>
        </div>
        <div className="flex border-t border-gray-200 mt-2 h-[50px] w-[300px]"></div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow  overflow-hidden">
      <div 
        className="absolute inset-0 " 
        style={{
          backgroundImage: `radial-gradient(circle, #00000043 1px, transparent 1px)`,
          // Responsive background sizes: smaller on mobile, larger on desktop
          backgroundSize: '7px 7px',
          opacity: 0.15
        }}
      >
      </div>
      <div className="flex flex-1 py-4  mx-8 shadow-md rounded-full bg-gray-100/80 overflow-hidden relative z-10">
        <div className="flex items-center justify-start z-10 -ml-4  overflow-hidden">
          <img src={torch} alt="torch "/>
        </div>
        {torchOn &&(
        <div
        className="absolute -left-1 top-1/2 -translate-y-1/2 
               w-[500px] h-[350px] 
               bg-gradient-to-r from-purple-300/80 to-transparent 
               blur-2xl overflow-hidden "
        style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}>
        </div>)}
        {torchOff &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{settorchOn(true);settorchOff(false)}}><AnimatedText text="OFF" color="black" /></button>)}
        {torchOn &&(
        <button className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl "
        onClick={()=>{settorchOff(true);settorchOn(false)}}><AnimatedText text="ON" color="gray" /></button>)}
      </div>
    </div>

    {/* Card 5 */}
    <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow  overflow-hidden">
      <div 
        className="absolute inset-0 " 
        style={{
          backgroundImage: `radial-gradient(circle, #00000043 1px, transparent 1px)`,
          // Responsive background sizes: smaller on mobile, larger on desktop
          backgroundSize: '7px 7px',
          opacity: 0.15
        }}
      >
      </div>
      <div  className="flex flex-row mx-8 rounded-lg rounded-b-4xl bg-gray-100/80 overflow-hidden relative z-10" >
        <div onClick={handleClick} className="w-[90%]">
          <div className="w-full h-[60px] flex items-center justify-between px-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <p className="text-gray-200 text-4xl font-metal pl-1 pt-5 ">off</p>
            <div className="w-4 h-2 mt-12 border border-gray-300 rounded-full bg-red-300"></div>
          </div>
        <div className={`absolute insert-0 h-[20%] w-[80%] ml-7 mt-2 border-2 border-gray-200 rounded-b-full ${acon?"animate-overlay-fir":""}`}></div>
        <div className={`absolute insert-0 h-[20%] w-[80%] ml-7 mt-2 bg-gray-300 rounded-b-full items-center justify-center ${acon?"animate-overlay-second":""}`}></div>
      </div>
    <div className="w-[10%] h-[90px] rounded-b-4xl border border-gray-300 bg-gray-200 flex items-center justify-center"></div>
  </div>
    </div>
  </div>
</div>
        </div>
    );
}