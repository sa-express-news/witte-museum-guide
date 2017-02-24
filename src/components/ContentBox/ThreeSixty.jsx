import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';

// this is so fucking hacky. Jesus christ... I'm sorry ~ Luke

class ThreeSixty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pano: null,
      id: null,
    };
    this._panoNode = null;
    this.getCustomPanoramaTileUrl = this.getCustomPanoramaTileUrl.bind(this);
    this.setPano = this.setPano.bind(this);
  }

  componentDidMount() {
    this.init(this._panoNode);
  }

  componentDidUpdate(prevProps, prevState) {
  	if (prevProps.content.media !== this.props.content.media) {
  		this.init(this.state.id);
  	}
  }

  getHeight() {
    return {
      height: this.state.windowHeight - 50
    };
  }

  getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
	  return require(`../../images/three-sixty/${this.props.content.media}`);
	}

  setPano(google, pano, zoom, tileX, tileY) {
	  if (pano === 'custom') {
	    return {
	      location: {
	        pano: 'custom',
	        description: 'The New Witte'
	      },
	      tiles: {
	        tileSize: new google.maps.Size( 5376 ,  2688 ),
	        worldSize: new google.maps.Size( 5376 ,  2688 ),
	        getTileUrl: this.getCustomPanoramaTileUrl
	      }
	    };
	  }
	}

	getPano(id, google, panoProvider) {
		const panoOptions = {
      pano: 'custom',
      visible: true,
      panoProvider: panoProvider
    };

    return new google.maps.StreetViewPanorama(id, panoOptions);
	}

	loadMap(id) {
		GoogleMapsLoader.KEY = 'AIzaSyBtqwjA6__oej1DSJ8SpxccResQRP3Gjcg';
		GoogleMapsLoader.load(google => {
	    let pano = this.getPano(id, google, this.setPano.bind(this, google));
	    this.setState({ pano, id });
	  });
	}

  init(id) {
    if (window.google) {
    	GoogleMapsLoader.release(() => {
    		this.loadMap(id);
    	});
    } else {
    	this.loadMap(id);
    }
  }

  render() {
    return (
       <div ref={(node) => this._panoNode = node} id="pano" style={{height: 300}} />
    );
  }
}

export default ThreeSixty;