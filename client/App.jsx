import React, { Component, PropTypes } from 'react';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../imports/api/pois.js";
import PoI from "../imports/ui/PoI.jsx";
import Controls from "../imports/ui/Controls.jsx";
import AccountsUIWrapper from "../imports/ui/AccountsUIWrapper.jsx";

var mapImg = '../images/Map.png';


class App extends Component {
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
		Meteor.call("pois.insert", (e.pageX - this.state.mapLeft) / this.state.mapWidth, (e.pageY - this.state.mapTop) / this.state.mapHeight)
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

	setMap(source) {
		mapImg = source;
		this.forceUpdate();
	}

	mapSourceChanged(e) {
		if(e.target.value != ""){
			this.setMap(e.target.value);
		}
	}

 	render() {
		  var style = {
			  width: "100%"
		  };
 		return (
			<div style={{width: "100%"}}>
					<div style={{ position: "relative", float: "left" }}><AccountsUIWrapper /></div>
					{
						this.props.currentUser ?
							(
								<div>
									<Controls />
									<input onBlur={this.mapSourceChanged.bind(this)} />
									<img src={mapImg} className="map" alt="map" style={style} onClick={this.handleClick.bind(this)} ref="map" />
									{this.renderPoIs()}
								</div>
							)
							: ""
					}
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

App.propTypes = {
	pois:  PropTypes.array.isRequired,
	currentUser: PropTypes.object
};

export default createContainer(() => {
	return {
		pois: PoIs.find({}).fetch(),
		currentUser: Meteor.user()
	};
}, App);
