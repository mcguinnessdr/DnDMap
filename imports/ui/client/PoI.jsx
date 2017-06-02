import React, { Component, PropTypes } from 'react';
import {PoIs} from "../../api/pois.js";
import CityInfo from "./CityInfo.jsx";

export default class PoI extends Component {
	constructor(props){
		super(props);
		this.state = {
			infoVisible: false,
			name: PoIs.findOne({ _id: this.props.ID }).name
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
		this.setState({
			infoVisible: false
		});
	}

	changeName(newName) {
				this.setState({
			name: newName
		});
	}

	render ()
	{
		var style = {
			position: 'absolute',
			top: this.props.posY,
			left: this.props.posX,
			// background: "none",
			// border: "none"
			border: "solid",
			borderWidth: "1px",
			borderRadius: "0 .5em .5em .5em",
			padding: ".125em .25em",
			whiteSpace: "nowrap",
		};

		var poi = PoIs.findOne({ _id: this.props.ID });

		return (
			<div>
		<button style={style} onClick={this.handleClick.bind(this)}>{poi ? poi.name : this.state.name}</button>
		{this.state.infoVisible ? <CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)}/> : null}
		</div>
		);
	}
}


PoI.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	ID: PropTypes.string.isRequired
};
