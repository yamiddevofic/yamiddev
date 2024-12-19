import React from 'react';

interface ImageProps {
  src: string | undefined;
  alt: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  className?: string | undefined;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Image;
