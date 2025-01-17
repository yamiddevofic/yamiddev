import React from 'react';
import Menu from './Menu';

interface HeaderProps {
    toggleMenu: () => void;
    isVisible: boolean;
    setIsVisible: Function;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, isVisible, setIsVisible }) => {
    return (
        <header className="w-full mb-4 max-w-screen-2xl mx-auto px-6 pt-4">
            <div className="flex items-center justify-between bg-[#1a1f35] dark:bg-white rounded-lg shadow-none dark:shadow-sm border border-[#2a2f45] dark:border-gray-200 p-4 w-ful transition-all duration-300 ease-in-outl">
                <Menu toggleMenu={toggleMenu} setIsVisible={setIsVisible} isVisible={isVisible} />
                <h1 className="w-full ml-4 text-[1.2rem] font-semibold text-[#00ff66] dark:text-gray-800 text-right" style={{ fontFamily: 'Fira Code' }}>
                    PORTFOLIO | YAMID DEV
                </h1>
            </div>
        </header>
    );
};

export default Header;
