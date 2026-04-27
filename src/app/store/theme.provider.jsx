import { createContext, useState, useMemo, useLayoutEffect } from 'react';

/** Создаем контекст */
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Создаем провайдер, он будет принимать чилдрены.
 * в useLayoutEffect устанавливаем нужное значение в localStorage
 * и устанавливаем класс в html тэг.
 *
 */
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  /**
   * (см. документацию useLayoutEffect {@link https://react.dev/reference/react/useLayoutEffect})
   */
  useLayoutEffect(() => {
    // Тут root это тэг <html
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // В React 19 необязательно писать <Context.Provider>
  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export { ThemeContext, ThemeProvider };
