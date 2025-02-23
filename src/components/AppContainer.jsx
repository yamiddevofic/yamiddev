import React from 'react';

const AppContainer = ({ children, style = {} }) => {
  const containerStyle = {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto 1fr',
    ...style,
  };

  const contentStyle = {
    gridColumn: '2 / -1',
    gridRow: '2 / -1',
    height: 'auto',
    overflowY: 'auto',  
    /* Oculta el scrollbar */
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE y Edge
  };

  return (
    <div className="bg-none text-white  h-screen">
      <div className="custom-scrollbar" style={containerStyle}>
        <div style={contentStyle} className="hide-scrollbar ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
