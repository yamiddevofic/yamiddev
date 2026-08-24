import React from 'react';
import NavigationItems from '../molecules/NavigationItems';
import Link from '../atoms/Link';
import dataNavigationItems from '../../data/NavItems';


const Header: React.FC = () => {

    return (
        <header className="bg-white shadow-md w-full fixed">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-bold text-primary">
                    <h1>Yamid Dev{`</>`}</h1>
                </Link>
                <NavigationItems className="hidden md:flex" items={dataNavigationItems}/>
            </div>
        </header>
    );
}

export default Header;