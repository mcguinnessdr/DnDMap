import React, { Component, PropTypes } from 'react';

export default class Map extends Component {
	render ()
	{
		var style = {
			position: 'absolute',
			top: this.props.posY,
			left: this.props.posX
		};
		return <button style={style}>city</button>;
	}
}


PoI.propTypes = {
    width: PropTypes.array
};
