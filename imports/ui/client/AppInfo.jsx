import React, { Component, PropTypes } from 'react';
import { Modal, Button } from "react-bootstrap";

export default class AppInfo extends Component {

    hide() {
        this.props.close();
    }

    render() {
        style={
            margin: "1em"
        }

        return (
            <Modal show={this.props.show} onHide={this.hide.bind(this)}>
                <Modal.Header>
                    <h1>Map Marker</h1>
                    <h5>by mcguinnessdr</h5>
                </Modal.Header>
                <Modal.Body>
                <p>Welcome to my little mapping app.  This app is intended to help with storing location based information for roleplaying games.
                    I started making this app because I was tired of having to sift through notes to find information on a specific town or dungeon I had encountered at an earlier time, either as a GM, or a player.</p>
                <h2>How to use</h2>
                <p>Once you've created an account, open the drop down to create a new map.
                    Using the "Edit Map" button, you can give the map a name, a URL that links to the map image (make sure the URL ends with the image extension e.g. jpg, png, gif), 
                    and a general map description.  You can also share the map with others from here.</p>
                <h4>Points of Interest</h4>
                <p>To add a point of interest to the map, click on the "Add PoIs" button to go into add mode.
                    Click anywhere on the map to add a point of interest.  You can then click on the new PoI to edit it's information.</p>
                <h4>Measure tool</h4>
                <p>To measure the distance from one point to another just right click and drag.  By default the scale is set to one pixel per unit, to change this go to the map settings again.
                    To accurately set the scale of the map you can measure a known distance (usually a scale on the map), then take the distance measured and divide it by the distance that it should be. 
                    For example, if the scale says 500mi, and you measure 100, you would set the scale to 100/500, or .2.</p>
                <h4>Icons</h4>
                <p>You can also set custom markers for points of interest, rather than just displaying the location name.  To do this, just paste an image URL in the appropriate spot in the PoI's settings.</p>
                <h3>Other info</h3>
                <p>If you find any <a href="https://github.com/mcguinnessdr/DnDMap/issues">issues</a>, or if you want to <a href="https://github.com/mcguinnessdr/DnDMap/pulls">contribute</a>, you can let me know through the <a href="https://github.com/mcguinnessdr/DnDMap">Github page</a></p>
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