import React from 'react';

interface TextProps {
  children: string;
  className?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function getColor(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  switch (level) {
    case 'h1':
      return 'text-3xl color-primary';
    case 'h2':
      return 'text-2xl color-secondary';
    case 'h3':
      return 'text-xl color-foreground';
    case 'h4':
      return 'text-lg color-foreground';
    case 'h5':
      return 'text-md color-foreground';
    case 'h6':
      return 'text-sm color-foreground';
    default:
      return 'text-base color-foreground';
  }
}

const Title: React.FC<TextProps> = ({ children, className = '', level = 'h1' }) => {
  const Tag = level;
  return (
    <Tag className={`font-bold ${getColor(Tag)}  ${className}`}>
      {children}
    </Tag>
  );
}

export default Title;