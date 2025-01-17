import React, { useState } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import ThemeSwitcher from './ThemeSwitcher'

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
        setIsVisible(prevState => !prevState);
    };

    return (
        <div className="h-full bg-[#0f1729] dark:bg-gray-100 min-h-screen overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
            <ThemeSwitcher />
            {/* Header con el botón para abrir/cerrar el menú */}
            <Header toggleMenu={toggleMenu} isVisible={isVisible} setIsVisible={setIsVisible} />

            {/* Layout principal */}
            <main
                className={`flex-grow grid grid-cols-1 md:grid-cols-${isOpen ? '[25%_34%_1fr]' : '[25%_1fr]' } gap-0 md:gap-4 mb-4 overflow-hidden w-full max-w-screen-2xl mx-auto px-6 transition-all duration-300`}
            >
                {/* Sidebar */}
                {isVisible ? <SideBar isOpen={isOpen} setIsVisible={setIsVisible} isVisible={isVisible} setIsOpen={setIsOpen} /> : null}
                
                {/* Contenido Principal */}
                <div className="overflow-y-auto bg-[#1a1f35] dark:bg-white rounded-lg shadow-none dark:shadow-sm border border-[#2a2f45] dark:border-gray-200 p-4 col-span-3 md:mt-0 md:col-span-2 h-full transition-all duration-300 ease-in-out custom-scroll">
                    <div id="title" className="grid grid-rows-[5%_auto_20%] p-4">
                        <h2 className="text-xl font-semibold text-[#00ff66] dark:text-gray-800" style={{ fontFamily: 'Fira Code' }}>
                            Hola
                        </h2>
                        <div className="flex flex-col space-y-2">
                            {[...Array(20)].map((_, i) => (
                                <p className="text-gray-300 dark:text-black" style={{ fontFamily: 'Open Sans' }} key={i}>Hola mundo</p>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
