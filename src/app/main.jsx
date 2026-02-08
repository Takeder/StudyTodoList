import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Todos from '../features/Todos';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Todos />
  </StrictMode>
);
