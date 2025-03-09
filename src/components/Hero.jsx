import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center text-gray-900 dark:text-white p-4 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
      
      {/* Enhanced background effect for larger screens */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(0,210,255,0.2)_0%,_rgba(0,0,0,0)_60%)]"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cyan-500 dark:bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 12px 2px rgba(0, 210, 255, 0.3)',
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`
            }}
          />
        ))}
      </div>
      
      <div
        className={`w-full max-w-4xl lg:max-w-5xl text-center space-y-8 md:space-y-10 lg:space-y-12 relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400">
          Yamid Dev
        </h1>
        
        <p className={`text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light mx-auto max-w-3xl lg:max-w-4xl transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <span className="font-mono text-cyan-600 dark:text-cyan-400">{`</>`}</span> Full-Stack Developer & Creador de Contenido
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-5 md:gap-6 lg:gap-8 justify-center mt-10 md:mt-12 lg:mt-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          <a
            href="#projects"
            className="px-8 py-4 text-lg md:text-xl rounded-full bg-transparent border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-medium hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Ver mi trabajo
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 text-lg md:text-xl rounded-full bg-cyan-500 dark:bg-cyan-400 text-white dark:text-gray-900 font-medium hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-cyan-400/20"
          >
            Contáctame
          </a>
        </div>
      </div>

      {/* Enhanced accent lines for large screens */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent opacity-30"></div>
      <div className="absolute -bottom-8 left-0 w-full h-16 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
      
      {/* Side accents visible only on large screens */}
      <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
    </main>
  );
};

export default Hero;