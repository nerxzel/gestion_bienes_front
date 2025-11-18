import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

async function enableMocking() {  
    const { worker } = await import('./api/mocks/browser.js');
    
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }

enableMocking().then(() => {
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />      
    </BrowserRouter>
  </StrictMode>,
);
});
