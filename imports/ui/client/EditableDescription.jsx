import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';


export default class EditableDescription extends Component {
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
        return this.state.editing ? <textarea style={{width:"80%", height: "70%"}} onChange={this.contentsChanged.bind(this)} onBlur={this.finishedEditing.bind(this)} value={this.state.contents} ref="edit" /> : <div onClick={() => {this.setState({editing: true});}}><ReactMarkdown source={this.state.contents !== "" ? this.state.contents : this.props.placeholder}/></div>;
    }
}

EditableDescription.propTypes = {
    contents: PropTypes.string.isRequired,
    onFinishedEditing: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}