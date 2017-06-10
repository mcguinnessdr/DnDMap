import React, { Component, PropTypes } from 'react';
import { Button, Alert } from "react-bootstrap";

export default class DeleteButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            showWarning: false
        }
    }

    handleShowClick() {
        this.setState({showWarning: !this.state.showWarning});
    }

    handleConfirmClick() {
        this.props.onDelete();
    }

    render() {
        style = {
            fontWeight: this.props.style ? this.props.style.fontWeight ? this.props.style.fontWeight : "bold" : "bold",
            fontSize: this.props.style ? this.props.style.fontSize ? this.props.style.fontSize : "30px" : "30px"
        }

        return (
            <div>
                <Button onClick={this.handleShowClick.bind(this)} bsStyle="danger">Delete</Button>
                {this.state.showWarning ? <Alert bsStyle="danger">
                    <h3>{this.props.title ? this.props.title : "Are you sure you want to delete this forever?"}</h3>
                    <p>{this.props.title ? this.props.title : "This will also delete it for anyone you have shared it with, so be careful"}</p>
                    <Button onClick={this.handleConfirmClick.bind(this)} bsStyle="danger">Delete</Button>
                    <Button onClick={this.handleShowClick.bind(this)}>Cancel</Button>
                </Alert> : null}
            </div>
        );
    }
}

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    title: PropTypes.string,
    content: PropTypes.string
}