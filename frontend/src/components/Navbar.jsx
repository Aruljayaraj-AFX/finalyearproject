import mail from "../assets/mail.svg"
import {useEffect,useState,useRef} from 'react';

export default function Navbar(CompanyLogo){
    const [showImage,setImage]=useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const itemRefs = useRef([]);
    const containerRef = useRef(null);
    
    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY>100){
                setImage(true);
            }
            else{
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

    console.log(CompanyLogo)

    return(
        <div className="fixed top-0 left-1/2  -translate-x-1/2 mt-4 z-50 w-auto h-[60px] flex  items-center justify-between
         px-6 bg-[#EEE5FF] rounded-full select-none shadow-md">
          {showImage &&(<img 
          src={CompanyLogo} 
          style={{ height: "60px", objectFit: "cover" }}
          alt="Company Logo" 
          className="border rounded-full px-4 -ml-5 mr-3 py-4 transition-opacity duration-300"
        />)}
          
          <div 
            ref={containerRef}
            className="flex gap-2 relative"
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="absolute bg-[#7C5AC5]  rounded-full transition-all duration-300 ease-out h-[42px] top-1/2 -translate-y-1/2 pointer-events-none"
              style={getHoverStyle()}
            />
            {menuItems.map((item, index) => (
              <h1 
                key={item}
                ref={el => itemRefs.current[index] = el}
                className="text-xl px-4 -ml-3 rounded-full cursor-pointer transition-colors duration-300 relative z-10"
                style={{
                  color: hoveredIndex === index ? '#EEE5FF' : '#7C5AC5'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item}
              </h1>
            ))}
          </div>

          <button className="text-xl text-[#EEE5FF] ml-0 border rounded-full -mx-5 bg-[#7C5AC5] px-4 py-2.5 hover:bg-[#EEE5FF]
          hover:text-[#7C5AC5] transition duration-300 ease-in-out overflow-hidden relative group">
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
                  style={{ transitionDelay: `${index * 30}ms `}}
                >
                  {letter}
                </span>
              ))}
            </span>
          </button>
        </div>
    );
}