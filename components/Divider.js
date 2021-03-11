import React from 'react';
import styled from 'styled-components';

const Divider = ({data}) => {
    return (
        <Container visible={data.Visible} mtop={data.MobileTop} mbottom={data.MobileBottom} style={{marginTop: data.Top, marginBottom: data.Bottom}}></Container>
    );
};

export default Divider;

const Container = styled.div `
    background:white;
    background-size: 21px;
    background-repeat:repeat-x;
    background-position: center;
    height:12px;
    width:100%;
    opacity:0;
    ${({visible})=> visible && `
        background-image: url('/img/dots.png');
        opacity:1;
    `};
    @media only screen and (max-width: 768px){
        ${({mtop})=>mtop && `margin-top: ${mtop} !important`};
        ${({mbottom})=>mbottom && `margin-bottom: ${mbottom} !important`};
    }
`