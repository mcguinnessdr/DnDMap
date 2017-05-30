import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../api/pois.js";

export default class CityInfo extends Component {
    blurred() {
        this.props.onClose();
    }

    render() {
        var style = {
            h1: {

            },
            div: {
                backgroundColor: "#FFFDFE",
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 100
            },
            close: {
                position: "absolute",
                top: 10,
                right: 10
            }
        };
        //return <h1>{this.props.ID}</h1>;
        var city = PoIs.findOne({ _id: this.props.ID });
        return (
            <div ref="div" style={style.div}>
                <h1 style={style.h1}>{city._id}</h1>
                <input></input>
                <button style={style.close} onClick={() => {this.props.onClose();}}>X</button>
            </div>
        );
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.div).focus();
    }
}

CityInfo.propTypes = { 
    ID: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};