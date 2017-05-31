import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../api/pois.js";
import {Maps} from "../api/maps.js";
import PoI from "./PoI.jsx";

class MarkerMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapWidth: 0,
			mapHeight: 0,
			mapTop: 0,
			mapLeft: 0
		};
	}

	handleClick(e) {
		Meteor.call("pois.insert", (e.pageX - this.state.mapLeft) / this.state.mapWidth, (e.pageY - this.state.mapTop) / this.state.mapHeight, this.props.mapId)
		// PoIs.insert({
		// 	owner: Meteor.userId(),
		// 	username: Meteor.user().username,
		// 	posX: (e.pageX - this.state.mapLeft) / this.state.mapWidth,
		// 	posY: (e.pageY - this.state.mapTop) / this.state.mapHeight,
		// 	name: "new city",
		// 	desc: "new description"
		// })
	}

	renderPoIs() {
		return this.props.pois.map((poi) => (
			<PoI posX={poi.posX  * this.state.mapWidth + this.state.mapLeft} posY={poi.posY * this.state.mapHeight + this.state.mapTop} ID={poi._id}/>
			));
	}

	render ()
	{
		  var style = {
			  width: "100%"
		  };
		  return (
			  <div>
				  <img src={"../images/Map.png"} className="map" alt="map" style={style} onClick={this.handleClick.bind(this)} ref="map" />
				  {this.renderPoIs()}
			  </div>
		  );
	}
	
	 componentDidMount() {
			this.forceUpdate();
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
			 mapHeight: this.refs.map.clientHeight,
			 mapTop: this.refs.map.offsetTop,
			 mapLeft: this.refs.map.offsetLeft
		  });
	 }
}


MarkerMap.propTypes = {
    mapId: PropTypes.number.isRequired,
	pois:  PropTypes.array.isRequired,
	currentUser: PropTypes.object
};

export default createContainer(() => {
	Meteor.subscribe("pois");

	return {
		pois: PoIs.find({}).fetch(),
		currentUser: Meteor.user(),
		MapId: 0
	};
}, MarkerMap);
