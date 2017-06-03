import React, { Component, PropTypes } from 'react';
import {createContainer} from 'meteor/react-meteor-data';

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
            Meteor.call("maps.addShared", this.props.ID, this.state.username);
        }
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

		};

        return (
            <div>
                <input value={this.state.username} onKeyPress={this.finishedChangingUsername.bind(this)} onChange={this.usernameChanged.bind(this)} />
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
