import React, { useState } from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import SublimeVideo from 'react-sublime-video';
import {IoMdClose} from 'react-icons/io';
import {BiChevronRight} from 'react-icons/bi';

const Totoshower = ({data}) => {
    const [popup, setPopup] = useState('');
    
    return (
        <>
        <Container count={data.Showers.length}>
            {data.Title && <h2 className="maintitle">{data.Title}</h2>}
            <div className="wrapper">
                {data.Showers.map(el=>{
                    return(
                        <div className="grids" style={{backgroundImage:`url(${el.Background && minimize(el.Background,'large')})`}} key={Math.random()}>
                            <div className="effect">
                                <div className="content">
                                    {el.Image && <img src={minimize(el.Image, 'medium')}/>}
                                    {el.Title && <h3>{el.Title}</h3>}
                                    {el.Description && <p>{el.Description}</p>}
                                    {el.Video && <a onClick={()=>setPopup(el.Video)}>WATCH VIDEO <BiChevronRight/></a>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
        {popup && 
            <PopupVideo>
                <div style={{position:'relative'}}>
                    <Button onClick={()=>setPopup(false)}><IoMdClose/></Button>
                    <SublimeVideo autoPlay src={minimize(popup)} />
                </div>
            </PopupVideo>
        }
        </>
    );
};

export default Totoshower;

const Container = styled.div `
    background:black;
    color:white;
    .maintitle{
        text-align:center;
        padding:3vh 0px;
        font-weight:300;
    }
    .wrapper{
        display:flex;
        text-align:center;
        .grids{
            width:calc(100vw / ${props=>props.count});
            height: calc(100vw / ${props=>props.count} * 1.6);
            background-size: cover;
            background-position:center center;
            overflow:hidden;
            padding:30px 0px;
            .effect{
                height:100%;
                transition:0.5s ease;
                &:hover{
                    transform:scale(1.1);
                }
            }
            .content{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:100%;
                img{
                    margin-bottom:15px;
                }
                h3{
                    font-weight:bold;
                }
                p{
                    margin:15px 0px 25px;
                    width:50%;
                    font-weight:500;
                }
                a{
                    font-weight:bold;
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .wrapper{
            flex-direction:column;
            .grids{
                width:100%;
                min-height:50vh;
            }
        }
    }
`

const Button = styled.button `
    border:1px solid;
    background:rgba(255,255,255,0.4);
    opacity:0.6;
    width:75px;
    height:50px;
    transition:0.5s ease;
    outline:none;
    &:hover{
        opacity:1
    }
    svg{
        font-size:30px;
    }
    @media only screen and (max-width: 768px){
        height:35px !important;
    }
`

const PopupVideo = styled.div `
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:999;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    button{
        position:absolute;
        top:15px;
        right:15px;
        z-index:1000;
    }
`