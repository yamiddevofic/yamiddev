import React from 'react';
import Image from '../1. atoms/Image';
import Paragraph from '../1. atoms/Paragraph';
import logo from '../../assets/yamid-tech.png'

const Group: React.FC = () => {
  return (
    <div className="group">
      <Image src={logo}
        alt="logo yamid tech"
        width="100"
        height="100"
        className="logo" />
      <Paragraph
        text="Yamid Dev"
      />
    </div>
  );
};

export default Group;
