import React, { useState } from 'react';
import MenuButton from './MenuButton';

interface MenuProps {
    toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ toggleMenu }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(prevState => !prevState);
        toggleMenu();  // Llamamos a toggleMenu cuando se hace clic en el botón.
    };

    return (
        <div>
            <MenuButton isOpen={isOpen} onToggle={handleToggle} />
        </div>
    );
};

export default Menu;
