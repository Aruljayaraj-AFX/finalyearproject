import { useEffect, useRef, useState } from "react";
import mailcontact from "../assets/mailcontact.png";
import {Link} from "react-router-dom";
import add from "../assets/add.png";

export default function Adduser() {
  const [area, setArea] = useState(false);
  const [inputfield, setInputfield] = useState(false);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const raindrops = [];
    const numDrops = 2;

    class Raindrop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.height = 30 + Math.random() * 15;
        this.speed = 4 + Math.random() * 2;
        this.width = 0.1;
      }
      update() {
        this.y -= this.speed;
        if (this.y + this.height < 0) this.reset();
      }
      draw() {
        ctx.fillStyle = "rgba(204, 54, 54, 1)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 1;
        ctx.shadowColor = "rgba(204, 54, 54, 0.9)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < numDrops; i++) raindrops.push(new Raindrop());

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raindrops.forEach((drop) => {
        drop.update();
        drop.draw();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      setCanvasSize();
      raindrops.forEach((drop) => drop.reset());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen flex relative flex-col items-center justify-center">
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 1, zIndex: 20 }}
      />
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1 right-1/9 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[400px] shadow-lg overflow-hidden">
            <div flex className="relative flex items-center w-full ">
            <h1 className="text-2xl mb-4 font-semibold mx-auto">App Name</h1>
            {area&& inputfield&&(
              <img src={add} alt="add" className="w-6 h-6 mb-4 hover:-rotate-90 transform transition duration-300 rounded-xl "
              onClick={()=>{setInputfield(true);setArea(false)}}/>
            )}
            </div>
            <p className="flex items-center gap-3 mx-auto pr-2  text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] pl-2  mb-3  text-md">
                <span><img src={mailcontact} className="w-6" alt="email"/></span>
                <span>growspirit@gmail.com</span>
            </p>
        {!area&& !inputfield&& (
        <div
         className="flex items-center justify-center w-[400px] h-[200px]  rounded-full overflow-hidden relative"
         style={{
         backgroundImage:
          "linear-gradient(to right, rgba(87,87,87,0.25) 1px, transparent 1px)",
         backgroundSize: "12px 100%",
         maskImage:
          "radial-gradient(ellipse 100% 100% at 50% 50%, black 6%, transparent 50%)",
         WebkitMaskImage:
          "radial-gradient(ellipse 120% 100% at 50% 50%, black 20%, transparent 40%)",
         maskComposite: "intersect",
         WebkitMaskComposite: "destination-in",
         backgroundColor: "rgba(87,87,87,0.05)", 
      }}>
        <button onClick={()=>setInputfield(true)}>
      <div className="flex items-center justify-center bg-white  z-100 w-[150px] h-[50px] rounded-xl shadow-sm">
        <div className="flex -ml-5 my-2 mx-2 w-[45px] h-[45px] border-1 border-[#5E3CBD] bg-[#8B5CF4] rounded-xl shadow-lg"></div>
        <div className="flex items-center">
          <h1 className="text-xs flex pl-4 select-none ">Add Area</h1>
        </div>
      </div></button>
      </div>)}
      {area&& inputfield&&(<><Link to="Button">
        <div className="flex items-center  bg-white my-3 z-100 w-[300px] h-[50px] rounded-xl shadow-sm">
        <div className="flex  my-2 mx-1 w-[45px] h-[45px] border-1 border-[#5E3CBD] bg-[#8B5CF4] rounded-xl shadow-lg"></div>
        <div className="flex items-center">
          <h1 className="text-xs flex pl-4 select-none ">Add Area</h1>
        </div>
      </div></Link></>)}
      {inputfield&& !area&& (
        <div className="flex bg-white p-4 gap-3 mt-4 flex-col  rounded-xl shadow-sm">
          <div  className="w-full flex hover:shadow-sm rounded-lg transition bg-gray-100 ">
            <label className="flex items-center px-2 py-2">Area Name</label>
              <input
                type="text"
                placeholder=" " 
                className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"/>
          </div>
          <div className="flex justify-center mt-2 gap-5 ">
          <button onClick={()=>setInputfield(false)} className="hover:bg-red-200 rounded-sm p-1 px-2 border border-gray-200">Cancel</button>
          <button onClick={() =>setArea(true)} className="hover:bg-green-200 rounded-sm p-1 px-2 border border-gray-200">Submit</button>
          </div>
        </div>
      )}
      {((area && inputfield) || (!area && !inputfield))&&(
        <div className="w-full flex justify-center gap-3">
            <Link to="Editpage" 
            className="relative group flex justify-center items-center mx-auto mt-4 w-[50%] text-black shadow-sm py-1 rounded-full bg-gray-100/70 transition">
            Edit
            <div className="absolute left-0 mx-1 flex justify-center items-center bg-gray-800 w-[25px] h-[25px] rounded-full">
            <svg width="500px" height="500px" viewBox="-9 -3 52 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icomoon-ignore"></g>
            <path d="M28.262 5.87c0-1.472-1.194-2.665-2.666-2.665s-2.666 1.193-2.666 2.665c0 1.289 0.916 2.365 2.133 2.612v18.18h1.066v-18.18c1.217-0.247 2.133-1.323 2.133-2.612zM25.596 7.47c-0.882 0-1.599-0.717-1.599-1.599s0.717-1.599 1.599-1.599c0.882 0 1.599 0.717 1.599 1.599s-0.717 1.599-1.599 1.599z" fill="#ffffffff"></path>
            <path d="M6.937 23.517v-18.18h-1.066v18.18c-1.217 0.247-2.132 1.322-2.132 2.612 0 1.472 1.194 2.666 2.666 2.666s2.666-1.194 2.666-2.666c0-1.29-0.916-2.365-2.133-2.612zM6.404 27.729c-0.882 0-1.599-0.717-1.599-1.599s0.717-1.599 1.599-1.599 1.599 0.717 1.599 1.599-0.717 1.599-1.599 1.599z" fill="#ffffffff"></path>
            <path d="M16.533 13.388v-8.050h-1.066v8.050c-1.217 0.247-2.133 1.323-2.133 2.612s0.916 2.365 2.133 2.612v8.050h1.066v-8.050c1.217-0.247 2.133-1.323 2.133-2.612s-0.916-2.365-2.133-2.612zM16 17.599c-0.882 0-1.599-0.717-1.599-1.599s0.717-1.599 1.599-1.599 1.599 0.717 1.599 1.599-0.717 1.599-1.599 1.599z" fill="#ffffffff"></path>
            </svg>
            </div>
            </Link>
            <button 
            onClick={() => window.history.back()} 
            className="relative group flex justify-center items-center mx-auto mt-4 w-[50%] text-black shadow-sm py-1 rounded-full bg-gray-100/70 transition">
            Submit
            <div className="absolute right-0 mx-1 flex justify-center items-center bg-gray-800 w-[25px] h-[25px] rounded-full">
            <svg
            width="10"
            height="16"
            viewBox="0 2 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-[1500ms] group-hover:animate-[arrowMove_1s_linear_infinite]">
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="white" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="white" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="white" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="white" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="white" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="white" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="white" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="white" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="white" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="white" />
            </svg>
            </div>
            </button>
      </div>)}
      </div>
    </div>
  );
}