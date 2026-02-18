import { createContext } from 'react';
import Todos from '../features/Todos';
import { ThemeProvider } from './themProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <Todos />;
    </ThemeProvider>
  );
};
