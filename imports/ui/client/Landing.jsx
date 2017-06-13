import React, { Component, PropTypes } from 'react';
import { Button, FormControl, Form } from "react-bootstrap";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";

export default class Landing extends Component {
    render() {
        var style = {
            feature: {
                overflow: "auto",
                alignItems: "center",
                display: "flex",
                margin: "20px auto",
                width: "80%",
                maxWidth: "1500px",
                backgroundColor: "#141414" 
            },
            p: {
                fontSize: "16px"
            },
            featureP: {
                margin: "50px 25px",
                color: "#F5F5F5",
                maxWidth: "100%" ,
                fontSize: "16px"
            },
            featureImage: {
                float: "left",
                maxWidth: "600px",
                width: "40%"
            }
        }

        return (
            <div style={{ height: "100%", position: "relative", overflow: "scroll", alignText: "center", overflowX:"hidden" }}>
                <div style={{ overflow: "auto", alignItems: "center", display: "flex", justifyContent: "center", backgroundImage: "url(../images/cover.png)", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", height: "100%", backgroundSize:"cover" }}>
                    {/*<img src="../images/chrome_2017-06-12_12-32-43.jpg" style={{float: "left", width:"50%"}}/>*/}
                    <div style={{ backgroundColor: "#141414", alignItems: "center", display: "flex", justifyContent: "center", flexDirection:"column", width:"100%" }}>
                        <div style={{ margin: "50px 0px 10px 0px", color: "#F5F5F5", maxWidth: "800px", width: "80%", textAlign: "center" }} >
                        <p style={style.p}>This app is designed to help you keep track of location based information on game maps.
                      I started making this to keep track of information on cities in my Dungeons and Dragons campaign, as I was tired of having to sift through notes to find the details about wherever my players were.
                      Using this app you can save information about points of interest in your game map, then share it with your players so everyone stays up to date with the current story.
                      </p>
                      <Button href="https://github.com/mcguinnessdr/DnDMap/wiki" target="_blank">More Info</Button>
                      </div>
                      <div style={{margin:"10px"}}>
                        <AccountsUIWrapper />
                    </div>
                    <div style={{margin:"20px"}}/>
                    
                    </div>
                </div>
                <div style={style.feature}>
                    <img src="../images/chrome_2017-06-12_12-37-31.png" style={style.featureImage} />
                    <div style={{ backgroundColor: "#141414" }}>
                        <p style={style.featureP}>
                            Place points of interest around your map to keep track of important locations.
                      </p>
                    </div>
                </div>
                <div style={style.feature}>
                    <img src="../images/chrome_2017-06-12_12-41-22.png" style={style.featureImage} />
                    <div style={{ backgroundColor: "#141414" }}>
                        <p style={style.featureP}>
                            Store information about each place, including both public descriptions and private notes.
                      </p>
                    </div>
                </div>
                <div style={style.feature}>
                    <img src="../images/chrome_2017-06-12_12-42-37.png" style={style.featureImage} />
                    <div style={{ backgroundColor: "#141414" }}>
                        <p style={style.featureP}>
                            Store general information about each map.
                      </p>
                    </div>
                </div>
                <div style={style.feature}>
                    <img src="../images/chrome_2017-06-12_12-43-05.png" style={style.featureImage} />
                    <div style={{ backgroundColor: "#141414" }}>
                        <p style={style.featureP}>
                            Share your map with others.
                      </p>
                    </div>
                </div>
                <div style={style.feature}>
                    <img src="../images/chrome_2017-06-12_12-43-42.png" style={style.featureImage} />
                    <div style={{ backgroundColor: "#141414" }}>
                        <p style={style.featureP}>
                            Use tools, such as the measure tool, to get more out of your maps.
                      </p>
                    </div>
                </div>
            </div>
        );
    }
}