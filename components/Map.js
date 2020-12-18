import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

const AnyReactComponent = ({ text, img }) => (
    <div>
        <img src={img} style={{ height: 50 }} />
    </div>
);

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 47.9086356,
            lng: 106.9272843,
        },
        zoom: 18,
        img: "/img/logo.png"
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <Container>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyAtCydT66yfZJG5cgwuECMwBlp3nJermt0",
                    }}
                    height={300}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    defaultOptions={{ styles: require('./map.json') }}
                >
                    <AnyReactComponent
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        img={this.props.img}
                    />
                </GoogleMapReact>
            </Container>

        );
    }
}

export default SimpleMap;

const Container = styled.div `
    margin-top:5vh;
    margin-bottom:5vh;
    padding-left:10vw;
    padding-right:10vw;
    height:50vh;
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
    }
`