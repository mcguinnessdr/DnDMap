import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import { FormControl } from "react-bootstrap";

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

    divClicked() {
        //alert("clicked");
        this.setState({ editing: true });
    }

    render() {
        var style = {
            markdownDiv: {
                overflowY: "auto",
                height: "70%"
            }
        }

        return this.state.editing ? <FormControl componentClass="textarea" rows="25" style={{display: "block", width:"100%", maxWidth:"100%", height: "70%", fontSize: "16px"}} onChange={this.contentsChanged.bind(this)} onBlur={this.finishedEditing.bind(this)} value={this.state.contents} inputRef={ref => {this.input = ref;}} /> : <div onClick={this.divClicked.bind(this)} style={style.markdownDiv}><ReactMarkdown source={this.state.contents !== "" ? this.state.contents : this.props.placeholder}/></div>;
    }

    componentDidUpdate(prevState) {
        if(prevState.editing !== this.state.editing && this.state.editing === true)
        {
            //alert(this.state.editing);
            this.input.focus();
        }
    }
}

EditableDescription.propTypes = {
    contents: PropTypes.string.isRequired,
    onFinishedEditing: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}