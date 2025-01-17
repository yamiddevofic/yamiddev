// MenuButton.tsx
import React from 'react';
import { FiMenu } from 'react-icons/fi';

const MenuButton = ({ onToggle, isVisible, setIsVisible }: {  onToggle: () => void, isVisible: boolean, setIsVisible: Function }) => {

    return (
        <div className="relative">
            <button
                className={`flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 ${isVisible ? 'bg-gray-100 text-gray-500' : 'focus:outline-none'}`}
                onMouseEnter={onToggle}
            >
                <FiMenu className="h-6 w-6" />
            </button>
        </div>
    );
};

export default MenuButton;
