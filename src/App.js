import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CountersProvider } from './components/counterscontext';
import HomePage from './components/pages/home';
import CountersPage from './components/pages/counters';
import './assets/css/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <CountersProvider>
          <Route path='/counters' component={CountersPage} />
        </CountersProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
