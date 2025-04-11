import React, { useState } from 'react';
import { 
  SiJavascript, 
  SiReact, 
  SiAstro, 
  SiTailwindcss, 
  SiPython, 
  SiSqlite, 
  SiMysql 
} from 'react-icons/si';

const Icon = ({ IconComponent, text, customColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const color = (isHovered || isActive) ? customColor : '#6B7280';

  return (
    <div 
      className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-600/30 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false);}}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
    >
      <div className="w-12 h-12 transition-colors duration-200">
        <IconComponent 
          className="w-full h-full transition-colors duration-200"
          color={color}
        />
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {text}
      </span>
    </div>
  );
};

const Tecnologias = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col col-start-1 col-end-4 md:col-start-2 md:col-end-4 row-start-2 row-end-3 md:row-start-1 md:row-end-2 max-w-md mx-auto md:max-w-none md:mx-0">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-[#39FF14] mb-4">Tecnologías</h2>
      <div className="flex flex-wrap justify-center gap-4 items-center my-4">
        <Icon 
          IconComponent={SiJavascript} 
          text="JavaScript" 
          customColor="#F2CF1D" 
        />
        <Icon 
          IconComponent={SiReact} 
          text="ReactJS" 
          customColor="#15A0BF" 
        />
        <Icon 
          IconComponent={SiAstro} 
          text="AstroJS" 
          customColor="#9C2DFA" 
        />
        <Icon 
          IconComponent={SiTailwindcss} 
          text="TailwindCSS" 
          customColor="#1DCBF2" 
        />
        <Icon 
          IconComponent={SiPython} 
          text="Python" 
          customColor="#387CA6" 
        />
        <Icon 
          IconComponent={SiSqlite} 
          text="SQLite" 
          customColor="#148DD9" 
        />
        <Icon 
          IconComponent={SiMysql} 
          text="MySQL" 
          customColor="#D97904" 
        />
      </div>
    </div>
  );
};

export default Tecnologias;
