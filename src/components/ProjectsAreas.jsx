import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { AnimatePresence, motion } from 'framer-motion';
import AreaButton from './AreaButton';

function ProjectsAreas() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inMainSelected, setInMainSelected] = useState(false);

  const handleMainSelectedChange = (value) => {
    console.log(inMainSelected)
    setInMainSelected(value);
  };

  const Projects = [
    {
      title: 'Gestor de Tareas',
      description: 'Aplicación web para gestionar tareas con funcionalidades colaborativas y notificaciones en tiempo real.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      image: '/images/gestor-tareas.webp'
    },
    {
      title: 'Plataforma E-commerce',
      description: 'Tienda online con integración de pagos, gestión de inventario y seguimiento de pedidos.',
      techStack: ['Next.js', 'Stripe', 'Firebase'],
      image: 'https://www.inesdi.com/sites/default/files/inline-images/consejos-para-crear-un-ecommerce-de-exito-en-7-pasos.jpeg'
    },
    {
      title: 'Dashboard Analítico',
      description: 'Panel interactivo para visualizar datos y métricas en tiempo real con gráficos dinámicos.',
      techStack: ['Vue.js', 'D3.js', 'Express.js'],
      image: 'https://images.klipfolio.com/website/public/7eab5172-6fe0-4304-9e9d-4750646a9791/powermetrics-dashboard_0.png'
    },
    {
      title: 'App Móvil de Salud',
      description: 'Aplicación para el seguimiento de la salud y actividades físicas, con integración a dispositivos wearables.',
      techStack: ['React Native', 'Redux', 'Firebase'],
      image: 'https://static.k-tuin.com/media/blog/app-salud-para-iphone_1.png'
    },
    {
      title: 'Red Social',
      description: 'Plataforma para conectar personas con intereses comunes, ofreciendo mensajería segura y feeds personalizados.',
      techStack: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'https://ahoraeg.com/listas/wp-content/uploads/2025/02/Redes-sociales-%E2%80%93-Que-son-tipos-usos-ventajas-y-riesgos.webp'
    },
    {
      title: 'Sitio Web Portafolio',
      description: 'Sitio personal para exhibir proyectos y habilidades, con diseño moderno y responsive.',
      techStack: ['Astro', 'TailwindCSS', 'React'],
      image: 'https://www.hostinger.es/tutoriales/wp-content/uploads/sites/7/2023/04/image-13.png'
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AppContainer>
      {selectedIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]  p-0 md:p-4">
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
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:flex-row gap-6 items-start min-h-[600px] mt-5 p-4" style={{borderRadius: '10px'}}>
          {/* Tarjetas del lado izquierdo */}
          <div className="bg-blue-800 p-2 w-full lg:w-[100%] grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar scrollbar-left row-start-1 row-end-2">
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
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
          
          {/* Tarjeta seleccionada del lado derecho */}
          <div className={`w-full lg:w-[100%] bg-red-800 p-2 row-start-3 row-end-4 md:row-start-1 md:row-end-2`}>
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
                  onMainSelectedChange={handleMainSelectedChange} // Pasamos la función
                  onClose={() => {
                    setSelectedIndex(null);
                    setInMainSelected(true); // Se desactiva al cerrar
                  }}
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