import React, { Component, PropTypes } from 'react';

export default class EditableH1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            contents: props.contents
        }
    }

    finishedEditing() {
        this.props.onFinishedEditing(this.state.contents)
        this.setState({editing: false});
    }

    contentsChanged(e) {
        this.setState({
            contents: e.target.value
        });
    }

    render() {
        return this.state.editing ? <input onChange={this.contentsChanged.bind(this)} onBlur={this.finishedEditing.bind(this)} value={this.state.contents} ref="edit" /> : <h1 onClick={() => { this.setState({ editing: true }) }}>{this.state.contents !== "" ? this.state.contents : this.props.placeholder}</h1>;
    }
}

EditableH1.propTypes = {
    contents: PropTypes.string.isRequired,
    onFinishedEditing: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}