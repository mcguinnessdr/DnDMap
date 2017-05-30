import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../imports/api/pois.js";
import PoI from "../imports/ui/PoI.jsx";
import Controls from "../imports/ui/Controls.jsx";

var mapImg = '../images/Map.png';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapWidth: 0,
			mapHeight: 0
		};
	}

	handleClick(e) {
		PoIs.insert({
			posX: e.pageX / this.state.mapWidth,
			posY: e.pageY / this.state.mapHeight,
			name: "new city",
			desc: "new description"
		})
	}

	renderPoIs() {
		return this.props.pois.map((poi) => (
			<PoI posX={poi.posX  * this.state.mapWidth} posY={poi.posY * this.state.mapHeight} ID={poi._id}/>
			));
	}

 	render() {
 		var style = {
			width:"100%"
		};

 		return (
			<div>
				<Controls />
				<img src={mapImg} className="map" alt="map" style={style} onClick={this.handleClick.bind(this)} ref="map"/>
				{this.renderPoIs()}
			</div>
		);
 	}

	 componentDidMount() {
		 window.addEventListener("resize", this.resize.bind(this));
		 this.resize();
		 //alert(this.state.mapWidth);
	 }

	 componentWillUnmount() {
		 window.removeEventListener("resize", this.resize.bind(this));		 
	 }

	 resize() {

		 this.setState({ 
			 mapWidth: this.refs.map.clientWidth,
			 mapHeight: this.refs.map.clientHeight
		  });
	 }
}

App.propTypes = {
	pois:  PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		pois: PoIs.find({}).fetch(),
	};
}, App);
