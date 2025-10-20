import tutorial from "../assets/tutorial.png";
import { useState,useEffect, useRef  } from "react";

export default function Tutorial() {

    const leftRef = useRef(null);
      const rightRef = useRef(null);
      const lastDivRef = useRef(null);
      const divRef = useRef(null);

    const syncReverseScroll = () => {
    if (leftRef.current && rightRef.current) {
      const leftScrollTop = leftRef.current.scrollTop;
      const maxScroll = leftRef.current.scrollHeight - leftRef.current.clientHeight;
      // Reverse scroll calculation
      rightRef.current.scrollTop = maxScroll - leftScrollTop;
    }
  };
const syncReverseScroll1 = () => {
    if (leftRef.current && rightRef.current) {
      const leftScrollTop = rightRef.current.scrollTop;
      const maxScroll = rightRef.current.scrollHeight - rightRef.current.clientHeight;
      // Reverse scroll calculation
      leftRef.current.scrollTop = maxScroll - leftScrollTop;
    }
  };

  useEffect(() => {
    // Scroll left div to bottom initially
    if (leftRef.current && rightRef.current) {
      const maxScroll = leftRef.current.scrollHeight - leftRef.current.clientHeight;
      leftRef.current.scrollTop = maxScroll;
      rightRef.current.scrollTop = 0; // Opposite side starts at top
    }
  }, []);
  return (
    <div 
    id="tutorial"
    className="min-h-screen flex flex-col">
        <div className="relative z-10 flex flex-col pb-20 items-center justify-center">
              
              <div className="relative z-10 flex flex-col  items-center justify-center">
              <div className="flex  pt-20 items-center w-[340px]">
                    <hr
                      className="flex-grow border-0 h-[2px]"
                      style={{
                        background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
                      }}/>
                    <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
                      <span><img src={tutorial} className="pt-[2px] w-[18px]  h-auto" alt="mail icon"/></span>
                      tutorial
                    </p>
                    <hr 
                      className="flex-grow border-0 h-[2px]"
                      style={{
                        background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
                      }}/>
                  </div>
                  <div ref={divRef} className="relative flex flex-col items-center justify-center" >
                    <h1 className="text-6xl font-black  pt-15 text-gray-900 tracking-tight ">Quick Start Guide</h1>
                    <p className="text-xl text-gray-600 tracking-tight pb-10 pt-6" >Get up and running with SAP in minutes. Follow our step-by-step guide to start managing your projects efficiently.</p>
                    <div className=" relative flex flex-row border border-black w-[1200px] h-[600px] ">
                      <div ref={leftRef} onScroll={syncReverseScroll} className="w-[600px] h-[600px] border border-black overflow-y-scroll no-scrollbar ">
                        <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                        <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                        <div className=" border border-red-600 w-[600px] h-[600px]"></div>
                      </div>
                      <div ref={rightRef} onScroll={syncReverseScroll1} className="w-[600px] h-[600px] border border-black overflow-y-scroll no-scrollbar ">
                        <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                        <div className="  border border-red-600 w-[600px] h-[600px]"></div>
                        <div ref={lastDivRef} className=" border border-red-600 w-[600px] h-[600px]"></div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
    </div>
  );
} 