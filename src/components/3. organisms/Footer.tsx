import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center mt-4">
            <div>
                <p>&copy; {new Date().getFullYear()} Yamid Dev. All rights reserved.</p>
                <nav>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};


export default Footer;