import { useState, useEffect } from 'react';
import Moon from './Moon';
import Sun from './Sun';

const ThemeSwitcher = () => {
  // Empezamos con un valor seguro, y luego lo sincronizamos
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Leer localStorage cuando monte en el cliente:
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Cada vez que cambie theme, actualizamos DOM + localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // El toggle
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
        onClick={toggleTheme}
        className="
            p-3 m-5 rounded-full
            bg-white dark:bg-gray-800
            absolute right-0 bottom-0 
            /* Clases de animación en Tailwind */
            transition-transform duration-300 
            hover:scale-110 z-[1]
        "
        >
        {theme === 'dark' ? <Moon /> : <Sun/>}
    </button>

  );
};

export default ThemeSwitcher;
