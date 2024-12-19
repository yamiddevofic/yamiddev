import React from 'react';
import Group from '../2. molecules/Group';
import Btn from '../1. atoms/Btn';
import icono from '../../assets/yamid-tech.png'
import { FiMenu } from "react-icons/fi";

const Header: React.FC = () => {
    return (
        <header className='display flex justify-between h-16 mb-2 bg-gray-800 text-white rounded-xl'>
            <Btn icon={FiMenu} label="" onClick={() => console.log('Abriste el menú')} className='p-4 hover:border-2 hover:border-white hover:border-solid hover:bg-white hover:text-black' />
            <Group
                image={icono}
                text="Yamid Dev"
                alt="Imagen de bienvenida"
                width="50"
                height="50"
                className='flex items-center p-2'
                classNameImg="rounded-full"
                classNameParagraph="text-center"
            />
        </header>
    );
};

export default Header;