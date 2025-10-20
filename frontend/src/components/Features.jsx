import features from "../assets/features.png";
import feature_user_add from "../assets/feature_new_user.gif";
import feature2 from "../assets/features2.gif";


export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="relative z-10 flex flex-col pb-15 items-center justify-center">
      <div className="flex items-center w-[340px]">
            <hr
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
              }}/>
            <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
              <span><img src={features}  className="pt-[2px]  w-[18px]  h-auto " alt="mail icon"/></span>
              Features
            </p>
            <hr 
              className="flex-grow border-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
              }}/>
          </div>
      </div>
      <h className="pl-10 text-6xl font-black pb-7 text-gray-900 tracking-tight ">Elevate Your Projects with SAP</h>
      <p className="pl-10 text-xl text-gray-600 tracking-tight pb-10" >Explore SAP's powerful features, Boost productivity, streamline workflows, and achieve project success with ease.</p>
      <div className="relative flex flex-col m-10 gap-10">
        <div className="relative flex flex-row  gap-10  ">
          <div className="relative border border-[#d8d8d8] bg-gray-100  rounded-lg p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature_user_add} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
        </div>
        <div className="relative flex flex-row ml-10 mr-10 gap-10  ">
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
          <div className="relative border border-[#d8d8d8] bg-gray-100 rounded-lg h-auto p-2">
            <h1 className="text-gray-600 text-2xl ml-4 pt-2 pb-2">Effortless Meeting Scheduling</h1>
            <p className="text-xl text-gray-400  ml-4 tracking-tight"> Seamlessly plan within SAP for enhanced collaboration and productivity.</p>
            <div className="relative flex flex-col items-center justify-center bg-gray-600 rounded-full border border-[#d8d8d8] ">
              <img src={feature2} alt="feature user add" className="rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>

        );
        }