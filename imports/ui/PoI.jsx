import React, { Component, PropTypes } from 'react';
import CityInfo from "./CityInfo.jsx";

export default class PoI extends Component {
	constructor(props){
		super(props);
		this.state = {
			infoVisible: false
		};
	}

	handleClick(e) {
		if(this.state.infoVisible)
		{
			this.hideInfo();
		}else
		{
			this.setState({
				infoVisible: true
			});
		}
	}

	hideInfo() {
		alert("setting info invisible");
		this.setState({
			infoVisible: false
		});
	}

	render ()
	{
		var style = {
			position: 'absolute',
			top: this.props.posY,
			left: this.props.posX
		};
		return (
			<div>
		<button style={style} onClick={this.handleClick.bind(this)} onLostFocus={this.hideInfo.bind(this)}>city</button>
		{this.state.infoVisible ? <CityInfo ID={this.props.ID}/> : null}
		</div>
		);
	}
}


PoI.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	ID: PropTypes.string.isRequired
};
