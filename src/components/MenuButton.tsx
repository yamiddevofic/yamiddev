// MenuButton.tsx
import React from 'react';
import { FiMenu } from 'react-icons/fi';

const MenuButton = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {

    return (
        <div className="relative">
            <button
                className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onToggle}
            >
                <FiMenu className="h-6 w-6" />
            </button>
        </div>
    );
};

export default MenuButton;
