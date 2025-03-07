import { SiWhatsapp } from "react-icons/si";

function WhatsApp() {
  return (
    <a href="https://wa.me/573124673850?text=Hola%20Yamid,%20estoy%20interesado%20en%20tu%20trabajo" target="_blank" rel="noopener noreferrer"
    className="bg-green-500 fixed bottom-14 p-3 right-8 text-white font-semibold text-[1.3rem] rounded-full shadow-lg w-auto h-auto flex items-center justify-center hover:shadow-xl transition-shadow duration-200 border border-green z-10 hover:animate-grow"
    title="Haz clic para contactarme por WhatsApp">
      <SiWhatsapp className="text-3xl" />
    </a>
  );
}

export default WhatsApp;
