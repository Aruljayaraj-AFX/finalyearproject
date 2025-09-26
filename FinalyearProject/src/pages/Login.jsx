import login from "../assets/login.mp4";
import {useState,useRef,useEffect} from "react";
import apple from "../assets/apple.png";
import facebook from "../assets/facebookk.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background.jsx";

export default function Login() {

const [isLoaded, setIsLoaded] = useState(false);
const [isLoadeds, setIsLoadeds] = useState(false);
const [active,setActive] = useState("SignIn");
const [activeSignup,setactiveSignup] = useState(false)
const [activeSignin,setactiveSignin] = useState(true)
const [activeGoogle,setactiveGoogle] = useState(true);
const [activeFacebook,setactiveFacebook] = useState(false);
const [activeApple,setactiveApple] = useState(false);

// Separate state for SignIn
const [swipedSignIn, setSwipedSignIn] = useState(false);
const [dragXSignIn, setDragXSignIn] = useState(0);
const containerRefSignIn = useRef(null);
const handleRefSignIn = useRef(null);

// Separate state for SignUp
const [swipedSignUp, setSwipedSignUp] = useState(false);
const [dragXSignUp, setDragXSignUp] = useState(0);
const containerRefSignUp = useRef(null);
const handleRefSignUp = useRef(null);
const navigateSignUp = useNavigate();
const navigate = useNavigate();

const handleStartSignIn = (e) => {
  e.preventDefault();
  
  // Get starting position for both mouse and touch
  const startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  const container = containerRefSignIn.current;
  const handle = handleRefSignIn.current;
  
  if (!container || !handle) return;
  
  const containerWidth = container.offsetWidth;
  const handleWidth = handle.offsetWidth;
  const startspace =4;
  const endspace =4;
  const maxOffset = containerWidth - handleWidth - startspace - endspace;

  const onMove = (moveEvent) => {
    moveEvent.preventDefault();
    
    // Get current position for both mouse and touch
    const currentX = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
    let offset = currentX - startX;
    
    // Clamp the offset to stay within bounds
    offset = Math.max(0, Math.min(offset, maxOffset));

    setDragXSignIn(offset);
    
    // If reached near the end, mark as swiped
    if (offset >= maxOffset * 0.9) {
      setSwipedSignIn(true);
      if (activeGoogle == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/google?act=login";
      }, 100); 
    };
    if (activeFacebook == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/facebook?act=login";
      }, 100); 
    };
    if (activeApple == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/github?act=login";
      }, 100);
    };
  }
  };
  
  const onEnd = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);
    
    // Snap back if not fully swiped
    if (!swipedSignIn) {
      setDragXSignIn(0);
    }
  };
  
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchmove", onMove, { passive: false });
  document.addEventListener("touchend", onEnd);
};

const handleStartSignUp = (e) => {
  e.preventDefault();
  
  // Get starting position for both mouse and touch
  const startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  const container = containerRefSignUp.current;
  const handle = handleRefSignUp.current;
  
  if (!container || !handle) return;
  
  const containerWidth = container.offsetWidth;
  const handleWidth = handle.offsetWidth;
  const maxOffset = containerWidth - handleWidth;

  const onMove = (moveEvent) => {
    moveEvent.preventDefault();
    
    // Get current position for both mouse and touch
    const currentX = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
    let offset = currentX - startX;
    
    // Clamp the offset to stay within bounds
    offset = Math.max(0, Math.min(offset, maxOffset));

    setDragXSignUp(offset);
    
    // If reached near the end, mark as swiped
    if (offset >= maxOffset * 0.9 ) {
      setSwipedSignUp(true);
      if (activeGoogle == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/google?act=signup";
      }, 100); 
    };
    if (activeFacebook == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/facebook?act=signup";
      }, 100); 
    };
    if (activeApple == true){
      setTimeout(() => {
         setIsLoadeds(true)
        window.location.href =
          "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/login/github?act=signup";
      }, 100); 
    };
  }
  };
  
  const onEnd = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onEnd);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onEnd);
    
    // Snap back if not fully swiped
    if (!swipedSignUp) {
      setDragXSignUp(0);
    }
  };
  
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchmove", onMove, { passive: false });
  document.addEventListener("touchend", onEnd);
};

