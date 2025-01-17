import React, { useState } from 'react';
import MenuButton from './MenuButton';

interface MenuProps {
    toggleMenu: () => void;
    setIsVisible: Function;
    isVisible: boolean;
}

const Menu: React.FC<MenuProps> = ({ toggleMenu, setIsVisible, isVisible }) => {

    const handleToggle = () => {
        toggleMenu();  // Llamamos a toggleMenu cuando se hace clic en el botón.
    };

    return (
        <div>
            <MenuButton  onToggle={handleToggle} isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
};

export default Menu;
