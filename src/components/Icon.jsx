
import React from 'react';

const Icon = ({ IconComponent, text, color, grade, customColor }) => {
    const  colorClass = grade ? `text-${color}-${grade}` : `text-${color}`;
    return (
        <div class="flex flex-col items-center mx-[2%]">
            <IconComponent 
            style={customColor ? {color: customColor } : {} } 
            className={`${!customColor ? colorClass : ''} w-12 h-12`}/>
            <p class="mt-2 text-gray-700 dark:text-gray-300">{text}</p>
        </div>
    );
}

export default Icon;