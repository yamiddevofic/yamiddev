import React, { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Title } from "../atoms/Title";
import { Text } from "../atoms/Text";
import { Button } from "../molecules/Buttons";

type MyComponentProps = {
  children: ReactNode;
  isHome?: boolean;
};

const Hero : React.FC<MyComponentProps> = ({ children , isHome = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.main
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
       className={`relative overflow-hidden z-0
    bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#0e1335] dark:to-[#030617]
    p-8 sm:p-12 lg:p-16 
    w-full flex flex-col items-center justify-center text-gray-900 dark:text-white 
    ${isHome ? "min-h-[85vh]" : "xs:min-h-[85vh] min-h-[88vh]"}
    mb-[-0px]`}
    >
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 opacity-20 dark:opacity-1 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] animate-gradient-pan"></div>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl text-center space-y-8 md:space-y-10 lg:space-y-12 relative z-10"
      >
        <Title>
            {children}
        </Title>
        <Text isHome={isHome}>
          Desarrollo experiencias digitales <span className="font-bold">fluidas</span> y <span className="font-bold">modernas</span>
        </Text>
        

        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center sm:flex-row gap-4 md:gap-6 lg:gap-8 justify-center mt-10"
        >
        {isHome && (
          <>
          <Button icon={'🚀'} href="projects" isMain={true}>Descubre mi trabajo</Button>
          <Button icon={'✨'} href="contact" isMain={false}>Contáctame</Button>
          </>
        )}
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default Hero;