import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };
  return (
    <main
      id="home"
      className="w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white  dark:bg-[linear-gradient(to_bottom,#121A33_0%,#020617_50%,#121A33_100%)]  p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden"
    >
      <div
        className={`w-full max-w-3xl md:max-w-4xl lg:max-w-5xl text-center space-y-6 md:space-y-8 lg:space-y-10 relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400">
          Yamid Dev Oficial
        </h1>
        
        <p className={`max-w-[70%] text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light mx-auto max-w-2xl lg:max-w-3xl transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Desarrollo experiencias digitales fluidas y modernas. <br />
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 justify-center mt-8 md:mt-10 lg:mt-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="#projects"
            className="px-6 py-3 text-md md:text-lg rounded-full bg-transparent border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-medium hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Descubre mi trabajo 🚀
          </a>
          
          <a
            href="#contact"
            className="px-6 py-3 text-md md:text-lg rounded-full bg-cyan-500 dark:bg-cyan-400 text-white dark:text-gray-900 font-medium hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-cyan-400/20"
          >
            Hablemos de tu proyecto ✨
          </a>
        </div>
      </div>
    </main>
  );
};

export default Hero;