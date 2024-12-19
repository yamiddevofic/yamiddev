import React from 'react';

interface TitleProps {
    children ?: string;
    level ?: number;
    className ?: string;
}

const Title: React.FC<TitleProps> = ({ children, level = 1, className = '' }) => {
  // Forzamos level a estar entre 1 y 6
  const headingLevel = Math.min(Math.max(level, 1), 6) as 1|2|3|4|5|6;
  const Tag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  // Definimos un tipo para el mapa. Así TypeScript sabe qué keys existen y qué devuelven.
  const fontSizeMap: Record<1|2|3|4|5|6, string> = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-medium',
    6: 'text-base font-medium'
  };

  const fontSizeClass = fontSizeMap[headingLevel];

  return <Tag className={`${fontSizeClass} ${className}`}>{children}</Tag>;
};
export default Title;