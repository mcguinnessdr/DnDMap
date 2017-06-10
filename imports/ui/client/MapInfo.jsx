import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Tab, Tabs, Badge } from "react-bootstrap";
import {createContainer} from 'meteor/react-meteor-data';

import {Mongo} from 'meteor/mongo';
import {Maps} from "../../api/maps.js";
import EditableHeader from "./EditableHeader.jsx";
import EditableDescription from "./EditableDescription.jsx";
import SharedWith from "./SharedWith.jsx";
import DeleteButton from "./DeleteButton.jsx";

class MapInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            URL: "",
            editingName: false,
            editingDesc: false,
            scale: "",
            units: "",
            shared: []
        }
    }

    close() {
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
    
    finishedChangingUrl(contents) {
        Meteor.call("maps.updateURL", this.props.ID, contents);
    }

    urlChanged (e) {
        this.setState({URL: e.target.value});  
        if(this.props.urlUpdated !== undefined){
            this.props.urlUpdated(e.target.value);
        }      
    }

    finishedChangingScale(contents) {
        Meteor.call("maps.updateScale", this.props.ID, contents);
    }

    scaleChanged (e) {
        this.setState({scale: e.target.value});  
        if(this.props.scaleUpdated !== undefined){
            this.props.scaleUpdated(e.target.value);
        }      
    }

    finishedChangingShared() {
        Meteor.call("maps.updateShared", this.props.ID, this.state.shared);
    }

    sharedChanged (e) {
        this.setState({shared: e.target.value});  
        if(this.props.sharedUpdated !== undefined){
            this.props.sharedUpdated(e.target.value);
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
            },
            rightInput: {
                display: "block",
                float: "right",
                clear: "right"
            }
        };
        return (<div>
                { this.props.map !== undefined ? <Modal show={this.props.show} onHide={this.close.bind(this)} bsSize="large">
					<Modal.Header>
                        <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.props.map.name} placeholder="Enter map name..."/>
					</Modal.Header>
					<Modal.Body>
                        <Tabs animation={false}>
                            <Tab eventKey={1} title="description">
                                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.props.map.desc} placeholder="Enter place description..." />						
                            </Tab>
                            <Tab eventKey={2} title="settings">                                
                                <label style={{display: "block"}}>Map Url</label>
                                <EditableHeader onFinishedEditing={this.finishedChangingUrl.bind(this)} contents={this.props.map.url} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter image Url..."/>
                                <label style={{display: "block"}}>Scale (px/unit)</label>
                                <EditableHeader onFinishedEditing={this.finishedChangingScale.bind(this)} contents={this.props.map.scale} style={{fontWeight:"normal", fontSize:"16px"}} placeholder="Enter scale..."/>                                                                        
                                <div><DeleteButton onDelete={this.removeMap.bind(this)}>Delete</DeleteButton></div>
                            </Tab>
                            <Tab eventKey={3} title={<div><span>sharing </span><Badge>{this.props.map.shared.length}</Badge></div>}>
                                <SharedWith ID={this.props.ID}/>                                
                            </Tab>
                        </Tabs>
                    </Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this)} bsStyle="primary">Close</Button>
					</Modal.Footer>
				</Modal> : null}</div>
            /*<div ref="div" style={style.div}>
                <p>map info</p>
                <EditableHeader onFinishedEditing={this.finishedChangingName.bind(this)} contents={this.state.name} placeholder="Enter map name..." />
                <button style={style.close} onClick={() => {this.props.onClose();}}>X</button>
                <input style={style.rightInput} value={this.state.URL} onBlur={this.finishedChangingUrl.bind(this)} onChange={this.urlChanged.bind(this)} placeholder="Enter an image url..."/>
                <input style={style.rightInput} value={this.state.scale} onBlur={this.finishedChangingScale.bind(this)} onChange={this.scaleChanged.bind(this)} placeholder="Enter a scale..."/>
                <SharedWith ID={this.props.ID}/>
                <EditableDescription onFinishedEditing={this.finishedChangingDescription.bind(this)} contents={this.state.desc} placeholder="Enter map description..." />
                <button onClick={this.removeMap.bind(this)} style={style.delete}>DELETE</button>
            </div>*/
        );
    }

    componentDidMount() {
        //ReactDOM.findDOMNode(this.refs.div).focus();
    }
}

MapInfo.propTypes = { 
    ID: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    urlUpdated: PropTypes.func,
    show: PropTypes.bool.isRequired
};

export default createContainer(({ID}) => {
	Meteor.subscribe("maps");

	return {
		map: Maps.findOne(ID)
	};
}, MapInfo);