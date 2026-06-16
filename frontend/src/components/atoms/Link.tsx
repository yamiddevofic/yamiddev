import react from 'react';

interface linkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const Link: React.FC<linkProps> = ({ href, children, className = '', ...props }) => {
    return (
        <a href={href}
            className={`text-primary hover:underline text-md ${className}`}
            {...props}  
        >
            {children}
        </a>
    );
}

export default Link;