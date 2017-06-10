import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';
import { Modal, Button, Tab, Tabs } from "react-bootstrap";

import {PoIs} from "../../api/pois.js";
import EditableHeader from "./EditableHeader.jsx";
import EditableDescription from "./EditableDescription.jsx";
import DeleteButton from "./DeleteButton.jsx";

export default class CityInfo extends Component {
    constructor(props) {
        super(props);
        var city = PoIs.findOne({ _id: this.props.ID });
        var privateDesc = city.privateDesc.find((privateDesc) => {return privateDesc.id === Meteor.userId()})
        this.state = {
            name: city.name,
            desc: city.desc,
            privateDesc: privateDesc ? privateDesc.desc : "",
            image: city.image ? city.image : "",
            imageSize: city.imageSize ? city.imageSize : ""
        }
    }

    close() {
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
                <Modal show={this.props.show} onHide={this.close.bind(this)} bsSize="large">
					<Modal.Header>
                        <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} placeholder="Enter place name..."/>
					</Modal.Header>
					<Modal.Body>
                        <Tabs animation={false}>
                            <Tab eventKey={1} title="description">
                                <h4>Description</h4>
                                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.state.desc} placeholder="Enter place description..." />						
                                <h4>Private notes</h4>
                                <EditableDescription onFinishedEditing={this.finishedChangingPrivateDescription.bind(this)} contents={this.state.privateDesc} placeholder="Enter place description..." />						
                            </Tab>
                            <Tab eventKey={2} title="settings">                                
                                <label style={{display: "block"}}>Marker Image</label>
                                <EditableHeader onFinishedEditing={this.finishedChangingImage.bind(this)} contents={this.state.image} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image Url..."/>
                                <label style={{display: "block"}}>Marker Size</label>
                                <EditableHeader onFinishedEditing={this.finishedChangingImageSize.bind(this)} contents={this.state.imageSize} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image size..."/>                                                                        
                                <div><DeleteButton onDelete={this.removePoI.bind(this)}>Delete</DeleteButton></div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this)} bsStyle="primary">Close</Button>
					</Modal.Footer>
				</Modal>

            /*<div ref="div" style={style.div}>
                <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} placeholder="Enter place name..."/>
                <button style={style.close} onClick={() => {this.props.onClose();}}>x</button>
                <EditableHeader onFinishedEditing={this.finishedChangingImage.bind(this)} contents={this.state.image} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image Url..."/>
                <EditableHeader onFinishedEditing={this.finishedChangingImageSize.bind(this)} contents={this.state.imageSize} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image size..."/>                
                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.state.desc} placeholder="Enter place description..." />
                <button onClick={this.removePoI.bind(this)} style={style.delete}>DELETE</button>
            </div>*/
        );
    }

    componentDidMount() {
        //ReactDOM.findDOMNode(this.refs.div).focus();
    }
}

CityInfo.propTypes = { 
    ID: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onNameChanged: PropTypes.func,
    show: PropTypes.bool.isRequired
};