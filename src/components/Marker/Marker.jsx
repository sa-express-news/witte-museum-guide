import 'react';
import L from 'leaflet';

export default props => {
	L.marker(props.coords, {
		icon: L.icon({
			iconUrl: require(`../../images/icons/${props.img}`),
			iconSize: [28, 56],
      iconAnchor: [14, 56],
		})
	}).addTo(props.map).on('click', e => {
		props.showContentBox();
		props.map.setView(e.target.getLatLng());
	});
	return null;
};