import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import add from "../assets/add.png";
import torch from "../assets/torch.png";
import fan from "../assets/fan.png";

export default function Adduser() {
  const [Hidden, setHidden] = useState(false);
  const [adduserHidden, setadduserHidden] = useState(false);
  const [SelectButton, setSelectButton] = useState(false);
  const [torchOn, settorchOn] = useState(false);
  const [torchOff, settorchOff] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [fanOn, setfanOn] = useState(false);

  const [users, setUsers] = useState([]);
  const [ID, setID] = useState("");
  const [ButtonName, setButtonName] = useState("");
  const [AreaName, setAreaName] = useState("");

  const areas = ["Kitchen", "Bedroom", "Hall", "Bathroom", "Corridor"];
  const buttons = ["Fan", "Light", "AC", "Motor", "Fridge", "TV"];

  const handleSubmit = () => {
    const exists = users.some(
      (user) => user.ID === ID || user.ButtonName === ButtonName
    );
    if (exists) {
      alert("Button with same ID or name already exists!");
      return;
    }

    const newButton = { AreaName, ButtonName, ID, ButtonType: selectedButton };
    const updatedUsers = [...users, newButton];
    setUsers(updatedUsers);

    console.log("Added new button:", newButton);
    console.log("All buttons:", updatedUsers);

    setID("");
    setButtonName("");
    setSelectedButton(null);
    settorchOn(false);
    settorchOff(true);
    setfanOn(false);
    setadduserHidden(false);
    setSelectButton(false);
  };

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  const AnimatedText = ({ text, color = "black" }) => {
    return (
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="transition-colors duration-500"
            style={{
              transitionDelay: `${i * 100}ms`,
              color: color,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

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
      {!adduserHidden && !Hidden && !SelectButton && (
        <>
          <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[400px] shadow-lg overflow-hidden">
            <h1 className="text-2xl mb-4 font-semibold">New User</h1>
            <div className="flex flex-col gap-3 w-full shadow-sm rounded-lg bg-gray-100/70">
              {["App Name", "Email", "Phone no", "Address"].map((label, i) => (
                <div
                  key={i}
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4">{label}</label>
                  <input
                    type="text"
                    placeholder=" "
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="relative flex items-center mt-6 mb-4 w-full">
              <h1 className="mx-auto text-2xl font-semibold">Area</h1>
            </div>

            <div className="flex items-center justify-center overflow-hidden bg-gray-100/70 h-10 w-[350px] shadow-sm rounded-lg relative">
              <div className="animate-verticaltextslide flex flex-col justify-center items-center">
                {[...areas, ...areas].map((item, idx) => (
                  <h1
                    key={idx}
                    className="text-xl font-light py-1 multi-gradient-text"
                  >
                    {item}
                  </h1>
                ))}
              </div>
              <button
                onClick={() => {setHidden(true);setAreaName("");}}
                className="absolute right-0 px-1 mr-1 py-1 text-gray-600 text-xs rounded-lg bg-gray-100/70 transition hover:text-gray-800"
              >
                <img src={add} alt="add" className="w-5" />
              </button>
            </div>

            <div className="relative flex flex-col items-center mt-4 w-full">
              <h2 className="text-xl font-semibold mb-2">Your Added Buttons</h2>
              <div className="w-full bg-gray-100/70 rounded-lg shadow-sm p-2 flex flex-col gap-2 max-h-40 overflow-y-auto">
                {users.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center">
                    No buttons added yet
                  </p>
                ) : (
                  users.map((btn, idx) => (
                    <div
                      key={btn.ID || idx}
                      className="flex justify-between items-center px-3 py-2 bg-white rounded-md shadow-sm"
                    >
                      <span className="font-medium">{btn.ButtonName}</span>
                      <span className="text-sm text-purple-600 font-semibold">
                        {btn.ButtonType}
                      </span>
                      <span className="text-sm text-gray-600">
                        ID: {btn.ID}
                      </span>
                      <span className="text-sm text-gray-500 italic">
                        {btn.AreaName}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button className="mt-4 w-full text-black shadow-sm py-2 rounded-lg bg-gray-100/70 transition">
              Submit
            </button>
          </div>
        </>
      )}

      {/* ========== ADD AREA FORM ========== */}
      {Hidden && !adduserHidden && !SelectButton && (
        <>
          <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[400px] shadow-lg overflow-hidden">
            <div className="flex items-center justify-center w-full relative mb-4">
              <button
                onClick={() => setHidden(false)}
                className="absolute left-0 flex items-center w-6 h-6 mb-4 text-black shadow-sm pl-0.5 rounded-full bg-gray-100/70 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl mb-4 font-semibold">Area</h1>
            </div>
            <div className="flex flex-col gap-3 w-full shadow-sm rounded-lg bg-gray-100/70">
              <div className="w-full flex hover:shadow-sm rounded-lg transition">
                <label className="flex items-center px-4 py-4">Area Name</label>
                <input
                  type="text"
                  placeholder=" "
                  value={AreaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative flex items-center mt-6 mb-4 w-full">
              <h1 className="mx-auto text-2xl font-semibold">Buttons</h1>
            </div>
            <div className="flex items-center justify-center overflow-hidden bg-gray-100/70 h-10 w-[350px] shadow-sm rounded-lg relative">
              <div className="animate-verticaltextslide flex flex-col justify-center items-center">
                {[...buttons, ...buttons].map((item, idx) => (
                  <h1
                    key={idx}
                    className="text-xl font-light py-1 multi-gradient-text"
                  >
                    {item}
                  </h1>
                ))}
              </div>
              <button
                onClick={() => setadduserHidden(true)}
                className="absolute right-0 px-1 mr-1 py-1 text-gray-600 text-xs rounded-lg bg-gray-100/70 transition hover:text-gray-800"
              >
                <img src={add} alt="add" className="w-5" />
              </button>
            </div>
            
            <button 
            onClick={() => {
              setHidden(false);
              setadduserHidden(false);
              setSelectButton(false);
            }}
            className="mt-4 w-full text-black shadow-sm py-2 rounded-lg bg-gray-100/70 transition">
              Submit
            </button>
          </div>
        </>
      )}

      {/* ========== SELECT BUTTON PAGE ========== */}
      {adduserHidden && !SelectButton && (
        <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[450px] shadow-lg overflow-hidden">
          <div className="flex items-center justify-center w-full relative mb-4">
            <button
              onClick={() => setadduserHidden(false)}
              className="absolute left-0 flex items-center w-6 pl-0.5 h-6 mb-4 text-black shadow-sm rounded-full bg-gray-100/70 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl mb-4 font-semibold">Select Your Button</h1>
          </div>

          {["Light", "Fan"].map((btnName, index) => (
            <div key={index} className="flex gap-2 items-center w-full">
              {btnName === "Light" && (
                <div className="flex w-[350px] shadow-sm rounded-full bg-white overflow-hidden relative m-4 z-10">
                  <div className="flex items-center justify-start z-10 -ml-4 overflow-hidden">
                    <img src={torch} alt="torch" />
                  </div>

                  {torchOn && (
                    <div
                      className="absolute -left-1 top-1/2 -translate-y-1/2 
                        w-[500px] h-[350px] 
                        bg-gradient-to-r from-purple-300/80 to-transparent 
                        blur-2xl overflow-hidden"
                      style={{
                        clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
                      }}
                    ></div>
                  )}

                  {torchOff && (
                    <button
                      className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl"
                      onClick={() => {
                        settorchOn(true);
                        settorchOff(false);
                      }}
                    >
                      <AnimatedText text="OFF" color="black" />
                    </button>
                  )}
                  {torchOn && (
                    <button
                      className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl"
                      onClick={() => {
                        settorchOff(true);
                        settorchOn(false);
                      }}
                    >
                      <AnimatedText text="ON" color="gray" />
                    </button>
                  )}
                </div>
              )}

              {btnName === "Fan" && (
                <div className="flex w-[350px] py-4 mr-6 items-center ml-5 shadow-md rounded-2xl bg-white overflow-hidden relative z-10">
                  <div className="flex items-center justify-start ml-2 z-10 overflow-hidden">
                    {fanOn ? (
                      <motion.img
                        src={fan}
                        alt="fan"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    ) : (
                      <img src={fan} alt="fan" />
                    )}
                  </div>

                  {fanOn && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className="absolute"
                          width="300"
                          height="40"
                          initial={{ x: 60, y: 2 + i * 10, opacity: 0 }}
                          animate={{
                            x: [60, 350],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{
                            duration: 5,
                            delay: i * 1,
                            repeat: Infinity,
                            ease: "easeOut",
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
                                "M 0 20 Q 15 10, 30 20 T 60 20 T 90 20 T 120 20 T 150 20",
                              ],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <defs>
                            <linearGradient
                              id="waveGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.7" />
                              <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </motion.svg>
                      ))}
                    </>
                  )}

                  <button
                    className="absolute left-[200px] top-1/2 -translate-y-1/2 font-black text-2xl"
                    onClick={() => setfanOn(!fanOn)}
                  >
                    <AnimatedText text={fanOn ? "ON" : "OFF"} color="black" />
                  </button>
                </div>
              )}
              
              <input
                type="radio"
                id={`radio-${btnName}`}
                name="buttonSelect"
                checked={selectedButton === btnName}
                onChange={() => setSelectedButton(btnName)}
                className="w-5 h-5 cursor-pointer accent-purple-500"
              />
            </div>
          ))}
          
          <button
            onClick={() => setSelectButton(true)}
            disabled={!selectedButton}
            className={`w-[400px] text-black shadow-sm py-2 mb-3 mt-5 rounded-lg transition ${
              selectedButton 
                ? 'bg-gray-100/70 hover:bg-gray-200/70' 
                : 'bg-gray-100/30 cursor-not-allowed opacity-50'
            }`}
          >
            next
          </button>
        </div>
      )}

      {/* ========== DATA FORM PAGE */}
      {SelectButton && (
        <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/60 p-6 w-[450px] shadow-lg overflow-hidden">
          <div className="flex items-center justify-center w-full relative mb-4">
            <button
              onClick={() => setSelectButton(false)}
              className="absolute left-0 flex items-center w-6 h-6 mb-4 pl-0.5 text-black shadow-sm rounded-full bg-gray-100/70 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl mb-4 font-semibold">Enter Details</h1>
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-3 w-full shadow-sm rounded-lg bg-gray-100/70 mb-4">
              <div className="w-full flex hover:shadow-sm rounded-lg transition">
                <label className="flex items-center px-4 py-4">
                  Button Name
                </label>
                <input
                  type="text"
                  placeholder=" "
                  value={ButtonName}
                  onChange={(e) => setButtonName(e.target.value)}
                  className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                />
              </div>
              <div className="w-full flex hover:shadow-sm rounded-lg transition">
                <label className="flex items-center px-4 pr-24 py-4">ID</label>
                <input
                  type="text"
                  placeholder=" "
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                  className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-[400px] text-black shadow-sm py-2 mb-3 rounded-lg bg-gray-100/70 transition hover:bg-gray-200/70"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}