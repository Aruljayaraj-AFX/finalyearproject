import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Tutorial from "../components/Tutorial.jsx";
import Value from "../components/Value.jsx";
import Switch from "../components/Switch.jsx";
import Background from "../components/Background.jsx";
import Contactus from "../components/Contact.jsx";
import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"


export default function Home(){
    return(
        <div className="min-h-screen relative">
            <Background/>
            <Hero/>
            <Features/>
            <Tutorial/>
            <Value/>
            <Switch/>
            <Contactus/>
        </div>
    );

}