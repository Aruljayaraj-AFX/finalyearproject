import { useEffect, useRef, useState } from "react";
import apps from "../assets/apps.png";
import area from "../assets/area.png";

export default function Editpage() {
  
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
          <div className="relative z-20 flex flex-col  rounded-lg bg-white/60 p-6 w-[400px] shadow-lg overflow-hidden">
            <h1 className="flex justify-start text-2xl mb-4 font-semibold ">App Name</h1>
            <div className="flex flex-col w-full shadow-sm rounded-lg bg-gray-100/70">
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4"><img src={apps} className="w-5"/></label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 ml-14.5 focus:outline-none"
                  />
                </div>
            </div>
            <h1 className="flex justify-start text-2xl mb-4 mt-4 font-semibold ">Area</h1>
            <div className="flex flex-col w-full shadow-sm rounded-lg bg-gray-100/70">
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4"><img src={area} className="w-5"/></label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 ml-14.5 focus:outline-none"
                  />
                </div>
            </div>
            <div className="flex justify-center mt-6 gap-5 ">
                <button onClick={()=>window.history.back()} className="hover:bg-red-200 bg-gray-100/70 rounded-sm p-1 px-2 border border-gray-200">Cancel</button>
                <button onClick={()=>window.history.back()} className="hover:bg-green-200 bg-gray-100/70 rounded-sm p-1 px-2 border border-gray-200">Done</button>
            </div>
          </div>
    </div>
  );
}