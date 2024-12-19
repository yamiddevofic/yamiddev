import React from 'react';
import { IconType } from 'react-icons'; // Importa el tipo correcto

interface BtnMenuProps {
    icon: IconType;
    label: string;
    onClick: () => void;
    className?: string;
}

const Btn: React.FC<BtnMenuProps> = ({ icon: Icon, label, onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            <Icon className="h-6 w-6"/>
            {label}
        </button>
    );
};

export default Btn;