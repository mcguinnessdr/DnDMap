import React, { Component, PropTypes } from 'react';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../../api/pois.js";

export default class Controls extends Component {
    handleClick() {
        Meteor.call("clearPoIs");
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

	render ()
	{
		return (
			<div>
				<button onClick={this.handleClick}>Clear Points of Interest</button>
				<input onBlur={this.mapSourceChanged.bind(this)} />
			</div>
		);
	}
}