import React from 'react';
import Title from '../1. atoms/Title';
import Paragraph from '../1. atoms/Paragraph';

const HomePage: React.FC = () => {
    return (
        <div className="p-4 w-full h-full flex flex-col justify-center items-center bg-gray-200 rounded-xl">
            <Title level={2}>
                Hola, soy Yamid
            </Title>
            <Paragraph text="Este es un proyecto de prueba para mostrar mis habilidades en desarrollo web" className="text-lg" />
        </div>
    );
};

export default HomePage;