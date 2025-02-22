import React from 'react';

const AreaButton = ({ project, isMainSelected, isSideItem, onClick, onClose, onMainSelectedChange, changeState }) => {
  return (
    <div
      onClick={() => {
        onClick();
        if (onMainSelectedChange) {
          onMainSelectedChange(true); // Avisamos al padre que está seleccionado
          changeState(prev => !prev)
        }
      }}
      className={`
        group relative w-auto transform transition-all duration-300 rounded-xl shadow-md overflow-hidden
        ${isSideItem ? 'opacity-80 hover:opacity-100' : ''}
        ${isMainSelected ? 'h-[100vh] w-[100%]' : 'h-80 hover:h-96 cursor-pointer'}
        bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700
      `}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {isMainSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-gray-700 dark:text-gray-200 text-lg font-medium leading-none">{'<'}</span>
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between p-4">
          <div>
            <h2 className="font-semibold text-[1.5rem] text-gray-800 dark:text-gray-200">{project.title}</h2>
            <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-gray-600 dark:text-gray-300  bg-gray-100 dark:bg-gray-700 rounded-full">
              {project.time}
            </span>
          </div>
        </div>

        <p className={`px-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3
          ${isMainSelected ? 'line-clamp-none flex' : 'hidden group-hover:line-clamp-none'}
          transition-all duration-300
        `}>
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default AreaButton;