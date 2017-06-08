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

        return this.state.editing ? <textarea style={{display: "block", width:"80%", height: "70%", fontSize: "16px"}} onChange={this.contentsChanged.bind(this)} onBlur={this.finishedEditing.bind(this)} value={this.state.contents} ref="edit" /> : <div onClick={this.divClicked.bind(this)} style={style.markdownDiv}><ReactMarkdown source={this.state.contents !== "" ? this.state.contents : this.props.placeholder}/></div>;
    }

    componentDidUpdate(prevState) {
        if(prevState.editing !== this.state.editing && this.state.editing === true)
        {
            //alert(this.state.editing);
            this.refs.edit.focus();
        }
    }
}

EditableDescription.propTypes = {
    contents: PropTypes.string.isRequired,
    onFinishedEditing: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}