import { useEffect, useRef, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import username from "../assets/username.gif";
import back from "../assets/back.png";
import errorImg from "../assets/error.png"
import waste from "../assets/waste1.png";
import wasteImg from "../assets/waste2.png";
import mailcontact from "../assets/mailcontact.png";
import cancel from "../assets/cancel.png"

export default function Adduser() {
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const location = useLocation();
  const encodedEmail = location.state?.encodedEmail;
  const email = encodedEmail ? atob(encodedEmail) : null;
  const navigate = useNavigate();
  const[User_Name,setusername]=useState("");
  const[user_Email,setemail]=useState("");
  const[user_PhoneNo,setphoneno]=useState("");
  const[Address,setaddress]=useState("");
  const [user_country,setcountry]=useState("");
  const[user_State,setstate]=useState("");
  const[user_district,setdistrict]=useState("");
  const[loading,setloading]=useState(false);
  const[loadingp,setloadingp]=useState(false);
  const[loadingup,setloadingup]=useState(false);
  const [Message, setMessage] = useState("");
  const [error, seterror] = useState("");
  const [Messaged, setMessaged] = useState("");
  const [errord, seterrord] = useState("");
  const canvasRef = useRef(null);
  const [originalData, setOriginalData] = useState({}); 
  const [isChanged, setIsChanged] = useState(false);
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
useEffect(() => {
  const getclientinfo = async () => {
  try {
    const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        navigate("/");
        return;
      }
    setloading(true);
    const response = await fetch(
      `https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/user_part_info?email=${email}`,
      {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        }
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(errorText);
      error.status = response.status;  
      throw error;
    }
    const data = await response.json();
    setusername(data.User_Name)
    setemail(data.user_Email)
    setphoneno(data.user_PhoneNo)
    setaddress(data.Address)
    setcountry(data.user_country)
    setstate(data.user_State)
    setdistrict(data.user_district)

    setOriginalData({
      User_Name: data.User_Name,
      user_Email: data.user_Email,
      user_PhoneNo: data.user_PhoneNo,
      Address: data.Address,
      user_country: data.user_country,
      user_State: data.user_State,
      user_district: data.user_district,
    });

    console.log("successfully get client data!");
    setloading(false);
  }
  catch (error) {
    console.log("Error status:", error.status);
  }
};
getclientinfo();
},[email]);

useEffect(() => {
  const hasChanged =
    User_Name !== originalData.User_Name ||
    user_Email !== originalData.user_Email ||
    user_PhoneNo !== originalData.user_PhoneNo ||
    Address !== originalData.Address ||
    user_country !== originalData.user_country ||
    user_State !== originalData.user_State ||
    user_district !== originalData.user_district;
  setIsChanged(hasChanged);
}, [
  User_Name,
  user_Email,
  user_PhoneNo,
  Address,
  user_country,
  user_State,
  user_district,
  originalData,
]);

const update_user = async() =>{
  try{
    const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        navigate("/");
        return;
      }
    setloadingup(true);
    const res = await fetch("https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/update_user",
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({
            User_Name,
            user_Email,
            user_PhoneNo: String(user_PhoneNo),
            Address,
            user_country,
            user_State,
            user_district,
        })
      }
    );
    if (!res.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.status = response.status;  
        throw error;
    }
    const data = await res.json();
    if(data == "successfully_update"){
      setloadingup(false);
      setMessage("successfully update");
      setTimeout(() => setMessage(""), 1000);
    }
    else{
      seterror("updation error")
      setTimeout(() => seterror(""), 1000);
    }
  }
  catch (error) {
    console.log("Error status:", error);
    seterrord("errorin func...")
  };
}

