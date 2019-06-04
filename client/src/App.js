import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint.css';
import './styles/style.sass';
import Cookies from 'universal-cookie';

import Login from './pages/Login';
import Index from './pages/Index';
import Signup from './pages/Signup';

const cookies = new Cookies();

function HomePage() {
  const token = cookies.get('token');
  if (token) return <Redirect to="/index" />;
  return <Redirect to="/login" />;
}

function LoginPage() {
  return <Login />;
}

function SignUpPage() {
  return <Signup />;
}

function LogoutPage() {
  cookies.remove('token');
  return <Redirect to="/login" />;
}

function IndexPage() {
  const token = cookies.get('token');
  if (!token) return <Redirect to="/login" />;
  return <Index />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/logout" component={LogoutPage} />
      <Route exact path="/index" component={IndexPage} />
      <Redirect to="/" />
    </Switch>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Hello App</title>
      </Helmet>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.Fragment>
  );
}
