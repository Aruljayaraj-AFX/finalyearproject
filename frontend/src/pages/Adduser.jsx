import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import username from "../assets/username.gif";
import back from "../assets/back.png";
import error1 from "../assets/error.png"

export default function Adduser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[User_Name,setusername]=useState("");
  const[user_Email,setemail]=useState("");
  const[user_PhoneNo,setphoneno]=useState("");
  const[Address,setaddress]=useState("");
  const [user_country,setcountry]=useState("");
  const[user_State,setstate]=useState("");
  const[user_district,setdistrict]=useState("");
  const [Message, setMessage] = useState("");
  const [error, seterror] = useState("");
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
    const createclient = async () => {
    try {
      setLoading(true);
      seterror("");
      setMessage("");
  
      if (!/^[A-Za-z\s]+$/.test(User_Name) || User_Name.length > 20) {
        seterror("Username must contain only letters and be max 20 characters.");
        return;
      }
  
      if (!/^[A-Za-z0-9]+@gmail\.com$/.test(user_Email)) {
        seterror("Invalid Gmail address. Only letters allowed before @.");
        return;
      }
  
      if (!/^\d{10}$/.test(user_PhoneNo)) {
        seterror("Phone number must be exactly 10 digits.");
        return;
      }
  
      if (!/^[A-Za-z0-9\s,.'-]{5,100}$/.test(Address)) {
        seterror("Address contains invalid characters.");
        return;
      }
  
      if (!/^[A-Za-z\s]{2,50}$/.test(user_country)) {
        seterror("Invalid country name.");
        return;
      }
  
      if (!/^[A-Za-z\s]{2,50}$/.test(user_State)) {
        seterror("Invalid state name.");
        return;
      }
  
      if (!/^[A-Za-z\s]{2,50}$/.test(user_district)) {
        seterror("Invalid district name.");
        return;
      }
  
      const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        navigate("/");
        return;
      }
      const response = await fetch(
        "https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/new_user",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${activeToken}`,
          },
          body: JSON.stringify({
            User_Name,
            user_Email,
            user_PhoneNo,
            Address,
            user_country,
            user_State,
            user_district,
          }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.status = response.status;  
        throw error;
      }
  
      await response.json();
      setMessage("Client created successfully!");
      setTimeout(() => navigate("/clients"), 1000);
  
    } catch (error) {
      if (error.status === 409) {
        seterror("Email already registered");
      } else {
        seterror("Failed to create client.");
      }
      console.log("Error status:", error.status);
      setTimeout(() => seterror(""), 3000);
    } finally {
      setLoading(false);
    }
  };
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
          <div className="relative z-20 flex flex-col items-center rounded-lg bg-white/40 backdrop-blur-lg shadow  p-6 w-[400px] border border-gray-200 overflow-hidden">
            <div className="flex justify-start gap-20 items-center w-full mb-4">
              <img src={back} alt="back" className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()}/>
              <div className="flex items-center gap-3">
                <img src={username} alt="username" className="w-6 h-6" />
                <h1 className="text-2xl font-semibold">New User</h1>
              </div>
            </div>
            <div className="flex flex-col w-full border border-gray-200 rounded-lg bg-gray-100/50">
                <div
                  className="w-full items-center flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 text-gray-500">User Name</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={User_Name}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 pt-4 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 select-none text-gray-500">Email</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={user_Email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-11  focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-3 py-4  text-gray-500">Phone No</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*" 
                    placeholder=" "
                    value={user_PhoneNo}
                    onChange={(e)=>setphoneno(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-3 mb-3 ml-5 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 text-gray-500">Address</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={Address}
                    onChange={(e)=>setaddress(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-6 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 text-gray-500">Country</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={user_country}
                    onChange={(e)=>setcountry(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-6 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 text-gray-500">State</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={user_State}
                    onChange={(e)=>setstate(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-10.5 focus:outline-none"
                  />
                </div>
                <div
                  className="w-full flex hover:shadow-sm rounded-lg transition"
                >
                  <label className="flex items-center px-4 py-4 text-gray-500">District</label>
                  <input
                    type="text"
                    placeholder=" "
                    value={user_district}
                    onChange={(e)=>setdistrict(e.target.value)}
                    className="w-[220px] hover:border-b-2 px-4 mb-3 ml-8.5 focus:outline-none"
                  />
                </div>
            </div>
            <button
                onClick={createclient}
                disabled={loading}
                className={`relative group flex justify-center items-center mx-auto mt-4 w-full text-black border hover:bg-green-300 hover:text-green-800 hover:border hover:shadow-inner hover:border-green-500 border-gray-200 py-1 rounded-2xl bg-gray-100/70 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Processing...</span>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    Create
                    <div className="absolute right-0 mx-1 flex justify-center items-center group-hover:bg-white bg-gray-800 w-[25px] h-[25px] rounded-full">
              <svg
              width="10"
              height="16"
              viewBox="0 2 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-[1500ms] group-hover:hidden group-hover:animate-[arrowMove_1s_linear_infinite]">
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
              <svg
              width="10"
              height="16"
              viewBox="0 2 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-[1500ms] group-hover:animate-[arrowMove_1s_linear_infinite] group-hover:block">
              <circle cx="1.61321" cy="1.61321" r="1.5" fill="green" />
              <circle cx="5.73583" cy="1.61321" r="1.5" fill="green" />
              <circle cx="5.73583" cy="5.5566" r="1.5" fill="green" />
              <circle cx="9.85851" cy="5.5566" r="1.5" fill="green" />
              <circle cx="9.85851" cy="9.5" r="1.5" fill="green" />
              <circle cx="13.9811" cy="9.5" r="1.5" fill="green" />
              <circle cx="5.73583" cy="13.4434" r="1.5" fill="green" />
              <circle cx="9.85851" cy="13.4434" r="1.5" fill="green" />
              <circle cx="1.61321" cy="17.3868" r="1.5" fill="green" />
              <circle cx="5.73583" cy="17.3868" r="1.5" fill="green" />
              </svg>
              </div>
                  </>
                )}
              </button>
            {Message && (
              <span className="m-6 text-green-600 font-semibold">
                {Message}
              </span>
            )}
            {error && (
              <span className="flex m-6 gap-3 text-red-600 font-semibold">
                <img src={error1} alt="error" className="w-6 h-6"></img>
                {error}
              </span>
            )}
          </div>
    </div>
  );
}