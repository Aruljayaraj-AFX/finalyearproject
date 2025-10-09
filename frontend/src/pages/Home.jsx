import Hero from "../components/Hero.jsx";
import Background from "../components/Background.jsx";
import { useEffect } from "react";

export default function Home(){
    useEffect(()=>{
        const checkuser = async ()=>{    
        }
    })
    return(
        <div className="min-h-screen relative">
            <Background/>
            <Hero/>
        </div>
    );
}