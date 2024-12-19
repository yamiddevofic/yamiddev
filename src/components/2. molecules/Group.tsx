import React from 'react';
import Image from '../1. atoms/Image';
import Paragraph from '../1. atoms/Paragraph';

const Group: React.FC = () => {
    return (
        <div className="group">
            <Image src={src} 
            alt={alt} 
            width={width} 
            height={height} 
            className={className} ></Image>
            <Paragraph></Paragraph>
        </div>
    );
};

export default Group;