import React from "react";
import Header from "../3. organisms/Header";
import Footer from "../3. organisms/Footer";

interface SectionProps {
    children ?: React.ReactNode;
}

const Layout: React.FC<SectionProps> = ({ children }) => {
    return (
        <div className="h-screen">
            <div className="p-4">
                <Header />
            </div>
            <div className="pt-2 pb-6 pr-6 pl-6 h-full">
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;