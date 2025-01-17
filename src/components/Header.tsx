import React from 'react';
import Menu from './Menu';

interface HeaderProps {
    toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
    return (
        <header className="w-full mb-4 max-w-screen-2xl mx-auto px-6 pt-4">
            <div className="flex items-center justify-between bg-[#1a1f35] dark:bg-white rounded-lg shadow-none dark:shadow-sm border border-[#2a2f45] dark:border-gray-200 p-4 w-full">
                <Menu toggleMenu={toggleMenu} />  
                <h1 className="w-full ml-4 text-lg font-semibold text-[#00ff66] dark:text-gray-800 text-right" style={{ fontFamily: 'Fira Code' }}>
                    YAMID DEV
                </h1>
            </div>
        </header>
    );
};

export default Header;
