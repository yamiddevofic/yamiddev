import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { AnimatePresence, motion } from 'framer-motion';
import AreaButton from './AreaButton';
import { Projects } from '../lib/projectData';
function ProjectsAreas() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inMainSelected, setInMainSelected] = useState(false);
  const [stateChild, setStateChild] = useState(false);
  

  const handleMainSelectedChange = (value) => {
    setInMainSelected(value);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AppContainer>
      {selectedIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px] p-0 md:p-4">
          <AnimatePresence>
            {Projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layoutId={`card-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <AreaButton
                  project={project}
                  index={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setInMainSelected(true);
                  }}
                  onMainSelectedChange={handleMainSelectedChange} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:flex-row gap-6 items-start min-h-[600px]" style={{borderRadius: '10px'}}>
          {/* Tarjetas del lado izquierdo */}
          <div className={`${stateChild ? 'grid' : 'hidden md:grid '} p-2 w-full lg:w-[100%] grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar scrollbar-left row-start-1 row-end-2`}>
            <AnimatePresence>
              {Projects.map((project, index) =>
                index !== selectedIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    layoutId={`card-${index}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <AreaButton
                      project={project}
                      index={index}
                      onClick={() => {
                        setSelectedIndex(index);
                        setInMainSelected(true);
                      }}
                      isSideItem
                      onMainSelectedChange={handleMainSelectedChange} 
                      changeState = {setStateChild}
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
          
          {/* Tarjeta seleccionada del lado derecho */}
          <div className={`w-full lg:w-[100%] ${stateChild ? 'bg-none' : 'row-start-1 row-end-2 md:row-start-1 md:row-end-4'} p-2`}>
            <AnimatePresence>
              <motion.div
                key={selectedIndex}
                layoutId={`card-${selectedIndex}`}
                initial={{ x: 100, borderRadius: 12 }}
                animate={{ x: 0 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ layout: { duration: 0.5 }, x: { duration: 0.2 }}}
                className="h-full"
              >
                <AreaButton
                  project={Projects[selectedIndex]}
                  index={selectedIndex}
                  isMainSelected={inMainSelected}
                  onMainSelectedChange={handleMainSelectedChange}
                  onClose={() => {
                    setSelectedIndex(null);
                    setInMainSelected(true);
                  }}
                  changeState = {setStateChild}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </AppContainer>
  );
}

export default ProjectsAreas;