import goal from "../assets/goal.png";
import profile from "../assets/profile1.png"

export default function Value() {
    return(
        <div className="min-h-screen flex flex-col">
            <div>
                  <div className="relative z-10 flex flex-col pb-10 items-center justify-center">
                  <div className="flex items-center w-[340px]">
                        <hr
                          className="flex-grow border-0 h-[2px]"
                          style={{
                            background: 'linear-gradient(to left, #8B5CF6 0%, #C4B5FD 50%, #EEE5FF 100%)'
                          }}/>
                        <p className="flex justify-between gap-1 mx-2 text-[#7C5AC5] border-[2px] border-[#C4B5FD] rounded-full bg-[#EEE5FF] px-2 pt-[1.5px] text-md">
                          <span><img src={goal} className="pt-[2px] w-[18px]  h-auto" alt="mail icon"/></span>
                          value
                        </p>
                        <hr 
                          className="flex-grow border-0 h-[2px]"
                          style={{
                            background: 'linear-gradient(to right, #7C3AED 0%, #A78BFA 50%, #EEE5FF 100%)'
                          }}/>
                      </div>
                  </div>
                  <p className="text-8xl font-black ml-15 mr-20 text-gray-700 pb-10 tracking-tight">"This software solution delivers outstanding value by streamlining smart device management, boosting operational efficiency, and enhancing user convenience. Designed for excellence, it ensures seamless, reliable, and high-performance operation while maintaining full scalability and flexibility for evolving business needs. Security is built in at every layer, with robust authentication, encrypted communications, and strict access controls safeguarding sensitive data and maintaining system integrity. By combining innovation, quality, and top-tier security, this solution empowers businesses to optimize performance, protect critical information, and stay ahead in a competitive landscape."</p>
                  <div className="relative flex flex-row border-1 border-[#7C5AC5] bg-black rounded-full ml-10 w-[300px]"><img src={profile} className="rounded-full w-[50px] h-full object-cover" alt="Profile" /><p className="text-4xl ml-5 pt-2 text-white ">fndf</p></div>
                </div>
        </div>
    );
}