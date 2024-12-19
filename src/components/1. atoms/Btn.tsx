import React from 'react';

interface BtnMenuProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const Btn: React.FC<BtnMenuProps> = ({ label, onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            {label}
        </button>
    );
};

export default Btn;