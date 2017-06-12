import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import {PoIs} from "../../api/pois.js";
import CityInfo from "./CityInfo.jsx";

class PoI extends Component {
	constructor(props){
		super(props);
		this.leftClick = false;
		this.dragging = false;
		this.mouseOver = false;
		this.rightClick = false;
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

	getBlurb(description, length) {
		if(description === "")
		{
			return "";
		}
		var descArray = description.split(/[ ,]+/);
		var blurb = "";
		for (i = 0; (i < descArray.length && i < length); i++) {
			blurb += descArray[i] + " ";
		}
		blurb = blurb.substring(0, blurb.length-1) + "...";
		return blurb;
	}

	mouseMove(e) {
		if(this.leftClick && this.mouseOver && this.props.canMove)
		{
			this.dragging = true;
			//alert((this.props.posX + e.movementX) / this.props.mapWidth);
		}
		if(this.dragging) {
			Meteor.call("pois.updatePosition", this.props.ID, e.movementX / this.props.mapWidth, e.movementY / this.props.mapHeight);

		}
	}

	mouseDown(e) {
		switch(e.which) {
			case 1:
				this.leftClick = true;
				break;
			case 3:
				this.rightClick = true;
				break;
		}
	}

	mouseUp(e) {
		switch(e.which) {
			case 1:
				this.leftClick = false;
				if(!this.dragging && this.mouseOver) {
					this.handleClick();
				}
				this.dragging = false;
				break;
			case 3:
				this.rightClick = false;
				break;
		}
	}

	mouseOverMap() {
		this.mouseOver = true;
	}

	mouseOutMap() {
		this.mouseOver = false;
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

		var toolTip = <Tooltip><h3 style={{padding:1, margin:0}}>{this.props.poi.name}</h3><p style={{padding:0, margin:0}}>{this.getBlurb(this.props.poi.desc, 4)}</p></Tooltip>

		return (
			<div>
				<div onContextMenu={(e) => { e.preventDefault(); return false; }} onMouseOver={this.mouseOverMap.bind(this)} onMouseOut={this.mouseOutMap.bind(this)}>
					{this.props.poi.image ? <OverlayTrigger placement="top" overlay={toolTip}><img src={this.props.poi.image} style={style.image} draggable="false"/></OverlayTrigger> :
						<button style={style.button} >{this.props.poi.name}</button>}
				</div>
				<CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)} show={this.state.infoVisible} />
				{/*{this.state.infoVisible ? <CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)} /> : null}*/}
			</div>
		);
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.mouseMove.bind(this));
		window.addEventListener("mousedown", this.mouseDown.bind(this));
		window.addEventListener("mouseup", this.mouseUp.bind(this));
	}
}


PoI.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	ID: PropTypes.string.isRequired,
	zoom: PropTypes.number,
	poi: PropTypes.object.isRequired,
	mapWidth: PropTypes.number.isRequired,
	mapHeight: PropTypes.number.isRequired,
	canMove: PropTypes.bool
};


export default createContainer(({ID}) => {
	Meteor.subscribe("pois");

	return {
		poi: PoIs.findOne(ID)
	};
}, PoI);