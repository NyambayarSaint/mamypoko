import React, { useState } from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import {BiChevronRight} from 'react-icons/bi'
import SublimeVideo from 'react-sublime-video'
import {IoMdClose} from 'react-icons/io'

const Totofaucet = ({data}) => {
    const [popup, setPopup] = useState('');
    return (
        <>
            <Container className="container-fluid">
                <div className="row">
                    {data.FaucetGrids.map((el)=>{
                        return(
                            <div className="grids col-md-4 mb-5" key={Math.random()}>
                                {el.Image &&
                                    <div className="image-container">
                                        <img src={minimize(el.Image, 'large')} className="product"/>
                                        <div className="awards-container">{el.Award.map((ol)=><img key={Math.random()} src={minimize(ol, 'thumb')} className="award"/>)}</div>
                                    </div>
                                }
                                <Wrapper color={el.ColorCode}>
                                    {el.Name && <h2>{el.Name}</h2>}
                                    {el.Caption && <small>{el.Caption}</small>}
                                    {el.Description && <p>{el.Description}</p>}
                                    {el.Video && <a onClick={()=>setPopup(el.Video)}>WATCH VIDEO <BiChevronRight/></a>}
                                </Wrapper>
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

export default Totofaucet;

const Container = styled.div `
    overflow:hidden;
    padding-top:5vh;
    padding-bottom:5vh;
    padding-left:10vw;
    padding-right:10vw;
    .image-container{
        position:relative;
        .awards-container{
            position:absolute;
            right:8px;
            bottom:8px;
            img{
                height:50px;
            }
        }
    }
    .grids{
        text-align:center;
        &:last-child{
            margin-bottom:0px !important;
        }
        h2{
            font-size: 3.5vw;
            margin-bottom:0px;
        }
        small{
            display:block;
            margin-top:-8px;
            font-size: ${props=>props.theme.fontSize};
            font-weight:500;
        }
        p{
            color:black;
            width:80%;
            margin:15px auto;
            font-weight:500;
        }
        a{
            font-weight:bold;
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:8px;
        padding-right:8px;
        h2{
            font-size: 35px !important;
            font-weight:bold;
            margin-top:15px;
        }
        .product{
            width:80% !important;
        }
        small{
            margin-top:0px !important;
        }
        .grids{
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:15px 0px;
        }
        .awards-container{
            position:relative !important;
            display:flex;
            justify-content:center;
            img{
                margin-right:10px;
                &:last-child{
                    margin-right:0px;
                }
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

const Wrapper = styled.div `color: ${props=>props.color && props.color};`;