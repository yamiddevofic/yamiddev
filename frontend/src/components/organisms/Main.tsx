import React from "react"
import Title from "../atoms/Title";
import Text from "../atoms/Text";
import Content from "../../Layout/Content";
import Footer from "./Footer";

interface Section {
    id: string;
    title: string;
    description: string;
}

interface Footer{
    title: string;
    label: string;
}

interface MainProps {
    sections: Record<string, Section>;
    description: string;
    className?: string;
}

interface FooterProps{
    items: Record<string, Footer>;
}

const Main = ({ sections, className = "", description="" }: MainProps) => {
    return (
        <>
        <main className={`space-y-8 ${className}`}>
            {Object.entries(sections).map(([key, section]) => (
                <section key={key} className={`min-h-screen rounded-[22px] p-0 md:p-8 pt-4 md:pt-16`} id={section.id}>
                    <Title 
                        level="h2" 
                        className="text-center md:text-left bg-primary text-white py-2 px-4 rounded-[22px_22px_0_0] font-sans-2 ">
                        {section.title}
                    </Title>
                    <Content>
                        <Text 
                            className="p-2 font-sans-2">
                            {section.description || "No hay contenido"}
                        </Text>
                    </Content>
                </section>
            ))}
            <Footer />
        </main>
        </>
    );
};

export default Main;
