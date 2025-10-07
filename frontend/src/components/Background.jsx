import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found!");
      return;
    }
    
    console.log("Canvas found, starting rain animation");
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log("Canvas size:", canvas.width, canvas.height);
    };
    
    setCanvasSize();

    const raindrops = [];
    const numDrops = 2; // Increased to 4 for better visibility

    class Raindrop {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.height = 30 + Math.random() * 15;
        this.speed = 4 + Math.random() * 2; // Faster speed
        this.width = 0.1; // Slightly wider
      }

      update() {
        this.y -= this.speed;
        
        if (this.y + this.height < 0) {
          this.reset();
        }
      }

      draw() {
        // Solid color first to test
        ctx.fillStyle = 'rgba(204, 54, 54, 1)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add glow
        ctx.shadowBlur = 1;
        ctx.shadowColor = 'rgba(204, 54, 54, 0.9)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < numDrops; i++) {
      raindrops.push(new Raindrop());
    }

    console.log("Created", numDrops, "raindrops");

    let animationId;
    let frameCount = 0;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      raindrops.forEach(drop => {
        drop.update();
        drop.draw();
      });
      
      frameCount++;
      if (frameCount === 1) {
        console.log("First frame rendered");
      }
      
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
      raindrops.forEach(drop => drop.reset());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      console.log("Cleaning up rain animation");
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9D5FF] via-white via-50%" />
      <div className="absolute bottom-0 h-[1200px] w-full bg-gradient-to-b from-white to-[#D8B4FE]" />
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500 via-white to-neutral-50" />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,  
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1 right-1/9 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      {/* Rain effect canvas - moved higher in z-index */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: 1,
          zIndex: 20
        }}
      />
    </div>
  );
}