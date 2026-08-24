import React from 'react';
import footerData from '../../data/Footer';

type FooterProps = {
    year?: number;
    className?: string;
};

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear(), className = '' }) => {
    return (
        <footer className={`py-6 text-sm text-primary w-full ${className}`}>
            <div className="container mx-auto px-4 flex flex-wrap">
                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    <span dangerouslySetInnerHTML={{ __html: footerData[0].title }} /><br />
                    <span dangerouslySetInnerHTML={{ __html: footerData[0].label }} />
                </div>
                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    <span dangerouslySetInnerHTML={{ __html: footerData[1].title }} /><br />
                    <span dangerouslySetInnerHTML={{ __html: footerData[1].label }} />
                </div>
                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    <span dangerouslySetInnerHTML={{ __html: footerData[2].title }} /><br />
                    <span dangerouslySetInnerHTML={{ __html: footerData[2].label }} />
                </div>
                <div className="basis-1/2 md:flex-1 mb-2 md:mb-0">
                    <span dangerouslySetInnerHTML={{ __html: footerData[3].title }} /><br />
                    <span dangerouslySetInnerHTML={{ __html: footerData[3].label }} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;