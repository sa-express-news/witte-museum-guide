import React from 'react';
import logo from '../logo.svg';
import '../styles/App.scss';

export default function(props) {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div id="map-wrap">
        {props.children}
      </div>
    </div>
  );
}
