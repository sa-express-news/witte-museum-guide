import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// components
import App from './components/App/App';
import Map from './components/Map/Map';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route component={Map} path="/"></Route>
    </Route>
  </Router>
);