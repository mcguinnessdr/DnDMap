import React, { Component, PropTypes } from 'react';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import {Mongo} from 'meteor/mongo';
import {Maps} from "../../api/maps.js";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import MapInfo from "./MapInfo.jsx";


class MapSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: "",
            name: "",
            infoVisible: false,
            selected: 0
        }
    }

    addMap(name, source) {
        Meteor.call("maps.insert", name, source);
    }

    handleClick() {
        this.addMap(this.state.name, this.state.source);
    }

    getMapOptions() {
        var options = this.props.maps.map((map) => (
            {
                value: map._id,
                label: map.name
            }));
            options.push({
                value: 0,
                label: "Add map..."
            });
            return options;
    }

    onMapSelected(value) {
        if(value.value !== 0){
            this.setState({ selected: value.value });
            this.props.MapSelected(value.value);
            if (Maps.findOne(value.value).desc === undefined) {
                Meteor.call("maps.updateDesc", value.value, "new description");
            }
        }else {
            this.addMap("new map", "");
        }
    }

    editMap() {
        this.setState({infoVisible: true});
    }

    mapInfoClosed() {
        this.setState({infoVisible: false});
    }

	render ()
	{
		return (
			<span>
                {/*<button onClick={this.handleClick.bind(this)}>Add Map</button>
                <input onChange={(e) => {this.setState({name: e.target.value})}} placeholder="Map name..."/>
                <input onChange={(e) => {this.setState({source: e.target.value})}} placeholder="Image Location..."/>*/}
                <button onClick={this.editMap.bind(this)}>Edit map</button>
                <Select options={this.getMapOptions()} onChange={this.onMapSelected.bind(this)} value={this.state.selected} />
                {this.state.infoVisible ? <MapInfo ID={this.state.selected} onClose={this.mapInfoClosed.bind(this)} /> : null}
			</span>
		);
	}

    componentWillReceiveProps (nextProps) {
        if(this.props.maps[0] === undefined){
            this.setState({selected: nextProps.maps[0]._id});
            this.props.MapSelected(nextProps.maps[0]._id);
            if (Maps.findOne(nextProps.maps[0]._id).desc === undefined) {
                Meteor.call("maps.updateDesc", value.value, "new description");
            }
        }
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