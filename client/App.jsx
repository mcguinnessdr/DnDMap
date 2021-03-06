import React, { Component, PropTypes } from 'react';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import { Button } from "react-bootstrap";

import MarkerMap from "../imports/ui/client/MarkerMap.jsx";
import Controls from "../imports/ui/client/Controls.jsx";
import AccountsUIWrapper from "../imports/ui/client/AccountsUIWrapper.jsx";
import MapSelect from "../imports/ui/client/MapSelect.jsx";
import AppInfo from "../imports/ui/client/AppInfo.jsx";
import Landing from "../imports/ui/client/Landing.jsx";

var mapImg = '../images/Map.png';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapId: "",
			infoVisible: false
		}
	}

	onMapSelected(mapId){
		this.setState({mapId: mapId});
	}

	showInfo() {
		this.setState({infoVisible: !this.state.infoVisible});
	}

 	render() {
		  var style = {
			  div: {
				  width: "100%",
				  height: "100%",
				  position: "relative",
				  overflow: "hidden",
				  backgroundColor: "#262626"
			  },

			  map: {
				  width: "100%",
				  height: "100%",
				  position: "relative",
				  overflow: "hidden"
			  },
			  button: {
				  margin: "0em 1em", 
				  position: "relative",
				  border: "none",
				  borderRadius: ".5em",
				  padding: ".125em .25em",
				  whiteSpace: "nowrap",
			  }
		  };
 		return (
				<div style={style.div}>

					{
						this.props.currentUser ?
								<span>
								<div>
									<AccountsUIWrapper />
									<Button onClick={this.showInfo.bind(this)} bsSize="small">Help</Button>
									<AppInfo show={this.state.infoVisible} close={this.showInfo.bind(this)} />
								</div>
								<div ref="map" style={style.map}>
									<MapSelect MapSelected={this.onMapSelected.bind(this)} />
									{this.state.mapId !== "" ? <MarkerMap mapId={this.state.mapId} /> : null}
									{/*<img src={mapImg} className="map" alt="map" style={style} onClick={this.handleClick.bind(this)} ref="map" />
									{this.renderPoIs()}*/}
								</div>
								</span>
							
							: <Landing/>
					}
				</div>
		);
 	}
}

App.propTypes = {
	currentUser: PropTypes.object
};

export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, App);
