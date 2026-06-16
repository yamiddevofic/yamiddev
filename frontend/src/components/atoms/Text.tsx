import React from 'react';

interface TextProps {
    children: React.ReactNode;
    className: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => {
    return (
        <p className={`text-foreground ${className}`}>
            {children}
        </p>
    );
}

export default Text;