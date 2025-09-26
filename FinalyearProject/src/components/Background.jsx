// src/components/Background.jsx
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9D5FF] via-white via-50% " />
      <div className="absolute bottom-0 h-[1200px] w-full bg-gradient-to-b from-white to-[#D8B4FE]" />
      <div className="absolute inset-0 bg-gradient-to-t from-violet via-white to-neutral-50" />
    
      {/* Grid pattern overlay */}
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

      {/* Animated glowing blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -100, 100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
}