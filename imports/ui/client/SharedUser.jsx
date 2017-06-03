import React, { Component, PropTypes } from 'react';

export default class SharedUser extends Component {
    handleClick(e) {
        this.props.onDelete(this.props.username);
    }

    render() {
        var style = {
            div: {
                border: "solid",
                borderRadius: ".5em",
                borderWidth: "1px",
                borderColor: "#D6D6D6",
                display: "inline-block"
            },
            button: {
				  position: "relative",
				  border: "none",
				  borderRadius: ".5em",
				  padding: ".125em .25em",
				  whiteSpace: "nowrap",
                  verticalAlign: "text-center",
                  textAlign: "center",
                  margin: "0em 0em 0em .5em"
			  }
            };
        return (
            <div >
                <p style={style.div}><span>{this.props.username}</span><button style={style.button} onClick={this.handleClick.bind(this)}>x</button></p>
                
            </div>
        );
    }
}

SharedUser.propTypes = {
    username: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}