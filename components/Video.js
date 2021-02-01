import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Video = ({data}) => {
    return (
        <Container className="video-container container">
            {/* <ReactPlayer url={minimize(data.Video)} playing={true} /> */}
            {/* <SublimeVideo autoPlay={true} loop={true} muted={false} src={minimize(data.Video)} /> */}
            <video id="vid" width="100%" height="auto" loop autoPlay muted>
                <source src={minimize(data.Video)} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </Container>
    );
};

export default Video;

const Container = styled.div `
    margin-top:15px;
    margin-bottom:15px;
`