import React, { Component } from 'react';
import _ from 'lodash';

import Marker from '../Marker/Marker';
import ContentBox from '../ContentBox/ContentBox';

class MapUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentBoxIsOpen: false,
    };
    this.showContentBox = this.showContentBox.bind(this);
    this.hideContentBox = this.hideContentBox.bind(this);
  }

  showContentBox() {
    this.setState({contentBoxIsOpen: true});
  }

  hideContentBox() {
    this.setState({contentBoxIsOpen: false});
  }

  render() {
    return this.props.map ? (
      <div>
        {_.map(this.props.markers, (marker, key) => {
          return (
            <Marker 
              key={key}
              img={marker.img}
              coords={marker.coords}
              map={this.props.map}
              showContentBox={this.showContentBox}
            />
          );
        })};
        <ContentBox 
          open={this.state.contentBoxIsOpen}
          close={this.hideContentBox}
        />
      </div>
    ) : null;
  }
}

export default MapUI;