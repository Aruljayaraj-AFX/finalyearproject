import { useEffect, useRef , useState } from "react";
import edit from "../assets/edit.png";
import waste from "../assets/waste.png";

export default function Userinfo() {

  const [clear,setClear] = useState(false);

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

      {/* ========== MAIN ADDUSER FORM ========== */}
     
          <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[400px] shadow-lg overflow-hidden">
            <h1 className="text-2xl mb-4 font-semibold">New User</h1>
            <div className="flex justify-end gap-5 w-full mb-4">
              <button className="hover:bg-gray-200 rounded-md"><img src={edit} alt="edit" className="w-6 h-6"/></button>
              <button 
              onClick={() => setClear(true)}
              className="hover:bg-gray-200 rounded-md"><img src={waste} alt="waste" className="w-5 h-5"/></button>
            </div>
            <div className="flex flex-col w-full shadow-sm rounded-lg bg-gray-100/70">
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">User Name</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 select-none">Email</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-11  focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">Mobile</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-8 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">Address</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-6 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">Country</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-6 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">State</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-10.5 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">District</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-8.5 focus:outline-none"
                  />
                </div>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="mt-4 w-full text-black shadow-sm py-2 rounded-lg bg-gray-100/70 transition">
              Back
            </button>
            {clear===true && (
              <div className=" absolute top-1/2 bg-white p-4  w-[300px] items-center justify-center rounded-lg shadow-lg">
                <h1 className="text-sm text-center font-semibold pb-4">Are you want to delete!</h1>
                <div className="flex justify-center gap-5 ">
                <button onClick={() => window.history.back()} className="hover:bg-gray-200 rounded-sm p-1 px-2 border border-gray-200">YES</button>
                <button onClick={()=>setClear(false)} className="hover:bg-gray-200 rounded-sm p-1 px-2 border border-gray-200">NO</button>
                </div>
              </div>)}
          </div>
    </div>
  );
}