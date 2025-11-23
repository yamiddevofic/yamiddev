import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  icon?: IconComp;
  isMain?: boolean;   // true = borde/overlay; false = fondo azul
  isLink?: boolean;   // navegación normal en lugar de scroll interno
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  icon: Icon,
  isMain = true,
  isLink = false,
  className = "",
  ...rest
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (isLink) return;
    e.preventDefault();
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.a
      href={isLink ? href : `#${href}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={clsx(
        "group relative flex w-[100%] md:w-auto items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 overflow-hidden ", // ⬅️ overflow-hidden
        isMain
          ? "border-2 border-blue-600 bg-transparent text-blue-600"
          : "bg-blue-600 text-white",
        className
      )}
      {...rest}
    >
      {/* overlay animado solo cuando isMain === true */}
      {isMain && (
        <span
          aria-hidden="true"
          className="
            absolute inset-0 bg-blue-600
            origin-left
            scale-x-0
            transition-transform duration-300 ease-out
            group-hover:scale-x-100
          "
        />
      )}

      {/* texto */}
      <span className="relative z-10 whitespace-nowrap group-hover:text-white text-[1rem] xs:text-[1.1rem] ls:text-[1.14rem] ms:text-[1.2rem] ss:text-[1.2rem] s:text-[1.2rem] sm:text-[1.2rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.5rem]">{children}</span> 

      {/* ícono */}
      {Icon && (
        <span className="relative z-10">
          <Icon className="size-6 shrink-0 group-hover:text-white" aria-hidden="true" />
        </span>
      )}
    </motion.a>
  );
};
