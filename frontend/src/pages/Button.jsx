import React from "react";
import "../index.css";
import Background from "../components/Background.jsx";

export default function WashingMachineHalfWater() {
  return (
    <>
      <Background />
      <div
        className="
          w-[90%]
          min-h-[300px]
          m-auto
          mt-10
          rounded-2xl
          backdrop-blur-[2px]
          bg-[#C2E4D9]/90
          border-2
          border-white
          flex
          items-center
          justify-center
        "
      >
        {/* Empty glass container */}
      </div>
    </>
  );
}
