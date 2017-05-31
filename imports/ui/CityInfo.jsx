import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import ReactMarkdown from 'react-markdown';
import {PoIs} from "../api/pois.js";
import EditableHeader from "./EditableHeader.jsx";

export default class CityInfo extends Component {
    constructor(props) {
        super(props);
        var city = PoIs.findOne({ _id: this.props.ID });
        this.state = {
            name: city.name,
            desc: city.desc,
            editingName: false,
            editingDesc: false
        }
    }

    blurred() {
        this.props.onClose();
    }

    finishedChangingName(contents) {
        this.setState({name: contents});
        Meteor.call("pois.updateName", this.props.ID, contents);
        // PoIs.update({_id: this.props.ID}, {$set:{name: this.state.name}})
        this.props.onNameChanged(contents);
    }
        
    finishedChangingDescription() {
        this.setState({editingDesc: false});
        Meteor.call("pois.updateDesc", this.props.ID, this.state.desc);
        // PoIs.update({_id: this.props.ID}, {$set:{desc: this.state.desc}});
    }

    descChanged(e) {
        this.setState({desc: e.target.value});
    }

    removePoI() {
        Meteor.call("pois.remove", this.props.ID);
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
                borderStyle: "thin",
                backgroundColor: "#FFFDFE",
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: "80%",
                height: "50%",
                zIndex: 100
            },
            close: {
                position: "absolute",
                top: 10,
                right: 10
            },
            delete: {
                backgroundColor: "red", 
                color: "white", 
                position: "absolute",
                bottom: "10px"
            }
        };
        return (
            <div ref="div" style={style.div}>
                <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} />
                {/*{this.state.editingName ? <input onChange={this.nameChanged.bind(this)} onBlur={this.finishedChangingName.bind(this)} value={this.state.name} ref="editName" onLoad={() => {alert(this);this.refs.editName.select()}}/> : <h1 onClick={() => {this.setState({editingName: true})}}>{this.state.name}</h1>}*/}
                <button style={style.close} onClick={() => {this.props.onClose();}}>X</button>
                {this.state.editingDesc ? <textarea style={{width:"100%", height: "80%"}} onChange={this.descChanged.bind(this)} onBlur={this.finishedChangingDescription.bind(this)} value={this.state.desc} /> : <div onClick={() => {this.setState({editingDesc: true});}}><ReactMarkdown  source={this.state.desc}/></div>}
                <button onClick={this.removePoI.bind(this)} style={style.delete}>DELETE</button>
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