import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";

const Icon = ({ name, size }: { name: string; size?: string }) => {
  const icons: { [key: string]: React.ReactNode } = {
    sun: (
        <AiOutlineSun size={size} />
    ),
    moon: (
        <AiOutlineMoon size={size} />
    ),
  };

  return icons[name] || null;
};

export default Icon;