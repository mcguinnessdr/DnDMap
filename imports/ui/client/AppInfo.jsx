import React, { Component, PropTypes } from 'react';
import { Modal, Button } from "react-bootstrap";

export default class AppInfo extends Component {

    hide() {
        this.props.close();
    }

    render() {
        var style={
            fontSize: "16px"
        }

        return (
            <Modal show={this.props.show} onHide={this.hide.bind(this)}>
                <Modal.Header>
                    <h1>D&D Map <small>(working title)</small></h1>
                    <h5>by <a href="https://mcguinnessdr.com">mcguinnessdr</a></h5>
                </Modal.Header>
                <Modal.Body>
                <p style={style}>For help on how to use this, please take a look at the <a href="https://github.com/mcguinnessdr/DnDMap/wiki">wiki</a></p>
                <h4>Credits</h4>
                <p>Icons made by <a href="http://www.freepik.com/">Freepik</a> from <a href="http://www.flaticon.com/">www.flaticon.com</a></p>
                <p>Icons made by <a href="http://www.flaticon.com/authors/becris">Becris</a> from <a href="http://www.flaticon.com/">www.flaticon.com</a></p>
                </Modal.Body>
            </Modal>
        )
    }
}

AppInfo.propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}