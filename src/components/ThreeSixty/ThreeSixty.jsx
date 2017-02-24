import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';

import MapUI from '../MapUI/MapUI';

class ThreeSixty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleHandle: null,
      id: null,
    };
    this._panoNode = null;
    this.setPano = this.setPano.bind(this);
  }

  componentDidMount() {
    if (!this.state.googleHandle) this.init();
  }

  setPano(google, img, pano, zoom, tileX, tileY) {
    if (pano === 'custom') {
      return {
        location: {
          pano: 'custom',
          description: 'Custom Street View'
        },
        tiles: {
          tileSize: new google.maps.Size( 5376 ,  2688 ),
          worldSize: new google.maps.Size( 5376 ,  2688 ),
          getTileUrl: (pano, zoom, tileX, tileY) => {
            return require(`../../images/three-sixty/${img}`);
          }
        }
      };
    }
  }

  getPano(google, panoProvider, id, img) {
    const panoOptions = {
      pano: 'custom',
      visible: true,
      panoProvider: panoProvider
    };

    debugger;

    return new google.maps.StreetViewPanorama(id, panoOptions);
  }

  init() {
    if (this.state.googleHandle) return;
    GoogleMapsLoader.KEY = 'AIzaSyBtqwjA6__oej1DSJ8SpxccResQRP3Gjcg';
    GoogleMapsLoader.load(google => {
      this.setState({ googleHandle: google});
    });
  }

  render() {
    return (
      <MapUI 
        map={this.props.map}
        markers={this.props.markers}
        page={this.props.page}
        getNextPage={this.props.getNextPage}
        toggleContentBox={this.props.toggleContentBox}
        contentBoxIsOpen={this.props.contentBoxIsOpen}
        getPano={this.getPano.bind(this, this.state.googleHandle, this.setPano.bind(this, this.state.googleHandle))}
      />
    );
  }
}

export default ThreeSixty;