import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// components
import App from './components/App';
import Map from './components/Map';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route component={Map} path="/"></Route>
    </Route>
  </Router>
);