import React, { Component, PropTypes } from 'react';
import {PoIs} from "../../api/pois.js";
import CityInfo from "./CityInfo.jsx";

export default class PoI extends Component {
	constructor(props){
		super(props);
		this.poi = PoIs.findOne({ _id: this.props.ID })
		this.state = {
			infoVisible: false,
			name: this.poi.name,
			imageSrc: this.poi.image,
			imageSize: this.poi.imageSize
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
				top: this.props.posY - (this.props.zoom * this.poi.imageSize / 2) - (this.poi.imageSize * .125),
				left: this.props.posX - (this.props.zoom * this.poi.imageSize / 2) - (this.poi.imageSize * .25),
				width: this.props.zoom * this.poi.imageSize + "px",
				border: "none",
				borderWidth: "1px",
				borderRadius: "100%",
				padding: ".125em .25em"
			}
		};

		return (
			<div>
				<div onClick={this.handleClick.bind(this)} onContextMenu={(e) => { e.preventDefault(); return false; }}>
					{this.poi.image ? <img src={this.poi.image} style={style.image} draggable="false"/> :
						<button style={style.button} >{this.poi.name}</button>}
				</div>
				{this.state.infoVisible ? <CityInfo ID={this.props.ID} onClose={this.hideInfo.bind(this)} onNameChanged={this.changeName.bind(this)} /> : null}
			</div>
		);
	}
}


PoI.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	ID: PropTypes.string.isRequired,
	zoom: PropTypes.number
};
