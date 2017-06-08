import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { FormControl, Button, Form } from "react-bootstrap";


import {Maps} from "../../api/maps.js";
import SharedUser from "./SharedUser.jsx";

class SharedWith extends Component {
	constructor(props){
		super(props);
        this.state = {
            username: ""
        }
	}

	handleClick(e) {
		if(this.state.infoVisible)
		{
			this.hideInfo();
		}else
		{
			this.setState({
				infoVisible: true
			});
		}
	}

	hideInfo() {
		this.setState({
			infoVisible: false
		});
	}

    finishedChangingUsername(e) {
        if(e.key === "Enter"){
            this.setState({username: ""});     
            this.addShared();         
        }
    }

    addShared() {
        Meteor.call("maps.addShared", this.props.ID, this.state.username);
    }

    onSubmit(){
        this.setState({ username: "" });
        this.addShared();      
    }

    usernameChanged (e) {
        this.setState({username: e.target.value});  
        if(this.props.usernameUpdated !== undefined){
            this.props.usernameUpdated(e.target.value);
        }      
    }

    renderShared() {
        return this.props.maps.map((map) => (
            map._id === this.props.ID ? map.shared.map((shared) => (<SharedUser username={shared} onDelete={this.deleteUsername.bind(this)}/>)) : null
        ));
    }

    deleteUsername(username) {
        Meteor.call("maps.removeShared", this.props.ID, username);
    }

	render ()
	{
		var style = {
            float: "right",
            clear: "right"
		};

        return (
            <div>
                <Form inline>
                <FormControl value={this.state.username} onKeyPress={this.finishedChangingUsername.bind(this)} onChange={this.usernameChanged.bind(this)} placeholder="Enter email to share"/>
                <Button onClick={this.onSubmit.bind(this)}>Add</Button>
                </Form>
                {this.renderShared()}
            </div>
        );
	}
}


SharedWith.propTypes = {
	ID: PropTypes.string.isRequired
};

export default createContainer(() => {
	Meteor.subscribe("maps");

	return {
		maps: Maps.find({}).fetch()
	};
}, SharedWith);
