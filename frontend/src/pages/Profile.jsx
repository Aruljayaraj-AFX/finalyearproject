import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Edit3, LogOut } from "lucide-react";

export default function Profile() {
  const [user] = useState({
    name: "Akash",
    email: "akash0018ak@gmail.com",
    phone: "+91 98765 43210",
    role: "User",
    address: "No. 24, Rainbow Street, Chennai",
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.3 - 0.15,
      dy: Math.random() * 0.3 - 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 180, 180, 0.2)";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid overlay */}
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

      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Profile card */}
      <div className="relative z-10 flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-[480px] border border-gray-200 my-auto">
        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="w-25 h-25 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-5xl font-bold text-violet-600">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-lg" />
        </div>

        {/* Name & Role */}
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8" />

        {/* Info Section */}
        <div className="w-full space-y-5">
          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
              <p className="text-gray-900 font-medium truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
              <p className="text-gray-900 font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Address</p>
              <p className="text-gray-900 font-medium">{user.address}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8" />

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl shadow-lg text-white font-medium transition-all hover:shadow-xl hover:scale-105">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-xl shadow-lg text-white font-medium transition-all hover:shadow-xl hover:scale-105">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}