import mail from "../assets/mail.svg";
import mailcontact from "../assets/mailcontact.png";
import switch1 from "../assets/switch.png";
import arrow from "../assets/arrow.png";
import textslide from "../assets/textslide.png";
import heroimage from "../assets/heroimage.svg";
import torch from "../assets/torch.png";
import fan from "../assets/fan.png";
import { useState,useEffect, useRef  } from "react";
import "../index.css";
import { motion } from "framer-motion";
import key from "../assets/key.png";
import features from "../assets/features.png";
import feature_user_add from "../assets/feature_new_user.gif";
import feature2 from "../assets/features2.gif";
import feature3 from "../assets/feature3.gif";
import tutorial from "../assets/tutorial.png";
import goal from "../assets/goal.png";
import profile from "../assets/profile1.png"
import { useContext } from "react";
import { ClientContext } from "../layouts/MainLayout";


export default function Hero(){
  const [torchOn, settorchOn] = useState(false);
  const [torchOff, settorchOff] = useState(true);
  const [fanOn, setfanOn] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const lastDivRef = useRef(null);
  const [acon ,Setac]=useState(false);
  const divRef = useRef(null);
  const [scale, setScale] = useState(1);

  const clientData = useContext(ClientContext);

  const handleClick = () => {
    Setac(!acon);
  };


  const syncReverseScroll = () => {
    if (leftRef.current && rightRef.current) {
      const leftScrollTop = leftRef.current.scrollTop;
      const maxScroll = leftRef.current.scrollHeight - leftRef.current.clientHeight;
      // Reverse scroll calculation
      rightRef.current.scrollTop = maxScroll - leftScrollTop;
    }
  };
const syncReverseScroll1 = () => {
    if (leftRef.current && rightRef.current) {
      const leftScrollTop = rightRef.current.scrollTop;
      const maxScroll = rightRef.current.scrollHeight - rightRef.current.clientHeight;
      // Reverse scroll calculation
      leftRef.current.scrollTop = maxScroll - leftScrollTop;
    }
  };

  useEffect(() => {
    // Scroll left div to bottom initially
    if (leftRef.current && rightRef.current) {
      const maxScroll = leftRef.current.scrollHeight - leftRef.current.clientHeight;
      leftRef.current.scrollTop = maxScroll;
      rightRef.current.scrollTop = 0; // Opposite side starts at top
    }
  }, []);


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
    <div className="min-h-screen flex flex-col">
      {/* profile */}
      <div className="absolute top-0 right-0 mt-3 mr-10 z-20">
        <img src={textslide} alt="profile" className="border-5 border-purple-800 bg-white rounded-full w-[60px] px-1 py-1 transition-opacity duration-300"/>  
      </div>
      <div className="flex items-center gap-2 mt-6 ml-19  z-20">
        <img src={clientData.companylogo} style={{ height: "60px",width : "60px", objectFit: "cover" }}className="w-7 h-7 pt-1 rounded-full"/><h1 className="text-2xl">{clientData.name}</h1>
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
          <button className="flex  items-center gap-2 text-2xl bg-black text-white font-black border rounded-full px-14 py-4">
            CLIENTS<img src={arrow} className="w-6 "/></button>
        </div>
        <div className="flex items-center justify-center mr-23">
          <p className=" w-[750px] text-2xl font-md border-t py-6">✺ Brave People is a strategic design partner to bold digital brands. We join your team, co-build your thing, and help bring it to the world.</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col pb-20 items-center justify-center">
      <div className="relative z-10 flex flex-col pb-15 items-center justify-center">
      <div className="flex items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={features}  className="pt-[2px]  w-[18px]  h-auto " alt="mail icon"/></span>
              Features
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
      </div>
      <h className="text-6xl font-black pb-7 text-gray-900 tracking-tight ">Elevate Your Projects with SAP</h>
      <p className="text-xl text-gray-600 tracking-tight pb-10" >Explore SAP's powerful features, Boost productivity, streamline workflows, and achieve project success with ease.</p>
      <div className="relative flex flex-col m-10 gap-10">
        <div className="relative flex flex-row  gap-10  ">
          <div className="relative border border-[#d8d8d8] bg-gray-100  rounded-lg p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature_user_add} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
        </div>
        <div className="relative flex flex-row ml-10 mr-10 gap-10  ">
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col  items-center justify-center">
      <div className="flex  pt-20 items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={tutorial} className="pt-[2px] w-[18px]  h-auto" alt="mail icon"/></span>
              tutorial
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
          <div ref={divRef} className="relative flex flex-col items-center justify-center" >
            <h1 className="text-6xl font-black  pt-15 text-gray-900 tracking-tight ">Quick Start Guide</h1>
            <p className="text-xl text-gray-600 tracking-tight pb-10 pt-6" >Get up and running with SAP in minutes. Follow our step-by-step guide to start managing your projects efficiently.</p>
            <div className=" relative flex flex-row border border-black w-[1200px] h-[600px] ">
              <div ref={leftRef} onScroll={syncReverseScroll} className="w-[600px] h-[600px] border border-black overflow-y-scroll no-scrollbar ">
                <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                <div className=" border border-red-600 w-[600px] h-[600px]"></div>
              </div>
              <div ref={rightRef} onScroll={syncReverseScroll1} className="w-[600px] h-[600px] border border-black overflow-y-scroll no-scrollbar ">
                <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                <div ref={lastDivRef} className=" border border-red-600 w-[600px] h-[600px]"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div>
      <div className="relative z-10 flex flex-col pb-10 items-center justify-center">
      <div className="flex items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={goal} className="pt-[2px] w-[18px]  h-auto" alt="mail icon"/></span>
              value
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
      </div>
      <p className="text-8xl font-black ml-15 mr-20 text-gray-700 pb-10 tracking-tight">"This software solution delivers outstanding value by streamlining smart device management, boosting operational efficiency, and enhancing user convenience. Designed for excellence, it ensures seamless, reliable, and high-performance operation while maintaining full scalability and flexibility for evolving business needs. Security is built in at every layer, with robust authentication, encrypted communications, and strict access controls safeguarding sensitive data and maintaining system integrity. By combining innovation, quality, and top-tier security, this solution empowers businesses to optimize performance, protect critical information, and stay ahead in a competitive landscape."</p>
      <div className="relative flex flex-row border-1 border-[#7C5AC5] bg-black rounded-full ml-10 w-[300px]"><img src={profile} className="rounded-full w-[50px] h-full object-cover" alt="Profile" /><p className="text-4xl ml-5 pt-2 text-white ">fndf</p></div>
    </div>
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