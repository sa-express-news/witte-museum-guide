import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';

import store from '../../store';
import actions from '../../actions';

import 'leaflet/dist/leaflet.css';
import './Map.scss';

import MapUI from '../MapUI/MapUI';

const isBrowser = typeof window !== 'undefined';

let config = {};
config.params = {
  center: [40.372,-107.955],
  zoom: 6,
  maxZoom: 9,
  minZoom: 6,
  legends: true,
  scrollWheelZoom: false,
};

config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/saen-editors/cizepw8wv00bz2sqi7cx6hrpr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Flbi1lZGl0b3JzIiwiYSI6ImNpeXVreTZ6YjAwenYycW15d3hoNmp1aTEifQ.OjH869qC5JzcGVVy-rg4JQ',
  params: {
    minZoom: 5,
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      windowHeight: isBrowser ? window.innerHeight : 400,
    };
    this._mapNode       = null;
    this.getHeight      = this.getHeight.bind(this);
  }

  componentDidMount() {
    this.getData();
    if (!this.state.map) this.init(this._mapNode);
  }

  componentWillUnmount() {
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  getData() {
    store.dispatch(actions.map.getAllMarkers());
  }

  getHeight() {
    return {
      height: this.state.windowHeight - 40
    };
  }

  bindMapEvents(map) {
    map.on('click', e => console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng));
  }

  init(id) {
    if (this.state.map) return;

    let map = L.map(id, config.params);
    
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
    this.bindMapEvents(map);
    this.setState({ map, tileLayer });
  }

  render() {
    const setHeight  = this.getHeight();
    return (
      <div id="mapWrap">
        <div ref={(node) => this._mapNode = node} id="map" style={setHeight} />
        <MapUI map={this.state.map} markers={this.props.markers} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { 
    markers: store.markers 
  }
};
export default connect(mapStateToProps)(Map);