// Reset function when switching tabs
const resetSwipeStates = () => {
  setSwipedSignIn(false);
  setDragXSignIn(0);
  setSwipedSignUp(false);
  setDragXSignUp(0);
};

useEffect(() => {
  let isMounted = true; // prevent state update if component unmounts

  const fetchPing = async () => {
    try {
      const res = await fetch(
        "https://finalyearproject-agw4.onrender.com/Growspire/v1/users/ping"
      );

      console.log("Response status:", res.status);

      if (res.status === 200) {
        const data = await res.json();
        if (data.status) {
          console.log("status", data.status);
        }
        if (isMounted) setIsLoaded(true); 
      } else {
        console.log("Ping failed with status:", res.status);
        setTimeout(fetchPing, 1000);
      }
    } catch (err) {
      console.error("Error fetching ping:", err);
      setTimeout(fetchPing, 1000);
    }
  };

  fetchPing();

  return () => {
    isMounted = false; 
  };
}, []);

useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

if (!isLoaded) {
    // Full-page loading screen
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
      </div>
    );
  }

if (isLoadeds) {
    // Full-page loading screen
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Background />
      <div className="bg-[#e1d2f9]/70 rounded-3xl shadow-2xl flex flex-col lg:flex-row p-4 gap-4 overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-4xl items-start">
        {/* Main content container */}
        <div className="flex flex-col gap-5 flex-1 w-full"> 
          <div className="flex flex-col items-center justify-center h-auto lg:h-[570px] w-full rounded-3xl bg-gray-100 p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sulphur font-light text-gray-700 mb-4 text-center">Let's dive in!</h1>

            <div className="flex mt-4 border border-gray-200 bg-gray-200 rounded-lg w-full max-w-[240px] px-0.5 py-0.5">
              <div 
              onClick={() => {setActive("SignIn");setactiveSignin(true);setactiveSignup(false);resetSwipeStates();}}
              className={`flex-grow flex justify-center py-2 rounded-md transition duration-300 "
                ${active ==="SignIn" ? "bg-white" : "text-gray-400" }`}>
                <button className="font-sulphur font-bold text-xs sm:text-sm transition duration-300 ">
                  SignIn
                </button>
              </div>
              <div 
              onClick={() => {setActive("SignUp");setactiveSignup(true);setactiveSignin(false);resetSwipeStates();}}
              className={`flex-grow flex justify-center py-2 rounded-md transition duration-300"
              ${active === "SignUp" ? "bg-white" : "text-gray-400" }`}>
                <button className="font-sulphur font-bold text-xs sm:text-sm transition duration-300 ">
                  SignUp
                </button>
              </div>
            </div>
            
            {/* signin */}
            {activeSignin && (
            <>
            <div
            ref={containerRefSignIn}
            className="relative w-full max-w-[240px] h-10 mt-4 bg-gray-300 rounded-lg select-none"
            style={{ overflow: 'hidden' }}>
            {/* Background text */}
              <div 
              onClick={() => {navigate(-1)}}
              className="font-sulphur font-bold text-xs sm:text-sm absolute inset-0 flex items-center justify-center text-white z-0">
                {swipedSignIn ? "Loading..." : "Swipe to Continue"}
              </div>
              {/* Draggable handle */}
              <div
              ref={handleRefSignIn}
              onMouseDown={handleStartSignIn}
              onTouchStart={handleStartSignIn}
              style={{ 
                transform: `translateX(${dragXSignIn}px)`,
                transition: swipedSignIn || dragXSignIn === 0 ? 'transform 0.3s ease' : 'none'
              }}
              className={`absolute top-1 left-1 w-8 h-8 rounded-lg shadow-md cursor-pointer 
              select-none flex items-center justify-center z-10 touch-none ${
                activeGoogle ? 'bg-white' : 
                activeApple ? 'bg-black' : 
                activeFacebook ? 'bg-[#039BE5]' : 'bg-white'
              }`}>
                {activeGoogle && (
                  <img src={google} alt="Google" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
                {activeApple && (
                  <img src={apple} alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
                {activeFacebook && (
                  <img src={facebook} alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
              </div>
            </div>

            <div className="flex items-center w-full max-w-[240px] mt-2">
              <hr className="flex-grow border-t border-gray-400" />
              <span className="mx-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-t border-gray-400" />
            </div> 
            <div className="flex mt-2 gap-3 justify-center">
              {!activeGoogle && (
              <button 
              onClick ={() => {setactiveGoogle(true);setactiveFacebook(false);setactiveApple(false);}}
              className="rounded-full border border-gray-300 p-2">
                <img src={google} alt="Google" className="w-4 h-4 sm:w-5 sm:h-5"/>
              </button>
              )}
              {!activeApple && (
              <button 
              onClick ={() => {setactiveApple(true);setactiveGoogle(false);setactiveFacebook(false);}}
              className="rounded-full bg-black p-2">
                <img src={apple} alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5"/>
              </button>
              )}
              {!activeFacebook &&(
              <button 
              onClick={() => {setactiveFacebook(true);setactiveApple(false);setactiveGoogle(false);}}
              className="rounded-full border bg-[#039BE5] border-white p-1">
                <img src={facebook} alt="Facebook" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"/>
              </button>
              )}
            </div>
            </>
            )}
            
            {/* signup */}
            {activeSignup && (
            <>
            <div
            ref={containerRefSignUp}
            className="relative w-full max-w-[240px] h-10 mt-4 bg-gray-300 rounded-lg select-none"
            style={{ overflow: 'hidden' }}>
            {/* Background text */}
              <div className="absolute inset-0 flex items-center justify-center text-white z-0 font-sulphur font-bold text-xs sm:text-sm">
                {swipedSignUp ? "Done!" : "Swipe to Continue"}
              </div>
              {/* Draggable handle */}
              <div
              ref={handleRefSignUp}
              onMouseDown={handleStartSignUp}
              onTouchStart={handleStartSignUp}
              style={{ 
                transform: `translateX(${dragXSignUp}px)`,
                transition: swipedSignUp || dragXSignUp === 0 ? 'transform 0.3s ease' : 'none'
              }}
              className={`absolute top-1 left-1 w-8 h-8 rounded-lg shadow-md cursor-pointer 
              select-none flex items-center justify-center z-10 touch-none ${
                activeGoogle ? 'bg-white' : 
                activeApple ? 'bg-black' : 
                activeFacebook ? 'bg-[#039BE5]' : 'bg-white'
              }`}>
                {activeGoogle && (
                  <img src={google} alt="Google" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
                {activeApple && (
                  <img src={apple} alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
                {activeFacebook && (
                  <img src={facebook} alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"/>
                )}
              </div>
            </div>
            <div className="flex items-center w-full max-w-[240px] mt-2">
              <hr className="flex-grow border-t border-gray-400" />
              <span className="mx-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-t border-gray-400" />
            </div> 
            <div className="flex mt-2 gap-3 justify-center">
              {!activeGoogle && (
              <button 
              onClick ={() => {setactiveGoogle(true);setactiveFacebook(false);setactiveApple(false);}}
              className="rounded-full border border-gray-300 p-2">
                <img src={google} alt="Google" className="w-4 h-4 sm:w-5 sm:h-5"/>
              </button>
              )}
              {!activeApple && (
              <button 
              onClick ={() => {setactiveApple(true);setactiveGoogle(false);setactiveFacebook(false);}}
              className="rounded-full bg-black p-2">
                <img src={apple} alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5"/>
              </button>
              )}
              {!activeFacebook &&(
              <button 
              onClick={() => {setactiveFacebook(true);setactiveApple(false);setactiveGoogle(false);}}
              className="rounded-full border bg-[#039BE5] border-white p-1">
                <img src={facebook} alt="Facebook" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"/>
              </button>
              )}
            </div>
            </>
            )}  
          </div>
         </div>
         
        {/* Video container - Hidden on mobile and tablet, visible on desktop */}
        <div className="hidden lg:block rounded-3xl bg-blue-200 w-[350px] flex-shrink-0">
          <div className="flex items-center justify-center h-full">
            <video src={login} className="w-full h-[570px] object-cover rounded-3xl" autoPlay loop muted playsInline />
          </div>
        </div>
      </div>
    </div>
  );
}