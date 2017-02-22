import React from 'react';
import './Nav.scss';

export default function(props) {
	return (
		<div className="nav-wrap">
			<nav>
				<div className="logo">
					<a href="http://www.expressnews.com/"><img src="http://ww3.hdnux.com/photos/34/27/72/7437958/4/35x35.png" /></a>
				</div>
				<div className="divider"></div>
				<div className="title">{props.title}</div>
				<div className="links">
					<ul>
						<li><a href="mailto:?body=Check out this retrospective I found on ExpressNews.com: http%3A%2F%2Fwww.expressnews.com%2Fen_150th_anniversary/&amp;subject=San%20Antonio%20Express-News%3A%20150%20years%20of%20telling%20your%20stories"><i className="fa fa-envelope-o fa-1x"></i></a></li>
						<li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.expressnews.com%2Fen_150th_anniversary/" target="_blank"><i className="fa fa-facebook-square fa-1x"></i></a></li>
						<li><a href="http://twitter.com/intent/tweet?original_referer=&amp;text=San%20Antonio%20Express-News%3A%20150%20years%20of%20telling%20your%20stories&amp;url=http%3A%2F%2Fwww.expressnews.com%2Fen_150th_anniversary" target="_blank"><i className="fa fa-twitter-square fa-1x"></i></a></li>
						<li><a href="https://plusone.google.com/_/+1/confirm?hl=en&amp;url=http%3A%2F%2Fwww.expressnews.com%2Fen_150th_anniversary" target="_blanl"><i className="fa fa-google-plus-square fa-1x"></i></a></li>
						<li><a href="http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.expressnews.com%2Fen_150th_anniversary&amp;media=http://www.expressnews.com/img/pages/article/opengraph_default.jpg&amp;description=San%20Antonio%20Express-News%3A%20150%20years%20of%20telling%20your%20stories" data-pin-do="none" data-pin-config="none" target="_blank"><i className="fa fa-pinterest fa-1x"></i></a></li>
					</ul>
				</div>
			</nav>
		</div>
	);
}