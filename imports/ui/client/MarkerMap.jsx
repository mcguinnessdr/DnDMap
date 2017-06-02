import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {PoIs} from "../../api/pois.js";
import {Maps} from "../../api/maps.js";
import PoI from "./PoI.jsx";
import MapInfo from "./MapInfo.jsx";

class MarkerMap extends Component {
	constructor(props) {
		super(props);
		this.zooming = false;
		this.leftClick = false;
		this.dragging = false;
		this.mouseOver = false;
		this.rightClick = false;
		this.state = {
			mapWidth: 0,
			mapHeight: 0,
			mapTop: 0,
			mapLeft: 0,
			zoom: 1,
			infoVisible: false,
			mapUrl: "",
			scrolledTop: 0,
			scrolledLeft: 0,
			containerWidth: 0,
			containerHeight: 0,
			containerTop: 0,
			containerLeft: 0,
			containerOffsetTop: 0,
			mode: "",
			measureStart: {x: 0, y: 0},
			measureEnd: {x: 0, y: 0},
			scale: 1
		};
	}

	handleClick(e) {
		if(this.dragging){
			this.dragging = false;
			return;
		}
		if(this.state.mode === "pois"){
			Meteor.call("pois.insert", (e.clientX - this.state.mapLeft) / this.state.mapWidth, (e.clientY - (this.state.mapTop + this.state.containerTop)) / this.state.mapHeight, this.props.mapId);
		}
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
			poi.mapId === this.props.mapId ? <PoI posX={poi.posX  * this.state.mapWidth + this.state.mapLeft} posY={poi.posY  * this.state.mapHeight + this.state.mapTop} ID={poi._id}/> : null
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

	mapScaleUpdated(newScale) {
		this.setState({scale: newScale});
	}

	shiftPressed (pressed) {
		this.zooming = pressed;
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
		if(this.zooming || true){
			this.setState({zoom: Math.round((this.state.zoom + (e.deltaY * this.state.zoom * -.001)) * 100) / 100});
			this.setState({scrolledTop: Math.min(Math.max(this.state.scrolledTop, this.state.containerHeight - this.state.mapHeight - this.state.containerTop), 0)});
			this.setState({scrolledLeft: Math.min(Math.max(this.state.scrolledLeft, this.state.containerWidth - this.state.mapWidth), 0)});
			this.resize();
		}
	}

	mouseMove(e) {
		if(this.leftClick && this.mouseOver)
		{
			this.dragging = true;
			this.setState({scrolledTop: Math.min(Math.max(this.state.scrolledTop + e.movementY, this.state.containerHeight - this.state.mapHeight - this.state.containerTop), 0)});
			this.setState({scrolledLeft: Math.min(Math.max(this.state.scrolledLeft + e.movementX, this.state.containerWidth - this.state.mapWidth), 0)});
			this.resize();
		}
		if(this.rightClick) {
				this.setState({ measureEnd: {x: (e.clientX - this.state.mapLeft) / this.state.mapWidth, y: (e.clientY - (this.state.mapTop + this.state.containerTop)) / this.state.mapHeight}});			
		}
	}

	mouseDown(e) {
		switch(e.which) {
			case 1:
				this.leftClick = true;
				break;
			case 3:
				this.rightClick = true;
				this.setState({ 
					measureStart: {x: (e.clientX - this.state.mapLeft) / this.state.mapWidth, y: (e.clientY - (this.state.mapTop + this.state.containerTop)) / this.state.mapHeight},
					measureEnd: {x: (e.clientX - this.state.mapLeft) / this.state.mapWidth, y: (e.clientY - (this.state.mapTop + this.state.containerTop)) / this.state.mapHeight}
				});
				break;
		}
	}

	mouseUp(e) {
		switch(e.which) {
			case 1:
				this.leftClick = false;
				break;
			case 3:
				this.rightClick = false;
				break;
		}
	}

	modePois() {
		if (this.state.mode === "pois") {
			this.setState({ mode: "" });
		} else {
			this.setState({ mode: "pois" });
		}
	}

	mouseOverMap() {
		this.mouseOver = true;
	}

	mouseOutMap() {
		this.mouseOver = false;
	}

	handleContextMenu(e) {
		e.preventDefault();
		return false;
	}

	drawLine() {
		const ctx = this.refs.canvas.getContext("2d");
		ctx.clearRect(0,0,this.state.mapWidth, this.state.mapHeight);
		ctx.beginPath();
		var start = {x: this.state.measureStart.x * this.state.mapWidth, y: this.state.measureStart.y * this.state.mapHeight};
		var end = {x: this.state.measureEnd.x * this.state.mapWidth, y: this.state.measureEnd.y * this.state.mapHeight};
		ctx.moveTo(start.x, start.y );
		ctx.lineTo(end.x, end.y);
		ctx.closePath();
		ctx.stroke();
		ctx.font = "bold 30px Arial";
		ctx.fillStyle = "white";
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		var distance = (Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)) / this.state.zoom / this.state.scale).toFixed(2);
		if(distance != 0){
			ctx.fillText(distance, (start.x + end.x) / 2, (start.y + end.y) / 2);
			ctx.strokeText(distance, (start.x + end.x) / 2, (start.y + end.y) / 2);
		}
	}

	preventDefault(e) {
		e.preventDefault();
		return false;
	}

	render ()
	{
		  var style = {
			  map: {
				  width: this.state.zoom * 100 + "%",
				  position: "absolute",
				  top: this.state.scrolledTop,
				  left: this.state.scrolledLeft,
				  overflow: "hidden"
			},
			  button: {
				  position: "relative",
				  border: "none",
				  borderRadius: ".5em",
				  padding: ".125em .25em",
				  whiteSpace: "nowrap",
			  },
			  buttonSelected: {
				  position: "relative",
				  border: "none",
				  borderRadius: ".5em",
				  padding: ".125em .25em",
				  whiteSpace: "nowrap",
				  backgroundColor: "darkGrey"
			  },
			  canvas: {
				  width: this.state.zoom * 100 + "%",
				  position: "absolute",
				  top: this.state.scrolledTop,
				  left: this.state.scrolledLeft,
				  overflow: "hidden",
				  pointerEvents: "none",
				  background: "none"
			  }
		  };
		  return (
			  <div style={{width: "100%", height: "100%", overflow: "hidden", position: "relative"}}>
				  <input value={this.state.zoom * 100} onChange={this.zoomChanged.bind(this)} placeholder="set zoom..." style={{position: "fixed", top: 0, right: 0}}/>
				  <div>
					  <button onClick={this.editMap.bind(this)} style={style.button}>Edit map</button>
					  <button onClick={this.modePois.bind(this)} style={this.state.mode === "pois" ? style.buttonSelected : style.button}>Add PoIs</button>
				  </div>
				  <div ref="container" style={{height:"100%", position: "relative", overflow: "hidden"}}>
					<img 
					src={this.state.url} 
					className="map" 
					alt="No maps or image URL is incorrect" 
					style={style.map} 
					ref="map" 
					onLoad={this.handleLoaded.bind(this)} 
					onClick={this.handleClick.bind(this)}
					draggable="false"
					onMouseOver={this.mouseOverMap.bind(this)}
					onMouseOut={this.mouseOutMap.bind(this)}
					onContextMenu={this.handleContextMenu.bind(this)}
					/>
				  <div>{this.renderPoIs()}</div>
					<canvas style={style.canvas} ref="canvas" height={this.state.mapHeight} width={this.state.mapWidth} onContextMenu={this.handleContextMenu.bind(this)} onClick={this.preventDefault.bind(this)} />
				  </div>
				  {this.state.infoVisible ? <MapInfo ID={this.props.mapId} onClose={this.mapInfoClosed.bind(this)} urlUpdated={this.mapUrlUpdated.bind(this)} scaleUpdated={this.mapScaleUpdated.bind(this)}/> : null}
			  </div>
		  );
	}
	
	 componentDidMount() {
		 window.addEventListener("resize", this.resize.bind(this));
		 window.addEventListener("keydown", this.keyDown.bind(this));
		 window.addEventListener("keyup", this.keyUp.bind(this));
		 window.addEventListener("wheel", this.handleScroll.bind(this));
		 window.addEventListener("mousemove", this.mouseMove.bind(this));
		 window.addEventListener("mousedown", this.mouseDown.bind(this));
		 window.addEventListener("mouseup", this.mouseUp.bind(this));

		 this.drawLine();
		// this.forceUpdate();
		 this.resize();
		 //alert(this.state.mapWidth);
	 }

	 componentWillReceiveProps(nextProps) {
		if(nextProps.mapId !== "") {
			var map = Maps.findOne(nextProps.mapId);
			this.setState({
				url: map.url,
				scale: map.scale
			});
		}
	 }

	 componentWillUnmount() {
		 window.removeEventListener("resize", this.resize.bind(this));
		 window.removeEventListener("keydown", this.keyDown.bind(this));
		 window.removeEventListener("keyup", this.keyUp.bind(this));
		 window.removeEventListener("wheel", this.handleScroll.bind(this));
		 window.removeEventListener("mousemove", this.mouseMove.bind(this));
		 window.removeEventListener("mousedown", this.mouseDown.bind(this));
		 window.removeEventListener("mouseup", this.mouseUp.bind(this));
		 		 
	 }

	 handleLoaded(){
		 this.resize();
	 }

	 componentDidUpdate(prevProps, prevState) {
		if(this.refs.map.clientHeight !== this.state.mapHeight){
			this.resize();
		}
		this.drawLine();
	 }

	 resize() {
		// alert(this.refs.map.clientWidth);
		// alert(this.refs.map.clientHeight);
		 this.setState({ 
			 mapWidth: this.refs.map.clientWidth,
			 mapHeight: this.refs.map.clientHeight,
			 mapTop: this.refs.map.offsetTop,
			 mapLeft: this.refs.map.offsetLeft,			
			 containerWidth: this.refs.container.clientWidth,
			 containerHeight: this.refs.container.clientHeight,
			 containerTop: this.refs.container.getBoundingClientRect().top,
			 containerOffsetTop: this.refs.container.offsetTop,
			 containerLeft: this.refs.container.offsetLeft
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
