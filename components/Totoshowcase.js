import React from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';

const Totoshowcase = ({data}) => {
    return (
        <Container>
            <h1 className="title">{data.Title}</h1>
            <Carousel data={{Slide: data.Images}} />
        </Container>
    );
};

export default Totoshowcase;

const Container = styled.div `
    margin-top:5vh;
    margin-bottom:5vh;
    .title{
        font-weight:300;
        margin-bottom:30px;
        text-align:center;
    }
    @media only screen and (max-width: 768px){
        .title{
            font-size: ${props=>props.theme.fontSizeMedium};
        }
    }
`