import React from 'react';

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'block' : 'hidden'
            } bg-gray-800 p-4 box-border`}
        >
            {/* Sidebar content goes here */}
            <h2 className="text-white">Sidebar Content</h2>
        </div>
    );
};

export default SideBar;
