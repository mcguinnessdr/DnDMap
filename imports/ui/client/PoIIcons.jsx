import React, { Component, PropTypes } from 'react';
import { Button, Alert } from "react-bootstrap";

export default class PoIIcons extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.icons = [
        ]
    }

    handleClick(e) {
        this.props.onClick(e.target.src);
    }

    renderIcons() {
        return this.icons.map((url) => (<img src={url} style={{width:"32px", borderRadius:"100%", margin:"2px"}} onClick={this.handleClick.bind(this)}/>));
    }

    render() {
        style = {
            fontWeight: this.props.style ? this.props.style.fontWeight ? this.props.style.fontWeight : "bold" : "bold",
            fontSize: this.props.style ? this.props.style.fontSize ? this.props.style.fontSize : "30px" : "30px"
        }

        return (
            <div>
                {this.renderIcons()}
            </div>
        );
    }
}

PoIIcons.propTypes = {
    onClick: PropTypes.func.isRequired
}