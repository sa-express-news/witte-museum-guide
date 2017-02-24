import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import _ from 'lodash';

import store from '../../store';
import actions from '../../actions';

import 'leaflet/dist/leaflet.css';
import './Map.scss';

import MapUI from '../MapUI/MapUI';

const isBrowser = typeof window !== 'undefined';

let config = {};
config.params = {
  center: [36.809,-110.474],
  zoom: 5,
  maxZoom: 8,
  minZoom: 5,
  legends: true,
};

config.tileLayer = {
  uri: 'https://api.mapbox.com/styles/v1/saen-editors/cizg7b12e00782sn6kncbf4yj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Flbi1lZGl0b3JzIiwiYSI6ImNpeXVreTZ6YjAwenYycW15d3hoNmp1aTEifQ.OjH869qC5JzcGVVy-rg4JQ',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      windowHeight: isBrowser ? window.innerHeight : 400,
      pageId: 0,
      contentBoxIsOpen: false,
      panToMarker: false,
    };
    this._mapNode         = null;
    this.getHeight        = this.getHeight.bind(this);
    this.nextPage         = this.nextPage.bind(this);
    this.iteratePages     = this.iteratePages.bind(this);
    this.toggleContentBox = this.toggleContentBox.bind(this);
    this.panToMarker      = this.panToMarker.bind(this);
  }

  componentDidMount() {
    this.getData();
    if (!this.state.map) this.init(this._mapNode)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.panToMarker) {
      this.panToMarker(nextState);
    }
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  setMapSpecs() {
    const width   = isBrowser ? window.innerWidth : 500,
          height  = this.state.windowHeight,
          isLarge = width > 1350 && height > 1199,
          zoom    = isLarge ? 6 : 5,
          center  = isLarge ? [39.749, -111.588] : [38.215, -110.474];

    return Object.assign({}, config.params, { zoom, center })
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

  toggleContentBox(val) {
    this.setState({ contentBoxIsOpen: val });
  }

  panToMarker(nextState) {
    const { 
            map,
            pageId,
          }           = nextState,
          { markers } = this.props,
          marker      = _.find(markers, ['id', pageId]),
          coords      = marker.coords.split(','), 
          zoom        = map.getZoom();
    map.setView(coords, zoom < 6 ? 6 : zoom);
    this.setState({ panToMarker: false })
  }

  iteratePages() {
    const curr = this.state.pageId,
          last = this.props.page.len - 1;
    return curr === last ? 0 : curr + 1;
  }

  nextPage(requested) {
    const pageId = typeof requested === 'number' ? requested : this.iteratePages();
    store.dispatch(actions.page.getPage(pageId));
    this.setState({ 
      pageId,
      panToMarker: true,
    });
  }

  init(id) {
    if (this.state.map) return;

    let map = L.map(id, this.setMapSpecs());
    
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
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
          toggleContentBox={this.toggleContentBox}
          contentBoxIsOpen={this.state.contentBoxIsOpen}
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