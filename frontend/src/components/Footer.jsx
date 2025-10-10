import x from "../assets/x.png"
import youtube from "../assets/youtube.png"
import linkedin from "../assets/linkedin.png"
import insta from "../assets/insta.png"
import {Textfit} from "react-textfit"

export default function Footer({ clientcompanyname, client_slogan }){
    return(
        <div className="w-full bg-black overflow-hidden">
            <div className="flex justify-between">
            <div className="flex flex-col">
            <div className="pt-20 px-20 ">
                <h1 className="text-white font-bold text-5xl">{clientcompanyname}</h1>
                <p className="text-white pt-4 text-sm">Your smart meeting assistant for better</p>
                <p className="text-white pt-1 text-sm">notes, insights, and follow-up.</p>
                <p className="text-white pt-4 text-sm">&copy; 2024 My Company. All rights reserved.</p>
            </div>
            <div className="flex px-20 pt-4 gap-3">
                <button 
                    className="rounded-full border border-gray-300 bg-white p-2">
                    <img src={x} alt="x" className="w-2 h-2 sm:w-5 sm:h-5"/>
                </button>
                <button 
                    className="rounded-full border border-gray-300 bg-white p-2">
                    <img src={youtube} alt="x" className="w-2 h-2 sm:w-5 sm:h-5"/>
                </button>
                <button 
                    className="rounded-full border border-gray-300 bg-white p-2">
                    <img src={linkedin} alt="x" className="w-2 h-2 sm:w-5 sm:h-5"/>
                </button>
                <button 
                    className="rounded-full border border-gray-300 bg-white p-2">
                    <img src={insta} alt="x" className="w-4 h-4 sm:w-5 sm:h-5"/>
                </button>
            </div>
            </div>
            <div className="flex ">
            <div className="py-20 px-20 ">
                <h1 className="text-white font-bold text-2xl">Product</h1>
                <p className="text-white pt-4 text-sm">Tutorial</p>
                <p className="text-white pt-1 text-sm">Price</p>
                <p className="text-white pt-1 text-sm">FAQs</p>
                <p className="text-white pt-1 text-sm">contact</p>
            </div>
            <div className="py-20 px-20 ">
                <h1 className="text-white font-bold text-2xl">Legal</h1>
                <p className="text-white pt-4 text-sm">Terms of Service</p>
                <p className="text-white pt-1 text-sm">Privacy Policy</p>
            </div>
            </div>
            </div>
            <div className="flex justify-center overflow-hidden -mb-14 pt-10">
                <div className="w-full max-w-7xl">
                <Textfit 
                max={380}
                mode="single"
                style={{
                    WebkitMaskImage: 'linear-gradient(to top, transparent 20%, black 80%)',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: '100% 100%',
                    maskImage: 'linear-gradient(to top, transparent 0%, black 110%)',
                    maskRepeat: 'no-repeat',
                    maskSize: '100% 100%'
                }}
                className="text-[#4A4957] text-[380px] font-[900] leading-none text-center">A4ORCE</Textfit>
                </div>
            </div>
        </div>
    );
}