import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../api/pois.js";

export default class CityInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: PoIs.findOne({ _id: this.props.ID }).name,
            editingName: false
        }
    }

    blurred() {
        this.props.onClose();
    }

    nameChanged(e) {
        this.setState({name: e.target.value});        
    }

    finishedChangingName() {
        this.setState({editingName: false});
        PoIs.update({_id: this.props.ID}, {$set:{name: this.state.name}})
        this.props.onNameChanged(this.state.name);
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
        return (
            <div ref="div" style={style.div}>
                {this.state.editingName ? <input onChange={this.nameChanged.bind(this)} onBlur={this.finishedChangingName.bind(this)} value={this.state.name}/> : <h1 onClick={() => {this.setState({editingName: true});}}>{this.state.name}</h1>}
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
    onClose: PropTypes.func.isRequired,
    onNameChanged: PropTypes.func
};