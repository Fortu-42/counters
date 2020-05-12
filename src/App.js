import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/home';
import CountersPage from './components/pages/counters';
import './assets/css/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/counters' component={CountersPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
