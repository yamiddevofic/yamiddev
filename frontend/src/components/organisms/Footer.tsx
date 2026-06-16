import React from 'react';

type FooterProps = {
    year?: number;
    className?: string;
};

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear(), className = '' }) => {
    return (
        <footer className={`py-6 text-sm text-primary w-full ${className}`}>
            <div className="container mx-auto px-4 flex flex-wrap">
                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    &copy; {year}<br />
                    Yamid Dev
                </div>

                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    &copy; {year}<br />
                    Yamid Dev
                </div>

                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    &copy; {year}<br />
                    Yamid Dev
                </div>

                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    &copy; {year}<br />
                    Yamid Dev
                </div>

                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    &copy; {year}<br />
                    Yamid Dev
                </div>
            </div>
        </footer>
    );
};

export default Footer;