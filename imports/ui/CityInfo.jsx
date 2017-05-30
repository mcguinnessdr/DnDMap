import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../api/pois.js";

export default class CityInfo extends Component {
    blurred() {
        alert("lost focus");
        this.props.onLostFocus();
    }

    render() {
        var style = {
            display: "block",
            position: "absolute",
            top: 100,
            left: 100
        };
        //return <h1>{this.props.ID}</h1>;
        var city = PoIs.findOne({_id: this.props.ID});
        return (
            <div onBlur={this.blurred.bind(this)} tabIndex="0" ref="div">
        <h1 style={style}>{city._id}</h1>
        </div>
        );
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.div).focus();
    }
}

CityInfo.propTypes = { 
    ID: PropTypes.string.isRequired,
    onLostFocus: PropTypes.func.isRequired
};