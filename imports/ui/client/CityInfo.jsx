import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import {PoIs} from "../../api/pois.js";
import EditableHeader from "./EditableHeader.jsx";
import EditableDescription from "./EditableDescription.jsx";

export default class CityInfo extends Component {
    constructor(props) {
        super(props);
        var city = PoIs.findOne({ _id: this.props.ID });
        this.state = {
            name: city.name,
            desc: city.desc,
            privateDesc: "",
            image: city.image ? city.image : "",
            imageSize: city.imageSize ? city.imageSize : ""
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
        
    finishedChangingDescription(contents) {
        this.setState({desc: contents});
        Meteor.call("pois.updateDesc", this.props.ID, contents);
        // PoIs.update({_id: this.props.ID}, {$set:{desc: this.state.desc}});
    }

    descChanged(e) {
        this.setState({desc: e.target.value});
    }

    finishedChangingPrivateDescription(contents) {
        this.setState({privateDesc: contents});
        Meteor.call("pois.updatePrivateDesc", this.props.ID, contents);
        // PoIs.update({_id: this.props.ID}, {$set:{desc: this.state.desc}});
    }

    privateDescChanged(e) {
        this.setState({privateDesc: e.target.value});
    }

    finishedChangingImage(contents) {
        this.setState({image: contents});
        Meteor.call("pois.updateImage", this.props.ID, contents);
        // PoIs.update({_id: this.props.ID}, {$set:{desc: this.state.desc}});
    }

    imageChanged(e) {
        this.setState({image: e.target.value});
    }

    finishedChangingImageSize(contents) {
        this.setState({imageSize: contents});
        Meteor.call("pois.updateImageSize", this.props.ID, contents);
        // PoIs.update({_id: this.props.ID}, {$set:{desc: this.state.desc}});
    }

    imageSizeChanged(e) {
        this.setState({imageSize: e.target.value});
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
                padding: ".125em .25em",
            }
        };
        return (
            <div ref="div" style={style.div}>
                <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} placeholder="Enter place name..."/>
                {/*{this.state.editingName ? <input onChange={this.nameChanged.bind(this)} onBlur={this.finishedChangingName.bind(this)} value={this.state.name} ref="editName" onLoad={() => {alert(this);this.refs.editName.select()}}/> : <h1 onClick={() => {this.setState({editingName: true})}}>{this.state.name}</h1>}*/}
                <button style={style.close} onClick={() => {this.props.onClose();}}>x</button>
                <EditableHeader onFinishedEditing={this.finishedChangingImage.bind(this)} contents={this.state.image} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image Url..."/>
                <EditableHeader onFinishedEditing={this.finishedChangingImageSize.bind(this)} contents={this.state.imageSize} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image size..."/>                
                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.state.desc} placeholder="Enter place description..." />
                {/*<EditableDescription onFinishedEditing={this.finishedChangingPrivateDescription.bind(this)} contents={this.state.privateDesc} placeholder="Enter private description..." />*/}
                {/*{this.state.editingDesc ? <textarea style={{width:"100%", height: "80%"}} onChange={this.descChanged.bind(this)} onBlur={this.finishedChangingDescription.bind(this)} value={this.state.desc} /> : <div onClick={() => {this.setState({editingDesc: true});}}><ReactMarkdown  source={this.state.desc}/></div>}*/}
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