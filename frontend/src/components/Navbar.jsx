import mail from "../assets/mail.svg"
import { useEffect, useState, useRef } from 'react';
import { Link , useLocation } from "react-router-dom";

export default function Navbar(CompanyLogo) {
    const [showImage, setImage] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const itemRefs = useRef([]);
    const containerRef = useRef(null);
    const location = useLocation();
    const isClientsPage = location.pathname.toLowerCase().startsWith("/clients");


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setImage(true);
            } else {
                setImage(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = ['HOME', 'CLIENTS', 'TUTORIAL', 'SWITCH'];

    const getHoverStyle = () => {
        if (hoveredIndex === null) return { opacity: 0 };

        const hoveredElement = itemRefs.current[hoveredIndex];
        if (!hoveredElement) return { opacity: 0 };

        return {
            left: `${hoveredElement.offsetLeft}px`,
            width: `${hoveredElement.offsetWidth}px`,
            opacity: 1
        };
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    // Dynamic styles based on page
    const navBg = isClientsPage ? 'bg-white' : 'bg-[#EEE5FF]';
    const defaultTextColor = isClientsPage ? '#000000' : '#7C5AC5';
    const hoverTextColor = isClientsPage ? '#ffffff' : '#EEE5FF';
    const buttonBg = isClientsPage ? '#000000' : '#7C5AC5';
    const buttonText = isClientsPage ? '#ffffff' : '#EEE5FF';

    CompanyLogo = CompanyLogo['CompanyLogo'];

    return (
        <div className={`fixed top-0 left-1/2 -translate-x-1/2 mt-3 z-50 w-auto h-[50px] flex items-center justify-between
         px-6 ${navBg} rounded-full select-none shadow-md`}>
            
            {showImage && (
                <img
                    src={CompanyLogo} 
                    style={{ height: "60px",width : "60px", objectFit: "cover" }}
                    alt="Company Logo" 
                    className="border rounded-full px-2 py-2 -ml-6 mr-3 transition-opacity duration-300"
                />
            )}

            <div
                ref={containerRef}
                className="flex gap-2 relative"
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="absolute rounded-full transition-all duration-300 ease-out h-[42px] top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        ...getHoverStyle(),
                        backgroundColor: isClientsPage ? '#000000' : '#7C5AC5'
                    }}
                />
                {menuItems.map((item, index) => (
                    <Link
                        key={item}
                        to={item === "CLIENTS" ? "/Clients" : "/" }
                        ref={el => itemRefs.current[index] = el}
                        className="text-lg px-4 -ml-4.5 rounded-full cursor-pointer transition-colors duration-300 relative z-10"
                        style={{
                            color: hoveredIndex === index ? hoverTextColor : defaultTextColor
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <button
                className={`text-lg border rounded-full ml-0 -mx-5.5 px-4 py-2 hover:bg-${navBg} hover:text-${defaultTextColor} transition duration-300 ease-in-out overflow-hidden relative group`}
                style={{
                    backgroundColor: buttonBg,
                    color: buttonText
                }}
            >
                <span className="inline-flex">
                    {'CONTACT'.split('').map((letter, index) => (
                        <span
                            key={index}
                            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-8"
                            style={{ transitionDelay: `${index * 30}ms` }}
                        >
                            {letter}
                        </span>
                    ))}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                    {'CONTACT'.split('').map((letter, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-center transition-transform duration-300 ease-in-out translate-y-9 group-hover:translate-y-0"
                            style={{ transitionDelay: `${index * 30}ms ` }}
                        >
                            {letter}
                        </span>
                    ))}
                </span>
            </button>
        </div>
    );
}
