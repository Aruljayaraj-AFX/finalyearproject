import React from "react";
import "../index.css";
import connect from "../assets/connect1.gif"
import edit from "../assets/edit-button.png"

export default function WashingMachineHalfWater() {
  return (
    <div className="min-h-screen flex  relative flex-col">
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
      <div>
        <div className="w-[50%] m-auto mt-30 backdrop-blur-[2px] rounded-sm bg-white border-1 border-purple-400 shadow-inner shadow-purple-100"> 
          <div className="flex flex-col justify-center items-center m-10 gap-2">
            <div className="flex justify-center items-center">
              <img src={connect} className="w-6 h-6 " ></img>
              <p className="text-sm text-purple-400" >CONTROL HUB</p>
            </div> 
            <h1 className="text-bold text-2xl text-gray-400">
              Add & Manage Your Switches
            </h1>
            <h className="text-[25px]">
              Easily create buttons for each device in your Area
            </h>
          </div>
        </div>
        <div className="flex flex-col w-[50%] m-auto  mt-10">
          <h className="relative flex text-xl ml-2 text-gray-400">AREA</h>
          <div className="flex backdrop-blur-[2px] rounded-sm  justify-between bg-white border-1 border-gray-200 ">
            <h className="flex m-5 text-3xl text-purple-300">Bedroom</h>
            <button className="flex items-center m-5 rounded-2xl  border-2 bg-purple-200 border-purple-100">
              <img src={edit} alt="edit" className="w-5 h-5 m-2"></img>
              <p className="px-2 text-purple-600">
                Edit
              </p>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[50%] m-auto mb-10 mt-10">
          <h className="relative flex text-xl ml-2 text-gray-400">BUTTON</h>
          <div className="flex backdrop-blur-[2px] rounded-sm  justify-center  items-center bg-white border-1 border-gray-200 shadow-inner shadow-purple-100">
            <div
              className="w-[700px] h-[400px] m-10 overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(192,132,252,0.25)  1px, transparent 1px)",
                backgroundSize: "12px 100%",
                maskImage:
                  "radial-gradient(ellipse 100% 100% at 50% 50%, black 6%, transparent 50%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 120% 120% at 50% 50%, black 20%, transparent 40%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "destination-in",
                backgroundColor: "rgba(192,132,252,0.15)",
              }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
