import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import { AppProvider } from './hooks';
import { Router } from './routes';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
