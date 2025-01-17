import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTools, faFolderOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ isOpen, setIsVisible, isVisible, setIsOpen }: { isOpen: boolean, setIsVisible: Function, isVisible: boolean, setIsOpen: Function }) => {
    
    
    return (
        <div
            onMouseLeave={() => {
                setIsVisible(false)
                setIsOpen(false)
            }}
            onMouseEnter={() => {
                setIsVisible(true)
                setIsOpen(true)
            }}
            className={`flex flex-col md:none border border-[2px] border-[#2a2f45] dark:border-gray-200 absolute bottom-0 left-0 md:relative w-[70%] h-[100%] md:h-full md:w-full p-4 transition-all duration-300 ease-in-out ${
                isOpen ? 'block' : 'hidden'
            } bg-[#1a1f35] w-auto dark:bg-gray-50 p-4 box-border rounded-lg md:rounded-lg shadow-lg`}
        >
            <h2 className="text-[#00ff66] dark:text-gray-800 text-center text-2xl mt-4 font-bold tracking-wide" style={{ fontFamily: 'Fira Code' }}>Menú</h2>
            <ul className="grid w-full text-gray-300 dark:text-black h-full space-y-3" style={{ fontFamily: 'Fira Code' }}>
                <style>
                    {`
                        li {
                            cursor: pointer;
                            width: auto;
                            padding: 12px 16px;
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            font-size: 1.1rem;
                            border: 1px solid #2a2f45;
                            border-radius: 8px;
                            background-color: transparent;
                            transition: transform 0.2s ease, background-color 0.3s ease;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                        }
                        .dark li {
                            border: 1px solid #e2e2e2;
                        }
                        li:hover {
                            background-color: #00ff66;
                            color: #1a1f35;
                            transform: translateY(-3px);
                        }
                        .dark li:hover {
                            background-color: #e2e2e2;
                            color: #1a1f35;
                        }
                        span {
                            font-size: 1.4rem;
                        }
                    `}
                </style>
                <li className="text-[1.3rem] md:text-[1.2rem]">
                    <FontAwesomeIcon icon={faUser} /> Sobre mí
                </li>
                <li className="text-[1.3rem] md:text-[1.2rem]">
                    <FontAwesomeIcon icon={faTools} /> Tecnologías
                </li>
                <li className="text-[1.3rem] md:text-[1.2rem]">
                    <FontAwesomeIcon icon={faFolderOpen} /> Proyectos
                </li>
                <li className="text-[1.3rem] md:text-[1.2rem]">
                    <FontAwesomeIcon icon={faEnvelope} /> Contacto
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
