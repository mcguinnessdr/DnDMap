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
        style = {
            fontWeight: "bold",
            fontSize: "30px"
        }

        return this.state.editing ? <input style={style} onChange={this.contentsChanged.bind(this)} onBlur={this.finishedEditing.bind(this)} value={this.state.contents} ref="edit" /> : <p style={style} onClick={() => { this.setState({ editing: true }) }}>{this.state.contents !== "" ? this.state.contents : this.props.placeholder}</p>;
    }

    componentDidUpdate(prevState) {
        if(prevState.editing !== this.state.editing && this.state.editing == true)
        {
            this.refs.edit.focus();
        }
    }
}

EditableH1.propTypes = {
    contents: PropTypes.string.isRequired,
    onFinishedEditing: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}