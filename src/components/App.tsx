import React,{useState} from 'react';
import SideBar from "./SideBar";
import Header from './Header';


const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="h-full bg-[#0f1729] dark:bg-gray-100 min-h-screen overflow-hidden flex flex-col items-center justify-center">
            
            <Header toggleMenu={toggleMenu} />

            <main
                className={`flex-grow grid grid-cols-1 ${isOpen ? 'md:grid-cols-[25%_34%_1fr]' : 'md:grid-cols-[25%_1fr]'} gap-0 md:gap-4 mb-4 overflow-hidden w-full max-w-screen-2xl max-h-screen-lg mx-auto px-6`}
            >
                <SideBar isOpen={isOpen} />

                <div className="overflow-y-auto bg-[#1a1f35] dark:bg-white rounded-lg shadow-none dark:shadow-sm border border-[#2a2f45] dark:border-gray-200 p-4 col-span-3 mt-4 md:mt-0 md:col-span-2 h-[100%]">	
                    <div id="title" className="grid grid-rows-[5%_auto_20%] p-4">
                        <h2 className="text-lg font-semibold text-[#00ff66] dark:text-gray-800">
                            <slot name="title" />
                        </h2>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;