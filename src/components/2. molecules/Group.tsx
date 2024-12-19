import React from 'react';
import Image from '../1. atoms/Image';
import Paragraph from '../1. atoms/Paragraph';


interface GroupProps {
    image ?: string;
    text ?: string;
    alt ?: string;
    width ?: string;
    height ?: string;
    classNameImg ?: string;
    classNameParagraph ?: string;
    className ?: string;
}

const Group: React.FC<GroupProps> = ({image, text, alt, width, height, classNameImg, classNameParagraph, className}) => {
  return (
    <div className={className}>
      <Image src={image}
        alt={alt}
        width={width}
        height={height}
        className={classNameImg} />
      <Paragraph
        text={text}
        className={classNameParagraph}
      />
    </div>
  );
};

export default Group;
