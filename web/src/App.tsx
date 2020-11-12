import React from 'react';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <SignInPage />
      <GlobalStyle />
    </>
  );
};

export default App;