const delete_user = async () => {
  try{
    const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        navigate("/");
        return;
      }
    setloadingp(true);
    console.log(modalInput);
    console.log(email);
    if (modalInput == email){
      const res = await fetch(`https://finalyearproject-alpha.vercel.app/Growspire/v1/Business_users/delete_user?user_email=${email}`,
        {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        }
        }
      );
      if (!res.ok) {
        const errorText = await response.text();
        const error = new Error(errorText);
        error.status = response.status;  
        throw error;
      }
      const data = await res.json(); 
      if(data.detail == "delete_successfully"){
        setloadingp(false);
        setMessaged("delete successfully");
        setTimeout(() => navigate("/Clients"), 1000);
      }

    }
    else{
      seterrord("user email not same...")
      setTimeout(() => seterrord(""), 1000);
    }
  }
  catch (error) {
    console.log("Error status:", error);
    seterrord("errorin func...")
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
            <div className="flex gap-3 w-full">
              <button 
              onClick={() => setShowModal(true)}
              className="cursor-pointer relative group flex justify-center items-center mx-auto mt-4 w-full hover:bg-red-300 hover:border-red-400 hover:shadow-inner hover:text-red-900 text-black border border-gray-200 py-1 rounded-2xl bg-gray-100/70 transition">
              delete
              <div className="absolute left-0 mx-1 flex justify-center items-center group-hover:bg-white bg-gray-800 w-[25px] h-[25px] rounded-full">
                <img src={waste} alt="delete_button" className="w-5 h-5 group-hover:hidden"/>
                <img src={wasteImg} alt="delete_button_hover" className="w-5 h-5 hidden group-hover:block"/>
              </div>
              </button>
              <button 
              disabled={!isChanged || loadingup}
              onClick={update_user}
              className={`cursor-pointer relative group flex justify-center items-center mx-auto mt-4 w-full border border-gray-200 py-1 rounded-2xl transition ${
                isChanged||loadingup
                  ? "hover:bg-green-300 hover:border-green-400 hover:shadow-inner hover:text-green-700 bg-gray-100/70 text-black"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"}`}>
              {loadingup ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Processing...</span>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) :(
              <>Update
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
              </>)}
              </button>
            </div>
            {Message && (
              <span className="m-6 text-green-600 font-semibold">
                {Message}
              </span>
            )}
            {error && (
              <span className="flex m-6 gap-3 text-red-600 font-semibold">
                <img src={errorImg} alt="error" className="w-6 h-6"></img>
                {error}
              </span>
            )}
          </div>
          {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gray-200/40 backdrop-blur-md shadow-xl rounded-lg transition-all">
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-12 h-12 border-4 border-t-transparent border-gray-800 rounded-full animate-spin mb-4"></div>
            <span className="text-gray-800 font-semibold text-lg">Processing...</span>
          </div>
        </div>
      )}
      {showModal && (
  <div className="fixed inset-0 bg-gray-100/50 bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-purple-200 flex flex-col px-1 justify-center items-center pt-1 pb-1 rounded-xl shadow-lg">
      <div className="flex bg-white p-4 flex-col rounded-xl shadow-lg">
        <div className="flex items-center mb-3 ">
          <p className="flex items-center gap-3 mx-auto pr-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] pl-2 mb-4 mt-4 text-md">
            <span>
              <img src={mailcontact} className="w-6" alt="email" />
            </span>
            <span>{user_Email}</span>
          </p>
          <img src={cancel} alt="cancel" className="w-6 h-6 mr-5 cursor-pointer" onClick={() =>setShowModal(false)}></img>
        </div>
        <div className="w-full flex hover:shadow-sm rounded-lg transition bg-gray-100">
          <input
            type="text"
            placeholder=" "
            onChange={(e) => setModalInput(e.target.value)}
            className="w-[320px] hover:border-b-2 ml-3 mb-3 pt-4 focus:outline-none"
          />
        </div>
        <div className="flex flex-col w-[300px]">
          <p className="text-[12px] ml-2 mt-4 mb-4 text-gray-400">
            Enter the user's email ID to permanently delete their account and all associated apps.
          </p>
        </div>
        <div className="flex justify-center gap-5">
          <button 
            disabled={loadingp}
            onClick={delete_user}
            className={`cursor-pointer relative group flex justify-center items-center mx-auto mt-1 w-full hover:bg-red-300 hover:border-red-400 hover:shadow-inner hover:text-red-900 text-black border border-gray-200 py-1 rounded-2xl bg-gray-100/70 transition ${
            loadingp ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"}`}>
            {loadingp ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Processing...</span>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) :(
              <>
                delete
                <div className="absolute right-0 mx-1 flex justify-center items-center group-hover:bg-white bg-gray-800 w-[25px] h-[25px] rounded-full">
                  <img src={waste} alt="delete_button" className="w-5 h-5 group-hover:hidden"/>
                  <img src={wasteImg} alt="delete_button_hover" className="w-5 h-5 hidden group-hover:block"/>
                </div>
              </>
            )}
          </button>
        </div>
        {Messaged && (
          <span className="m-6 text-green-600 font-semibold">
            {Messaged}
          </span>
        )}
        {errord && (
          <span className="flex m-6 gap-3 text-red-600 font-semibold">
            <img src={error1} alt="error" className="w-6 h-6"></img>
            {errord}
          </span>
        )}
      </div>
      <h1 className="text-sm font-bold tracking-wide pt-1 text-purple-400">DELETE USER</h1>
    </div>
  </div>
)}
    </div>
  );
}