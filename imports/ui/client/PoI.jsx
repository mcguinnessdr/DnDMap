import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import {PoIs} from "../../api/pois.js";
import CityInfo from "./CityInfo.jsx";

class PoI extends Component {
	constructor(props){
		super(props);
		this.state = {
			infoVisible: false,
			name: props.poi.name,
			imageSrc: props.poi.image,
			imageSize: props.poi.imageSize
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
			button: {
			position: 'absolute',
			top: this.props.posY,
			left: this.props.posX,
			// background: "none",
			// border: "none"
			border: "solid",
			borderWidth: "1px",
			borderRadius: "0 .5em .5em .5em",
			padding: ".125em .25em",
			whiteSpace: "nowrap"
		},
			image: {
				position: 'absolute',
				top: this.props.posY - (this.props.zoom * this.props.poi.imageSize / 2),
				left: this.props.posX - (this.props.zoom * this.props.poi.imageSize / 2),
				width: this.props.zoom * this.props.poi.imageSize + "px",
				// border: "none",
				// borderRadius: "100%"
			}
		};

		var toolTip = <Tooltip bsSize="large">{this.props.poi.name}</Tooltip>

		return (
			<div>
				<div onClick={this.handleClick.bind(this)} onContextMenu={(e) => { e.preventDefault(); return false; }}>
					{this.props.poi.image ? <OverlayTrigger placement="top" overlay={toolTip}><img src={this.props.poi.image} style={style.image} draggable="false"/></OverlayTrigger> :
						<button style={style.button} >{this.props.poi.name}</button>}
				</div>
				<CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)} show={this.state.infoVisible} />
				{/*{this.state.infoVisible ? <CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)} /> : null}*/}
			</div>
		);
	}
}


PoI.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	ID: PropTypes.string.isRequired,
	zoom: PropTypes.number,
	poi: PropTypes.object.isRequired
};


export default createContainer(({ID}) => {
	Meteor.subscribe("pois");

	return {
		poi: PoIs.findOne(ID)
	};
}, PoI);