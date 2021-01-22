import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import {MenuContext} from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import minimize from './miscs/minimize';

const Productgrid = ({data}) => {
    const {config} = useContext(MenuContext);
    console.log(data)
    
    return (
        <Container className="container">
            <div className="title">
                <p>{data.Title}<br/><span>{data.Type}&nbsp;</span> {data.Weight}</p>
            </div>
            <Carousel showArrows={false} itemsToShow={config.width > 768 ? 4 : 1}>
                {data.Entries.map(el=>(
                    <div className="box" key={Math.random()}>
                        <img src={minimize(el.Image)} className="image"/>
                        <div className="description">
                            <div className="each">
                                <img src="/img/piece.png" />
                                <p>{el.Piece}</p>
                            </div>
                            <div className="each">
                                <img src="/img/pack.png" />
                                <p>{el.Pack}</p>
                            </div>
                        </div>
                    </div>
                ))}
                    
            </Carousel>
        </Container>
    );
};

export default Productgrid;

const Container = styled.div `
    margin-top:8vh;
    margin-bottom:8vh;
    padding:1px 15px 15px;
    ${'' /* border:1px solid ${({theme})=>theme.mainColor}; */}
    box-shadow: 1px 1px 5px ${({theme})=>theme.mainColor};
    border-radius:30px;
    .title{
        background:${({theme})=>theme.mainColor};
        padding:8px 15px;
        border-radius:15px;
        width:fit-content;
        margin-top:-32px;
        margin-left:-45px;
        display:block;
        box-shadow:2px 2px 10px #0054a6;
        position:absolute;
        p{
            margin:0px;
            font-weight:bold;
            color:white;
            text-align:center;
            span{
                color:#f0c539;
            }
        }
    }
    .rec-pagination{
        display:none;
    }
    .box{
        text-align:center;
        .image{
            height:200px;
        }
        .description{
            display:flex;
            justify-content:center;
            gap:15px;
            .each{
                display:flex;
                align-items:center;
                gap:10px;
                img{
                    width:35px;
                    height:35px;
                }
                p{
                    margin:0px;
                    font-weight:bold;
                    color:${({theme})=>theme.mainColor3};
                    font-size: 20px;
                }
            }
            
        }
    }
`