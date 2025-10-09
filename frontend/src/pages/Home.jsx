import Hero from "../components/Hero.jsx";
import Background from "../components/Background.jsx";
import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Home(){
    return(
        <div className="min-h-screen relative">
            <Background/>
            <Hero/>
        </div>
    );

}