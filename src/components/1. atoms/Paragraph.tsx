import React from 'react';

interface ParagraphProps {
    text: string | undefined;
    className?: string | undefined;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className}) => {
    return <p className={className}>{text}</p>;
};

export default Paragraph;