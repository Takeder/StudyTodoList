import { ThemeProvider } from '../../../../app/store';
import { ToggleTheme } from './ToggleTheme';

/**
 * Не нужно оборачивать все приложение в ThemeProvider
 * т.к нам нужна функция для изменения темы только самой кнопке,
 * а стили мы меняем уже по добавленному классу к html тэгу.
 * @returns JSX
 */
export const ThemeSwitcher = () => {
  return (
    <ThemeProvider>
      <ToggleTheme />
    </ThemeProvider>
  );
};
