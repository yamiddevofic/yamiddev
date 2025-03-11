import React, { useState, useEffect } from "react";

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
  };

  return (
    <main
      id="home"
      className="w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white bg-white dark:bg-[linear-gradient(to_top,#0e1335_0%,#030617_50%,#0e1335_100%)]  p-8 sm:p-12 lg:p-16 relative overflow-hidden"
    >
      <div
        className={`w-full max-w-3xl md:max-w-4xl lg:max-w-5xl text-center space-y-6 md:space-y-10 lg:space-y-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Título más grande y llamativo */}
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400">
          Yamid Dev Oficial
        </h1>

        {/* Párrafo con mejor alineación */}
        <p
          className={`w-full max-w-2xl lg:max-w-3xl text-[clamp(1rem,2vw,1.5rem)] text-gray-700 dark:text-gray-300 font-light mx-auto transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Desarrollo experiencias digitales fluidas y modernas.
        </p>

        {/* Botones con tamaño uniforme */}
        <div
          className={`flex flex-col items-center sm:flex-row gap-4 md:gap-6 lg:gap-8 justify-center mt-6 md:mt-10 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="#projects"
            className="px-3 py-3 text-lg rounded-full bg-transparent border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 w-[85%] md:w-[90%] lg:w-auto text-center"
            onClick={(e) => handleLinkClick(e, "projects")}
          >
            Descubre mi trabajo 🚀
          </a>

          <a
            href="#contact"
            className="px-3 py-3 text-lg rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 w-[85%] md:w-[90%] lg:w-auto text-center"
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            Hablemos de tu proyecto ✨
          </a>
        </div>
      </div>
    </main>
  );
};

export default Hero;
