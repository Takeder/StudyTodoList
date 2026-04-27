import { useTheme } from '../../../../app/store/hooks/useTheme';
import { Button } from '../../../../shared/ui/Button';

import styles from './styles.module.css';

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="primary"
      className={styles.modeToggle}
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};
