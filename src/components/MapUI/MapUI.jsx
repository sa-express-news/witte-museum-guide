import React, { Component } from 'react';
import _ from 'lodash';

import Marker from '../Marker/Marker';
import ContentBox from '../ContentBox/ContentBox';

class MapUI extends Component {
  constructor(props) {
    super(props);
    this.showContentBox = this.showContentBox.bind(this);
    this.hideContentBox = this.hideContentBox.bind(this);
  }

  showContentBox() {
    this.props.toggleContentBox(true);
  }

  hideContentBox() {
    this.props.toggleContentBox(false);
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
              type={marker.type}
              pageId={marker.id}
              map={this.props.map}
              showContentBox={this.showContentBox}
              getNextPage={this.props.getNextPage}
            />
          );
        })}
        <ContentBox 
          open={this.props.contentBoxIsOpen}
          close={this.hideContentBox}
          showContentBox={this.showContentBox}
          content={this.props.page}
          getNextPage={this.props.getNextPage}
        />
      </div>
    ) : null;
  }
}

export default MapUI;