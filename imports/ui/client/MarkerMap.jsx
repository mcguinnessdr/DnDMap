import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../../api/pois.js";
import {Maps} from "../../api/maps.js";
import PoI from "./PoI.jsx";
import MapInfo from "./MapInfo.jsx";

class MarkerMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapWidth: 0,
			mapHeight: 0,
			mapTop: 0,
			mapLeft: 0,
			zoom: 1,
			infoVisible: false,
			mapUrl: "",
			zooming: false
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

	zoomChanged(e) {
		this.setState({
			zoom: e.target.value / 100
		});
	}

    editMap() {
        this.setState({infoVisible: true});
    }

	mapInfoClosed() {
        this.setState({infoVisible: false});
    }

	mapUrlUpdated(newUrl) {
		this.setState({url: newUrl});
		this.forceUpdate();
	}

	shiftPressed (pressed) {
		this.setState({zooming: pressed});
	}

	keyDown(e) {
		if(e.keyCode === 16){
			this.shiftPressed(true);		
		}
	}

	keyUp(e) {
		if(e.keyCode === 16){
			this.shiftPressed(false);		
		}
	}

	handleScroll(e) {
		if(this.state.zooming){
			this.setState({zoom: Math.round((this.state.zoom + (e.deltaY * this.state.zoom * -.001)) * 100) / 100});
		}
	}

	render ()
	{
		  var style = {
			  map: {
				  width: this.state.zoom * 100 + "%",
			},
			  editButton: {
				  border: "none",
				  borderRadius: ".5em",
				  padding: ".125em .25em",
				  whiteSpace: "nowrap"
			  }
		  };
		  return (
			  <div style={{width: "100%", height: "100%"}}>
				  <button onClick={this.editMap.bind(this)} style={style.editButton}>Edit map</button>
				  <input value={this.state.zoom * 100} onChange={this.zoomChanged.bind(this)} placeholder="set zoom..." style={{position: "fixed", top: 0, right: 0}}/>
				  <img src={this.state.url} className="map" alt="No maps or image URL is incorrect" style={style.map} onClick={this.handleClick.bind(this)} ref="map" onLoad={this.handleLoaded.bind(this)} />
				  {this.renderPoIs()}
				  {this.state.infoVisible ? <MapInfo ID={this.props.mapId} onClose={this.mapInfoClosed.bind(this)} urlUpdated={this.mapUrlUpdated.bind(this)} /> : null}
			  </div>
		  );
	}
	
	 componentDidMount() {
		 window.addEventListener("resize", this.resize.bind(this));
		 window.addEventListener("keydown", this.keyDown.bind(this));
		 window.addEventListener("keyup", this.keyUp.bind(this));
		 window.addEventListener("wheel", this.handleScroll.bind(this));
		// this.forceUpdate();
		 this.resize();
		 //alert(this.state.mapWidth);
	 }

	 componentWillReceiveProps(nextProps) {
		if(nextProps.mapId !== "") {
			this.setState({url: Maps.findOne(nextProps.mapId).url})
		}
	 }

	 componentWillUnmount() {
		 window.removeEventListener("resize", this.resize.bind(this));
		 window.removeEventListener("keydown", this.keyDown.bind(this));
		 window.removeEventListener("keyup", this.keyUp.bind(this));
		 window.removeEventListener("wheel", this.handleScroll.bind(this));
		 		 
	 }

	 handleLoaded(){
		 this.resize();
	 }

	 componentDidUpdate(prevProps, prevState) {
		if(this.refs.map.clientHeight !== this.state.mapHeight){
			this.resize();
		}
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
	currentUser: PropTypes.object,
};

export default createContainer(() => {
	Meteor.subscribe("pois");

	return {
		pois: PoIs.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, MarkerMap);
