import React from 'react';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import routes from './config/routes.js';
import { AuthProvider } from './auth/context.js';
import Container from '@material-ui/core/Container';

import './App.css';

import AppRoute from './components/AppRoute'

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="md">
          <Switch>
            {routes.map((route) => (
              <AppRoute
                exact
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  )
}


export default App;
