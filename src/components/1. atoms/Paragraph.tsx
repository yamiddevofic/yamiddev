import React from 'react';

interface ParagraphProps {
    text: string;
    className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className}) => {
    return <p className={className}>{text}</p>;
};

export default Paragraph;