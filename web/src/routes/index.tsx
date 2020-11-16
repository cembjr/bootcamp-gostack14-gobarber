import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SignInPage } from '../pages/SignIn';
import { SignUpPage } from '../pages/SignUp';
import { Route } from './Route';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/dashboard" exact component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};
