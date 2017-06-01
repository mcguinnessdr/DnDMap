import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import {Maps} from "../../api/maps.js";
import EditableHeader from "./EditableHeader.jsx";
import EditableDescription from "./EditableDescription.jsx";

export default class MapInfo extends Component {
    constructor(props) {
        super(props);
        var map = Maps.findOne({ _id: this.props.ID });
        this.state = {
            name: map.name,
            desc: map.desc,
            URL: map.url,
            editingName: false,
            editingDesc: false
        }
    }

    blurred() {
        this.props.onClose();
    }

    finishedChangingName(contents) {
        this.setState({name: contents});
        Meteor.call("maps.updateName", this.props.ID, contents);
    }
        
    finishedChangingDescription(contents) {
        this.setState({desc: contents});
        Meteor.call("maps.updateDesc", this.props.ID, contents);
    }
    
    finishedChangingUrl() {
        Meteor.call("maps.updateURL", this.props.ID, this.state.URL);
    }

    urlChanged (e) {
        this.setState({URL: e.target.value});  
        if(this.props.urlUpdated !== undefined){
            this.props.urlUpdated(e.target.value);
        }      
    }

    descChanged(e) {
        this.setState({desc: e.target.value});
    }

    removeMap() {
        Meteor.call("maps.remove", this.props.ID);
        this.props.onClose();
    }

    render() {
        var style = {
            h1: {
                display: "inline-block",
                width: "auto"
            },
            div: {
                margin: "10%",
                padding: 20,
                border: "solid",
                borderColor: "grey",
                borderWidth: "1px",
                backgroundColor: "#FFFDFE",
                display: "block",
                position: "fixed",
                top: 0,
                left: 0,
                width: "80%",
                height: "50%",
                zIndex: 100,
                borderRadius: "5px",
            },
            close: {
                position: "absolute",
                top: 10,
                right: 10, 
                border: "none",
                padding: ".125em .25em"
            },
            delete: {
                backgroundColor: "red", 
                color: "white", 
                position: "absolute",
                bottom: "10px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: ".5em",
                padding: ".125em .25em"
            }
        };
        return (
            <div ref="div" style={style.div}>
                <p>map info</p>
                <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} placeholder="Enter map name..." />
                <button style={style.close} onClick={() => {this.props.onClose();}}>X</button>
                <input value={this.state.URL} onBlur={this.finishedChangingUrl.bind(this)} onChange={this.urlChanged.bind(this)}/>
                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.state.desc} placeholder="Enter map description..." />
                <button onClick={this.removeMap.bind(this)} style={style.delete}>DELETE</button>
            </div>
        );
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.div).focus();
    }
}

MapInfo.propTypes = { 
    ID: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    urlUpdated: PropTypes.func
};