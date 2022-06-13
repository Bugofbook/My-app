import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Routers } from 'react-router-dom';

import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Routers>
      <App />
    </Routers>
  </StrictMode>
);
