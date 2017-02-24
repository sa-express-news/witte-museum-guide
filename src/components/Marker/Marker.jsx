import { Component } from 'react';
import L from 'leaflet';

import './Marker.scss';

const iconPaths = {
	video: () => {
		let result = '<path d="M0 0h24v24H0z" fill="none"/>';
  	return result += '<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>';
  },
  photo: () => {
  	let result = '<path d="M0 0h24v24H0z" fill="none"/>';
  	return result += '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>';
  },
};

class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marker: null,
		}
		this.buildIcon 	 = this.buildIcon.bind(this);
	}

	componentDidMount() {
		if (!this.state.marker) {
			let marker = this.buildMarker();
			this.addMarkerEvents(marker);
			this.setState({ marker });
		}
	}

	componentWillUnmount() {
		this.props.map.removeLayer(this.state.marker);
	}

	buildIcon(icon) {
		let result = '';
		if (icon) {
			result += '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">';
			result += iconPaths[icon]();
			result += '</svg>';
		}
		return result;
	}

	buildMarker() {
		const props 		= this.props,
					svgIcon 	= this.buildIcon(props.type),
					coords 		= props.coords.split(',');
		let html = props.isPulsing ? '<div class="pulsing"></div>' : '';
		html += '<div style="background-image: url(' + require(`../../images/icons/${props.img}`) + ');"></div>​';

		return L.marker(coords, {
			icon: L.divIcon({
				html: html + svgIcon,
				className: 'marker-icon',
				iconSize: [40, 40]
			}),
			title: props.caption || '',
		}).addTo(props.map);
	}

	addMarkerEvents(marker) {
		const props = this.props,
					pulse = document.querySelector('.pulsing');
		marker.on('click', e => {
			pulse.className = 'pulsing hidden';
			props.getNextPage(props.pageId);
			props.showContentBox();
		});
	}

	render() {
		return null;
	}
}

export default Marker;