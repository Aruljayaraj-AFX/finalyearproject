import Hero from "../components/Hero.jsx";
import Background from "../components/Background.jsx";

export default function Home(){
    return(
        <div className="min-h-screen relative">
            <Background/>
            <Hero/>
        </div>
    );
}