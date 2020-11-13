import React from 'react';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AppProvider } from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignInPage />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
