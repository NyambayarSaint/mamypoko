import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import {GiFoldedPaper} from 'react-icons/gi'

const Sidegrid = ({data}) => {
    console.log(data)
    return (
        <Container>
                {data.Side && data.Side.length && data.Side.map(el=>(
                    <div className="box">
                        <img src={minimize(el.Image, 'medium')} className="img"/>
                        <div className="info">
                            <div className="con">
                                <GiFoldedPaper/>
                                <p>{el.Piece}</p>
                            </div>
                            <div className="con">
                                <GiFoldedPaper/>
                                <p>{el.Pack}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </Container>
    );
};

export default Sidegrid;

const Container = styled.div `
    padding-top:5vh;
    padding-bottom:5vh;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10vw;
    .box{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:30px;
        .img{
            width:100px;
        }
        .info{
            .con{
                display:flex;
                align-items:center;
                justify-content:center;
                margin-bottom:15px;
                &:last-child{
                    margin-bottom:0px;
                }
                img,svg{
                    font-size:30px;
                    width:30px;
                    height:30px;
                    opacity:0.7;
                }
                p{
                    margin:0px;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        flex-direction:column;
    }
`