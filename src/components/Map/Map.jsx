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
  center: [40.033,-109.515],
  zoom: 5,
  maxZoom: 8,
  minZoom: 5,
  legends: true,
  scrollWheelZoom: false,
};

config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/saen-editors/cizg7b12e00782sn6kncbf4yj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Flbi1lZGl0b3JzIiwiYSI6ImNpeXVreTZ6YjAwenYycW15d3hoNmp1aTEifQ.OjH869qC5JzcGVVy-rg4JQ',
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
      pageId: 0,
    };
    this._mapNode     = null;
    this.getHeight    = this.getHeight.bind(this);
    this.nextPage     = this.nextPage.bind(this);
    this.iteratePages = this.iteratePages.bind(this);
  }

  componentDidMount() {
    this.getData();
    if (!this.state.map) this.init(this._mapNode);
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  getData() {
    store.dispatch(actions.map.getAllMarkers());
    store.dispatch(actions.page.getPage(this.state.pageId));
  }

  getHeight() {
    return {
      height: this.state.windowHeight - 50
    };
  }

  iteratePages() {
    const curr = this.state.pageId,
          last = this.props.page.len - 1;
    return curr === last ? 0 : curr + 1;
  }

  nextPage(requested) {
    const pageId = typeof requested === 'number' ? requested : this.iteratePages();
    store.dispatch(actions.page.getPage(pageId));
    this.setState({ pageId });
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
        <MapUI 
          map={this.state.map}
          markers={this.props.markers}
          page={this.props.page}
          getNextPage={this.nextPage}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return { 
    markers: store.markers,
    page: store.page,
  }
};
export default connect(mapStateToProps)(Map);