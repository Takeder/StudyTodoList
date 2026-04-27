import Todos from '../features/Todos';
import { ThemeProvider } from './store/theme.provider';

export const App = () => {
  return (
    <ThemeProvider>
      <Todos />;
    </ThemeProvider>
  );
};
