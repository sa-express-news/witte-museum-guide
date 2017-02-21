import React from 'react';
import logo from '../../logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.scss';

export default function(props) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {props.children}
      </div>
    </MuiThemeProvider>
  );
}
