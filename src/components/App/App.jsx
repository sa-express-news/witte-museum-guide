import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import Nav from '../Nav/Nav';

export default function(props) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <Nav className="Nav" title="Experience the new Witte Museum" />
        {props.children}
      </div>
    </MuiThemeProvider>
  );
}
