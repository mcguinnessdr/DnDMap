import React, { Component, PropTypes } from 'react';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../api/pois.js";

export default class Controls extends Component {
    handleClick() {
        Meteor.call("clearPoIs");
    }
	render ()
	{
		return <button onClick={this.handleClick}>Clear Points of Interest</button>;
	}
}