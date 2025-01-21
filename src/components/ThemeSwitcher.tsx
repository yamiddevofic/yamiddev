import { useState, useEffect } from 'react';
import Moon from './Moon';
import Sun from './Sun';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isClient, setIsClient] = useState(false); // Para asegurarnos de que estamos en el cliente

  useEffect(() => {
    setIsClient(true); // Marcamos que ya estamos en el cliente
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const root = document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, isClient]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 m-5 rounded-full 
        bg-white dark:bg-gray-800 
        fixed right-5 bottom-5
        transition-transform duration-300 
        hover:scale-110 z-10
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
