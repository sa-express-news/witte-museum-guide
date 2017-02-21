import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

class ContentBox extends Component {
	render() {
		return (
			<Dialog open={this.props.open} onRequestClose={this.props.close} title="Fire in the hole">This is a dialog</Dialog>
		);
	}
}

export default ContentBox;