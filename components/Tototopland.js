import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import Slug from './miscs/Slug';

const Tototopland = ({data}) => {
    
    return (
        <Container style={{backgroundImage:`url(${data.Background && minimize(data.Background, 'large')})`}}>
            <div className="container">
                <Slug/>
                {data.Title && <h1>{data.Title}</h1>}
            </div>
        </Container>
    );
};

export default Tototopland;

const Container = styled.div `
    padding-top:5vh;
    padding-bottom:5vh;
    color:white;
    background-size: cover;
    background-repeat:no-repeat;
    background-position:center center;
    .Slug{
        padding:5px 15px;
        width:fit-content;
        background:rgba(0,0,0,0.6);
        margin-bottom:15px;
        a{
            &:after{
                content:">";
                margin:0px 10px;
            }
            &:nth-child(2){
                display:none;
            }
            &:last-child{
                &:after{
                    display:none;
                }
            }
        }
    }
    h1{
        margin:0px;
        background:rgba(0,0,0,0.6);
        width:fit-content;
        padding:7px 15px;
        font-weight:300;
    }
    @media only screen and (max-width: 768px){
        h1{
            font-size: ${props=>props.theme.fontSizeMedium};
        }
        .Slug{
            font-size: 12px;
        }
    }
`