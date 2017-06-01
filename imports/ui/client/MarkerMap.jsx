import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../../api/pois.js";
import {Maps} from "../../api/maps.js";
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
			poi.mapId === this.props.mapId ? <PoI posX={poi.posX  * this.state.mapWidth + this.state.mapLeft} posY={poi.posY * this.state.mapHeight + this.state.mapTop} ID={poi._id}/> : null
			));
	}

	render ()
	{
		  var style = {
			  width: "100%"
		  };
		  return (
			  <div>
				  <img src={this.props.mapId ? Maps.findOne(this.props.mapId).url : ""} className="map" alt="No maps or image URL is incorrect" style={style} onClick={this.handleClick.bind(this)} ref="map" onLoad={this.handleLoaded.bind(this)} />
				  {this.renderPoIs()}
			  </div>
		  );
	}
	
	 componentDidMount() {
		 window.addEventListener("resize", this.resize.bind(this));
		// this.forceUpdate();
		 this.resize();
		 //alert(this.state.mapWidth);
	 }

	 componentWillUnmount() {
		 window.removeEventListener("resize", this.resize.bind(this));		 
	 }

	 componentDidUpdate() {
		//  this.resize();
	 }

	 handleLoaded(){
		 this.resize();
	 }

	 resize() {
		// alert(this.refs.map.clientWidth);
		// alert(this.refs.map.clientHeight);
		 this.setState({ 
			 mapWidth: this.refs.map.clientWidth,
			 mapHeight: this.refs.map.clientHeight,
			 mapTop: this.refs.map.offsetTop,
			 mapLeft: this.refs.map.offsetLeft
		  });
	 }
}


MarkerMap.propTypes = {
    mapId: PropTypes.string.isRequired,
	pois:  PropTypes.array.isRequired,
	currentUser: PropTypes.object
};

export default createContainer(() => {
	Meteor.subscribe("pois");

	return {
		pois: PoIs.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, MarkerMap);
