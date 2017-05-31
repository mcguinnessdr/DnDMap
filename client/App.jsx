import React, { Component, PropTypes } from 'react';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import MarkerMap from "../imports/ui/MarkerMap.jsx";
import Controls from "../imports/ui/Controls.jsx";
import AccountsUIWrapper from "../imports/ui/AccountsUIWrapper.jsx";
import MapSelect from "../imports/ui/MapSelect.jsx";

var mapImg = '../images/Map.png';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapId: ""
		}
	}

	onMapSelected(mapId){
		this.setState({mapId: mapId});
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
								<div ref="map">
									<MapSelect MapSelected={this.onMapSelected.bind(this)} />
									<MarkerMap mapId={this.state.mapId}/>
									{/*<img src={mapImg} className="map" alt="map" style={style} onClick={this.handleClick.bind(this)} ref="map" />
									{this.renderPoIs()}*/}
								</div>
							)
							: ""
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
