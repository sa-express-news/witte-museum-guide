import React, { Component } from 'react';
import CustomDialog from './CustomDialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import './ContentBox.scss';

class ContentBox extends Component {
	constructor(props) {
		super(props);
		this.getCardText = this.getCardText.bind(this);
		this.getCardMedia = this.getCardMedia.bind(this);
	}

	getCardText(content) {
		if (content.copy) {
			return <CardText>{content.copy}</CardText>;
		} else {
			return null;
		}
	}

	getCardMedia(content) {
		if (content.type === 'video') {
			const media = require(`../../videos/${content.media}`);
			return <video src={media} controls></video>;
		} else if (content.type === 'photo') {
			const media = require(`../../images/fullsize/${content.media}`);
			return <img src={media} />;
		}
	}

	render() {
		const content = this.props.content;
		return (
			<CustomDialog open={this.props.open} onRequestClose={this.props.close} className="content-box">
				<Card className="card" style={{ marginBottom: 20 }}>
			    <CardHeader
			      title={content.title}
			      titleStyle={{
			      	fontSize: '1.3em',
			      	paddingTop: '10px',
			      }}
			      avatar="http://ww3.hdnux.com/photos/34/27/72/7437958/4/35x35.png"
			    />
			    <CardMedia>{this.getCardMedia(content)}</CardMedia>
			    {this.getCardText(content)}
			    <CardActions>
			      <FlatButton 
			      	primary 
			      	label="Back to map"
			      	onClick={this.props.close}
			      />
			      <FlatButton 
			      	label="Next exhibit"
			      	style={{ float: 'right' }}
			      	onClick={this.props.getNextPage}
			      />
			    </CardActions>
			  </Card>
			</CustomDialog>
		);
	}
}

export default ContentBox;