import React, { Component, PropTypes } from 'react';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import {Mongo} from 'meteor/mongo';
import {Maps} from "../api/maps.js";
import Select from "react-select";
import 'react-select/dist/react-select.css';

class MapSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: "",
            name: ""
        }
    }

    addMap(name, source) {
        Meteor.call("maps.insert", name, source);
    }

    handleClick() {
        this.addMap(this.state.name, this.state.source);
    }

    getMapOptions() {
        return this.props.maps.map((map) => (
            {
                value: map._id,
                label: map.name
            }));
    }

    onMapSelected(value) {
        this.props.MapSelected(value.value);
    }

	render ()
	{
		return (
			<span>
                <button onClick={this.handleClick.bind(this)}>Add Map</button>
                <input onChange={(e) => {this.setState({name: e.target.value})}}/>
                <input onChange={(e) => {this.setState({source: e.target.value})}}/>
                <Select options={this.getMapOptions()} onChange={this.onMapSelected.bind(this)} />
			</span>
		);
	}
}

MapSelect.propTypes = {
	maps: PropTypes.array.isRequired,
    MapSelected: PropTypes.func.isRequired
};

export default createContainer(() => {
    Meteor.subscribe("maps");

	return {
		maps: Maps.find({}).fetch(),
	};
}, MapSelect);