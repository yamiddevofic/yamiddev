import React from "react";
import Link from "../atoms/Link";

interface NavigationItemsProps {
    items: { label: string; href: string, primary: boolean }[];
    className?: string;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ items, className = '' }) => {
    return (
        <ul className={`flex space-x-4 ${className}`}>
            {items.map((item, index) => (
                <li key={index}>
                    <Link href={item.href} className="hover:text-primary" {...(item.primary && { className: 'bg-primary text-white hover:bg-primary-dark p-2 rounded-full' })}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NavigationItems;